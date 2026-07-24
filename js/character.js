/* ========================================
   UU模拟器 - 角色创建器
   ======================================== */

let charCreator = {
  game: null,
  step: 0,
  data: {},
  template: null,
  maxSteps: 5
};

Router.register('character', async (params) => {
  const gameSlug = params.game || 'dragonraja';
  const template = getGameTemplate(gameSlug);
  if (!template) return '<div class="page-content"><h1>游戏模板未找到</h1></div>';

  charCreator = {
    game: gameSlug,
    step: 0,
    data: { name: '', gender: '男', age: 18 },
    template,
    maxSteps: template.createSteps || 5
  };

  return renderCreatorStep();
});

function renderCreatorStep() {
  const c = charCreator;
  const t = c.template;
  const step = c.step;

  const steps = ['基本信息', '血统背景', '属性分配', '言灵选择', '确认创建'];
  const stepNames = t.stepNames || steps;

  return `
  <div class="page-content">
    <div class="page-header">
      <h1>🐉 创建你的角色</h1>
      <p>${t.title} — 塑造属于你的混血种</p>
    </div>

    <div class="creation-steps">
      ${stepNames.map((s, i) => `
        <span class="step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}">${s}</span>
      `).join('')}
    </div>

    <div class="creation-panel">
      <div class="creation-form">
        ${renderStepContent(step, t, c.data)}
      </div>
      <div class="creation-preview">
        ${renderPreview(c.data, t)}
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:24px;max-width:600px;margin-left:auto;margin-right:auto">
      <button class="btn btn-secondary" onclick="prevStep()" ${step === 0 ? 'disabled' : ''}>上一步</button>
      <button class="btn btn-primary" onclick="nextStep()">${step >= c.maxSteps - 1 ? '✨ 创建角色' : '下一步'}</button>
    </div>
  </div>`;
}

function renderStepContent(step, t, data) {
  switch(step) {
    case 0: return renderBasicInfo(t, data);
    case 1: return renderBloodline(t, data);
    case 2: return renderAttributes(t, data);
    case 3: return renderSpirit(t, data);
    case 4: return renderConfirm(t, data);
    default: return '';
  }
}

function renderBasicInfo(t, data) {
  return `
    <h3 style="margin-bottom:16px">📋 基本信息</h3>
    <div class="form-group">
      <label>角色姓名</label>
      <input type="text" id="c-name" value="${data.name || ''}" placeholder="输入你的名字" oninput="updateCharData('name', this.value)">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>性别</label>
        <select id="c-gender" onchange="updateCharData('gender', this.value)">
          ${['男', '女', '其他'].map(g => `<option value="${g}" ${data.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>年龄</label>
        <input type="number" id="c-age" value="${data.age || 18}" min="16" max="60" oninput="updateCharData('age', parseInt(this.value) || 18)">
      </div>
    </div>
    <div class="form-group">
      <label>外貌特征</label>
      <textarea id="c-appearance" placeholder="描述你的角色外貌..." oninput="updateCharData('appearance', this.value)">${data.appearance || ''}</textarea>
    </div>
    <div class="form-group">
      <label>性格简述</label>
      <textarea id="c-personality" placeholder="冷静、冲动、谨慎、热血..." oninput="updateCharData('personality', this.value)">${data.personality || ''}</textarea>
    </div>
  `;
}

function renderBloodline(t, data) {
  const bloodlines = t.bloodlines || [
    { id: 'bai_de', name: '白王血裔', desc: '白王的后裔，拥有极高的精神属性潜力和强大的言灵天赋', icon: '🤍' },
    { id: 'hei_de', name: '黑王血裔', desc: '黑王的后裔，肉体力量和龙血纯度潜力极高，战斗天赋异禀', icon: '🖤' },
    { id: 'hun_xue', name: '普通混血种', desc: '最常见的混血种，各方面均衡发展，适应性最强', icon: '💜' },
    { id: 'mi_dang', name: '秘党世家', desc: '出身秘党核心家族，从小接受屠龙训练，拥有丰富的知识和人脉', icon: '⚜️' }
  ];

  const backgrounds = t.backgrounds || [
    { id: 'student', name: '普通学生', desc: '在收到卡塞尔通知书前，过着平凡的生活' },
    { id: 'fighter', name: '武术世家', desc: '自幼习武，身体素质远超常人' },
    { id: 'scholar', name: '学术天才', desc: '在历史/语言学方面有惊人的天赋' },
    { id: 'loner', name: '独行者', desc: '在街头长大，靠自己的本能活到现在' }
  ];

  return `
    <h3 style="margin-bottom:16px">🧬 血统与背景</h3>
    <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:8px">选择血统</label>
    <div class="option-grid">
      ${bloodlines.map(b => `
        <div class="option-card ${data.bloodline === b.id ? 'selected' : ''}" onclick="selectCharOption('bloodline', '${b.id}')">
          ${b.icon} ${b.name}
          <div class="opt-desc">${b.desc}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:16px">
      <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:8px">出身背景</label>
      <div class="option-grid">
        ${backgrounds.map(b => `
          <div class="option-card ${data.background === b.id ? 'selected' : ''}" onclick="selectCharOption('background', '${b.id}')">
            ${b.name}
            <div class="opt-desc">${b.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAttributes(t, data) {
  const baseAttrs = t.attributes || [
    { id: 'str', name: '力量', desc: '物理攻击力与体能', icon: '💪' },
    { id: 'agi', name: '敏捷', desc: '速度与反应', icon: '⚡' },
    { id: 'con', name: '体质', desc: '生命值与抗性', icon: '🛡️' },
    { id: 'int', name: '智力', desc: '知识与推理', icon: '🧠' },
    { id: 'cha', name: '魅力', desc: '社交与领导力', icon: '💎' },
    { id: 'blood', name: '血统纯度', desc: '龙血浓度，影响言灵威力', icon: '🔴' }
  ];
  const pts = data.attrPoints || 18;
  const attrs = data.attributes || {};

  return `
    <h3 style="margin-bottom:16px">⚔️ 属性分配（剩余：<span style="color:var(--accent-gold)" id="attr-pts">${pts}</span> 点）</h3>
    <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">龙族混血种的基础属性，每个属性至少1点，上限10点</p>
    ${baseAttrs.map(a => {
      const val = attrs[a.id] || 1;
      return `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span style="width:24px;font-size:18px">${a.icon}</span>
          <span style="width:50px;font-size:13px;color:var(--text-secondary)">${a.name}</span>
          <button class="btn btn-sm btn-ghost" onclick="adjustAttr('${a.id}', -1)">−</button>
          <span style="width:24px;text-align:center;font-weight:700;color:var(--accent-gold)" id="attr-${a.id}">${val}</span>
          <button class="btn btn-sm btn-ghost" onclick="adjustAttr('${a.id}', 1)">+</button>
          <span style="font-size:12px;color:var(--text-muted)">${a.desc}</span>
        </div>
      `;
    }).join('')}
  `;
}

function renderSpirit(t, data) {
  const spirits = t.spiritWords || [
    { id: 'sword', name: '剑御·天羽羽斩', type: '攻击型', desc: '召唤无数利刃攻击敌人，血统纯度越高，剑阵越强', icon: '🗡️' },
    { id: 'flame', name: '炽·君焰', type: '攻击型', desc: '操控火焰的力量，可释放高温烈焰焚烧一切', icon: '🔥' },
    { id: 'time', name: '时隙·时间零', type: '辅助型', desc: '感知和时间流速的变化，让自己进入超加速状态', icon: '⏳' },
    { id: 'thunder', name: '雷·雷池', type: '攻击型', desc: '召唤雷电之力，可攻可守，速度极快', icon: '⚡' },
    { id: 'soul', name: '圣言·审判', type: '精神型', desc: '精神攻击，直接作用于目标的灵魂，无视物理防御', icon: '👁️' },
    { id: 'shield', name: '盾·无尘之地', type: '防御型', desc: '在周身形成绝对防御领域，阻挡一切攻击', icon: '🔮' }
  ];

  return `
    <h3 style="margin-bottom:16px">🔮 言灵选择</h3>
    <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px">言灵是混血种与生俱来的能力，选择你的初始言灵</p>
    <div class="option-grid" style="grid-template-columns:1fr 1fr">
      ${spirits.map(s => `
        <div class="option-card ${data.spirit === s.id ? 'selected' : ''}" onclick="selectCharOption('spirit', '${s.id}')" style="text-align:left;padding:14px">
          <div style="font-weight:600">${s.icon} ${s.name}</div>
          <div class="opt-desc" style="margin-top:4px">${s.desc}</div>
          <span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:4px;font-size:11px;background:rgba(212,168,67,0.15);color:var(--accent-gold)">${s.type}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderConfirm(t, data) {
  const bloodlineMap = { bai_de: '白王血裔', hei_de: '黑王血裔', hun_xue: '普通混血种', mi_dang: '秘党世家' };
  const bgMap = { student: '普通学生', fighter: '武术世家', scholar: '学术天才', loner: '独行者' };
  const spiritMap = {
    sword: '剑御·天羽羽斩', flame: '炽·君焰', time: '时隙·时间零',
    thunder: '雷·雷池', soul: '圣言·审判', shield: '盾·无尘之地'
  };

  return `
    <h3 style="margin-bottom:16px">✨ 确认角色信息</h3>
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:24px">
      <div style="text-align:center;margin-bottom:16px">
        <div class="avatar-placeholder" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#2a1a3e,#1a2a3e);border:2px solid var(--border-glow);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 8px">${data.gender === '女' ? '👩' : '👨'}</div>
        <h2 style="font-size:22px">${data.name || '未命名'}</h2>
        <p style="color:var(--text-secondary);font-size:13px">${data.gender} · ${data.age}岁</p>
      </div>
      <div class="stat-list">
        <div class="stat-row"><span class="stat-name">血统</span><span class="stat-val">${bloodlineMap[data.bloodline] || '未选择'}</span></div>
        <div class="stat-row"><span class="stat-name">出身</span><span class="stat-val">${bgMap[data.background] || '未选择'}</span></div>
        <div class="stat-row"><span class="stat-name">言灵</span><span class="stat-val">${spiritMap[data.spirit] || '未选择'}</span></div>
        ${Object.entries(data.attributes || {}).map(([k, v]) => {
          const attrNames = { str: '力量', agi: '敏捷', con: '体质', int: '智力', cha: '魅力', blood: '血统纯度' };
          return `<div class="stat-row"><span class="stat-name">${attrNames[k] || k}</span><span class="stat-val">${v}</span></div>`;
        }).join('')}
        ${data.personality ? `<div class="stat-row"><span class="stat-name">性格</span><span class="stat-val">${data.personality}</span></div>` : ''}
      </div>
    </div>
    <p style="text-align:center;color:var(--text-muted);font-size:13px;margin-top:16px">确认无误后点击「创建角色」开始冒险</p>
  `;
}

function renderPreview(data, t) {
  const bloodlineMap = { bai_de: '白王血裔', hei_de: '黑王血裔', hun_xue: '普通混血种', mi_dang: '秘党世家' };
  const spiritMap = {
    sword: '剑御·天羽羽斩', flame: '炽·君焰', time: '时隙·时间零',
    thunder: '雷·雷池', soul: '圣言·审判', shield: '盾·无尘之地'
  };

  return `
    <div class="avatar-placeholder" style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#2a1a3e,#1a2a3e);border:3px solid var(--border-glow);display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 16px">${data.gender === '女' ? '👩' : data.name ? '🧑' : '❓'}</div>
    <h3 style="font-size:20px">${data.name || '等待命名...'}</h3>
    <p style="color:var(--text-secondary);font-size:13px">${data.gender || ''} ${data.age ? `· ${data.age}岁` : ''}</p>
    <div class="stat-list" style="margin-top:16px">
      <div class="stat-row"><span class="stat-name">血统</span><span class="stat-val">${bloodlineMap[data.bloodline] || '待选择'}</span></div>
      <div class="stat-row"><span class="stat-name">言灵</span><span class="stat-val">${spiritMap[data.spirit] || '待选择'}</span></div>
      ${Object.entries(data.attributes || {}).map(([k, v]) => {
        const attrNames = { str: '力量', agi: '敏捷', con: '体质', int: '智力', cha: '魅力', blood: '血统纯度' };
        return `<div class="stat-row"><span class="stat-name">${attrNames[k] || k}</span><span class="stat-val">${v}</span></div>`;
      }).join('')}
    </div>
    ${data.bloodline ? `<div style="margin-top:12px;padding:8px;background:rgba(212,168,67,0.1);border-radius:var(--radius-sm);font-size:12px;color:var(--accent-gold)">${t.description?.slice(0, 100) || '龙族混血种，准备进入卡塞尔学院'}</div>` : ''}
  `;
}

// 全局函数
window.updateCharData = function(key, val) {
  charCreator.data[key] = val;
};

window.selectCharOption = function(key, val) {
  charCreator.data[key] = val;
  renderCharPreview();
};

window.adjustAttr = function(attrId, delta) {
  const data = charCreator.data;
  if (!data.attributes) data.attributes = {};
  if (!data.attrPoints && data.attrPoints !== 0) data.attrPoints = 18;
  const current = data.attributes[attrId] || 1;
  const newVal = current + delta;
  if (newVal < 1 || newVal > 10) return;
  if (delta > 0 && data.attrPoints <= 0) return;
  if (delta < 0 && current <= 1) return;
  data.attributes[attrId] = newVal;
  data.attrPoints += delta < 0 ? 1 : -1;
  renderCharPreview();
};

window.prevStep = function() {
  if (charCreator.step > 0) {
    charCreator.step--;
    refreshCreator();
  }
};

window.nextStep = function() {
  const step = charCreator.step;
  const data = charCreator.data;

  if (step === 0 && !data.name) { alert('请填写角色姓名'); return; }
  if (step === 1 && !data.bloodline) { alert('请选择血统'); return; }
  if (step === 2) {
    if (!data.attributes) data.attributes = {};
    const attrIds = ['str', 'agi', 'con', 'int', 'cha', 'blood'];
    attrIds.forEach(id => { if (!data.attributes[id]) data.attributes[id] = 1; });
    if (!data.attrPoints) data.attrPoints = 18;
  }
  if (step === 3 && !data.spirit) { alert('请选择言灵'); return; }

  if (step >= charCreator.maxSteps - 1) {
    finishCharacter();
    return;
  }
  charCreator.step++;
  refreshCreator();
};

function refreshCreator() {
  const main = document.getElementById('main-content');
  const page = document.getElementById('page-character');
  if (page) page.innerHTML = renderCreatorStep();
}

function renderCharPreview() {
  const main = document.getElementById('main-content');
  // Simple re-render of preview panel
  const preview = document.querySelector('.creation-preview');
  if (preview) {
    preview.innerHTML = renderPreview(charCreator.data, charCreator.template);
  }
  // Update attribute display
  if (charCreator.data.attributes) {
    Object.entries(charCreator.data.attributes).forEach(([k, v]) => {
      const el = document.getElementById(`attr-${k}`);
      if (el) el.textContent = v;
    });
  }
  const ptsEl = document.getElementById('attr-pts');
  if (ptsEl) ptsEl.textContent = charCreator.data.attrPoints || 0;
}

async function finishCharacter() {
  const data = charCreator.data;
  if (!data.attributes) {
    data.attributes = {};
    ['str','agi','con','int','cha','blood'].forEach(a => data.attributes[a] = data.attributes[a] || 1);
  }
  const char = {
    ...data,
    game: charCreator.game,
    createdAt: Date.now(),
    level: 1,
    exp: 0,
    hp: 50 + (data.attributes?.con || 1) * 5,
    maxHp: 50 + (data.attributes?.con || 1) * 5,
    location: '开局',
    inventory: [],
    flags: [],
    relationships: {},
    storyLog: []
  };

  await App.saveCharacter(char);
  App.currentChar = char;
  enterGame(char);
}

function enterGame(char) {
  Router.go('game', { charId: char.id || 'new' });
}

function getGameTemplate(slug) {
  const templates = {
    dragonraja: typeof DRAGONRAJA !== 'undefined' ? DRAGONRAJA.template : null
  };
  return templates[slug];
}
