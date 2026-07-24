/* ========================================
   UU模拟器 - 核心引擎 (Core)
   路由、状态管理、存储、UI基础设施
   ======================================== */

// ==========================================
// 存储引擎 (IndexedDB + localStorage 双保险)
// ==========================================
const Store = {
  _db: null,
  _ready: false,

  async init() {
    try {
      this._db = await this._openDB();
      this._ready = true;
    } catch(e) {
      console.warn('IndexedDB不可用，回退到localStorage', e);
      this._ready = false;
    }
  },

  _openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('UUPlatform', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'username' });
        }
        if (!db.objectStoreNames.contains('characters')) {
          const cs = db.createObjectStore('characters', { keyPath: 'id', autoIncrement: true });
          cs.createIndex('username', 'username', { unique: false });
        }
        if (!db.objectStoreNames.contains('saves')) {
          const ss = db.createObjectStore('saves', { keyPath: 'id', autoIncrement: true });
          ss.createIndex('charId', 'charId', { unique: false });
        }
        if (!db.objectStoreNames.contains('games')) {
          db.createObjectStore('games', { keyPath: 'slug' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  },

  _getStore(name, mode = 'readonly') {
    if (!this._db) return null;
    const tx = this._db.transaction(name, mode);
    return tx.objectStore(name);
  },

  async get(store, key) {
    if (this._ready && this._db) {
      try {
        const os = this._getStore(store);
        if (!os) throw new Error('DB not ready');
        return new Promise((res, rej) => {
          const req = os.get(key);
          req.onsuccess = () => res(req.result || null);
          req.onerror = () => rej(req.error);
        });
      } catch(e) {
        return this._lsGet(store, key);
      }
    }
    return this._lsGet(store, key);
  },

  async getAll(store) {
    if (this._ready && this._db) {
      try {
        const os = this._getStore(store);
        if (!os) throw new Error('DB not ready');
        return new Promise((res, rej) => {
          const req = os.getAll();
          req.onsuccess = () => res(req.result || []);
          req.onerror = () => rej(req.error);
        });
      } catch(e) {
        return this._lsGetAll(store);
      }
    }
    return this._lsGetAll(store);
  },

  async put(store, data) {
    if (this._ready && this._db) {
      try {
        const os = this._getStore(store, 'readwrite');
        if (!os) throw new Error('DB not ready');
        return new Promise((res, rej) => {
          const req = os.put(data);
          req.onsuccess = () => res(req.result);
          req.onerror = () => rej(req.error);
        });
      } catch(e) {
        return this._lsPut(store, data);
      }
    }
    return this._lsPut(store, data);
  },

  async delete(store, key) {
    if (this._ready && this._db) {
      try {
        const os = this._getStore(store, 'readwrite');
        if (!os) throw new Error('DB not ready');
        return new Promise((res, rej) => {
          const req = os.delete(key);
          req.onsuccess = () => res(true);
          req.onerror = () => rej(req.error);
        });
      } catch(e) {
        return this._lsDelete(store, key);
      }
    }
    return this._lsDelete(store, key);
  },

  // localStorage fallback
  _lsGet(store, key) {
    try {
      const data = JSON.parse(localStorage.getItem(`uu_${store}`) || '{}');
      return data[key] || null;
    } catch { return null; }
  },
  _lsGetAll(store) {
    try {
      return Object.values(JSON.parse(localStorage.getItem(`uu_${store}`) || '{}'));
    } catch { return []; }
  },
  _lsPut(store, data) {
    try {
      const key = data.id || data.username || data.slug || data.key;
      const all = JSON.parse(localStorage.getItem(`uu_${store}`) || '{}');
      all[key] = data;
      localStorage.setItem(`uu_${store}`, JSON.stringify(all));
      return true;
    } catch { return false; }
  },
  _lsDelete(store, key) {
    try {
      const all = JSON.parse(localStorage.getItem(`uu_${store}`) || '{}');
      delete all[key];
      localStorage.setItem(`uu_${store}`, JSON.stringify(all));
      return true;
    } catch { return false; }
  }
};

// ==========================================
// 路由系统
// ==========================================
const Router = {
  current: null,
  routes: {},

  register(name, renderFn) {
    this.routes[name] = renderFn;
  },

  async go(name, params = {}) {
    this.current = name;
    const main = document.getElementById('main-content');
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show or create page
    let page = document.getElementById(`page-${name}`);
    if (!page) {
      page = document.createElement('div');
      page.id = `page-${name}`;
      page.className = 'page';
      main.appendChild(page);
    }
    page.classList.add('active');
    // Render
    if (this.routes[name]) {
      page.innerHTML = '<div class="loading">加载中...</div>';
      try {
        page.innerHTML = await this.routes[name](params);
      } catch(e) {
        page.innerHTML = `<div class="page-error">加载失败: ${e.message}</div>`;
        console.error(e);
      }
    }
    // Update nav
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('onclick')?.includes(name));
    });
    window.scrollTo(0, 0);
  }
};

// ==========================================
// 全局应用状态
// ==========================================
const App = {
  user: null,
  currentGame: null,
  currentChar: null,
  gameState: null,

  async init() {
    await Store.init();
    this._loadUser();
    this._setupNav();
  },

  _loadUser() {
    try {
      const u = localStorage.getItem('uu_current_user');
      if (u) this.user = JSON.parse(u);
    } catch {}
    this._updateNavAuth();
  },

  _updateNavAuth() {
    const loginBtn = document.getElementById('btn-login');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name-display');
    const navProfile = document.getElementById('nav-profile');
    if (!loginBtn) return; // DOM not ready yet
    if (this.user) {
      loginBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'block';
      if (userName) userName.textContent = this.user.nick || this.user.username;
      if (navProfile) navProfile.style.display = 'inline';
    } else {
      loginBtn.style.display = 'inline-flex';
      if (userMenu) userMenu.style.display = 'none';
      if (navProfile) navProfile.style.display = 'none';
    }
  },

  _setupNav() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => {
          if (m.style.display !== 'none') m.style.display = 'none';
        });
      }
    });
  },

  async login(username, password) {
    const user = await Store.get('users', username);
    if (!user) throw new Error('用户不存在');
    if (user.password !== password) throw new Error('密码错误');
    this.user = user;
    localStorage.setItem('uu_current_user', JSON.stringify(user));
    this._updateNavAuth();
    return user;
  },

  async register(username, password, nick) {
    const existing = await Store.get('users', username);
    if (existing) throw new Error('用户名已存在');
    const user = { username, password, nick: nick || username, created: Date.now() };
    await Store.put('users', user);
    this.user = user;
    localStorage.setItem('uu_current_user', JSON.stringify(user));
    this._updateNavAuth();
    return user;
  },

  logout() {
    this.user = null;
    localStorage.removeItem('uu_current_user');
    this._updateNavAuth();
    Router.go('home');
  },

  async getGames() {
    return await Store.getAll('games') || [];
  },

  async registerGame(gameData) {
    return await Store.put('games', gameData);
  },

  async getCharacters(username) {
    const all = await Store.getAll('characters') || [];
    return all.filter(c => c.username === username);
  },

  async saveCharacter(char) {
    char.username = this.user?.username || 'local';
    return await Store.put('characters', char);
  },

  async getSaves(charId) {
    const all = await Store.getAll('saves') || [];
    return all.filter(s => s.charId === charId).sort((a, b) => b.savedAt - a.savedAt);
  },

  async saveGame(data) {
    data.savedAt = Date.now();
    return await Store.put('saves', data);
  },

  async loadSave(id) {
    return await Store.get('saves', id);
  },

  async deleteSave(id) {
    return await Store.delete('saves', id);
  },

  async deleteGame(slug) {
    return await Store.delete('games', slug);
  }
};

// ==========================================
// UI 工具函数
// ==========================================
function navigate(page, params) { Router.go(page, params); }

function showAuth() {
  const modal = document.getElementById('auth-modal');
  modal.style.display = 'flex';
  document.getElementById('auth-error').style.display = 'none';
  document.getElementById('auth-error').textContent = '';
  switchAuth('login');
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.querySelectorAll('.modal-overlay').forEach(m => {
    if (m) m.style.display = 'none';
  });
}

function closeModalById(id) {
  document.getElementById(id).style.display = 'none';
}

let authMode = 'login';
function switchAuth(mode) {
  authMode = mode;
  document.getElementById('auth-title').textContent = mode === 'login' ? '登录' : '注册';
  document.getElementById('auth-submit').textContent = mode === 'login' ? '登录' : '注册';
  document.getElementById('reg-nick-group').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('reg-pwd2-group').style.display = mode === 'register' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${mode}`).classList.add('active');
}

async function handleAuth(e) {
  e.preventDefault();
  const errEl = document.getElementById('auth-error');
  errEl.style.display = 'none';
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!username || !password) {
    errEl.textContent = '请填写用户名和密码';
    errEl.style.display = 'block'; return;
  }
  try {
    if (authMode === 'login') {
      await App.login(username, password);
    } else {
      const nick = document.getElementById('auth-nick').value.trim() || username;
      const pwd2 = document.getElementById('auth-password2').value;
      if (password !== pwd2) {
        errEl.textContent = '两次密码不一致';
        errEl.style.display = 'block'; return;
      }
      await App.register(username, password, nick);
    }
    closeModal();
    navigate('home');
  } catch(e) {
    errEl.textContent = e.message;
    errEl.style.display = 'block';
  }
}

function logout() {
  App.logout();
}

function formatDate(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// ==========================================
// 启动
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  await App.init();
  navigate('home');
});
