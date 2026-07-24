/* ========================================
   UU模拟器 - 创作工坊 & AI导入工具
   ======================================== */

Router.register('creator', async () => {
  if (!App.user) {
    return `
    <div class="page-content" style="text-align:center;padding-top:80px">
      <h1>🔧 创作工坊</h1>
      <p style="color:var(--text-secondary);margin:16px 0">登录后即可创建和编辑游戏模板</p>
      <button class="btn btn-primary" onclick="showAuth()">登录</button>
    </div>`;
  }

  const games = await App.getGames();
  return `
  <div class="page-content">
    <div class="page-header">
      <h1>🔧 创作工坊</h1>
      <p>创建你的游戏模板，或导入AI生成的内容</p>
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px">
      <button class="btn btn-primary" onclick="showNewTemplate()">✨ 新建模板</button>
      <button class="btn btn-secondary" onclick="showImportAI()">🤖 AI导入</button>
      <button class="btn btn-secondary" onclick="showTemplateGuide()">📖 模板指南</button>
    </div>

    <h3 style="margin-bottom:12px">已安装的游戏模板</h3>
    <div class="featured-grid">
      <div class="game-card">
        <div class="game-card-banner" style="background:linear-gradient(135deg,#1a0a2e,#2a1a1a)">
          <span style="font-size:64px">🐉</span>
          <div class="overlay"></div>
        </div>
        <div class="game-card-body">
          <h3>龙族：火之晨曦</h3>
          <p style="font-size:12px;color:var(--text-muted)">内置 · 62KB · 场景节点40+</p>
          <p>卡塞尔学院、混血种、龙王……忠实于江南原著的龙族冒险。</p>
        </div>
      </div>
      ${games.filter(g => g.slug !== 'dragonraja').map(g => `
        <div class="game-card">
          <div class="game-card-body">
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
          </div>
          <div class="game-card-meta">
            <span>自定义模板</span>
            <button class="btn btn-sm btn-ghost" onclick="deleteGame('${g.slug}')">删除</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
});

window.showNewTemplate = function() {
  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '✨ 新建游戏模板';
  body.innerHTML = `
    <form onsubmit="createTemplate(event)">
      <div class="form-group">
        <label>模板标识 (slug)</label>
        <input type="text" id="t-slug" placeholder="my-game" required>
      </div>
      <div class="form-group">
        <label>游戏标题</label>
        <input type="text" id="t-title" placeholder="我的游戏" required>
      </div>
      <div class="form-group">
        <label>描述</label>
        <textarea id="t-desc" placeholder="描述你的游戏..."></textarea>
      </div>
      <div class="form-group">
        <label>模板JSON数据</label>
        <textarea id="t-data" placeholder='{\n  "scenes": {},\n  "locations": {},\n  "npcs": {}\n}' style="min-height:300px;font-family:var(--font-mono);font-size:12px"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">创建模板</button>
    </form>
  `;
  modal.style.display = 'flex';
};

window.createTemplate = async function(e) {
  e.preventDefault();
  const slug = document.getElementById('t-slug').value.trim();
  const title = document.getElementById('t-title').value.trim();
  const desc = document.getElementById('t-desc').value.trim();
  const dataStr = document.getElementById('t-data').value.trim();
  
  if (!slug || !title) { alert('请填写必要信息'); return; }
  
  let templateData;
  try {
    templateData = dataStr ? JSON.parse(dataStr) : {};
  } catch(e) {
    alert('JSON格式错误: ' + e.message);
    return;
  }
  
  const gameData = {
    slug,
    title,
    desc: desc || '自定义游戏模板',
    tags: ['自定义'],
    banner: '🎮',
    rating: 0,
    author: App.user?.nick || App.user?.username,
    template: templateData,
    created: Date.now()
  };
  
  await App.registerGame(gameData);
  alert('✅ 模板创建成功！');
  closeModalById('save-modal');
  navigate('creator');
};

window.showImportAI = function() {
  const state = GameEngine?.state;
  const char = GameEngine?.char;
  
  const contextStr = state ? JSON.stringify({
    location: state.location,
    chapter: state.chapter,
    flags: state.flags,
    relationships: state.relationships,
    inventory: state.inventory,
    char: { name: char?.name, attributes: char?.attributes, bloodline: char?.bloodline }
  }, null, 2) : '{}';

  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '🤖 AI剧情导入/导出';
  body.innerHTML = `
    <p style="margin-bottom:12px;color:var(--text-secondary);font-size:13px">
      将当前游戏状态导出，发送给我（AI）生成剧情，再把结果粘贴回来。
    </p>
    
    <div style="margin-bottom:16px">
      <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px">当前状态（可复制发送给AI）</label>
      <textarea id="ai-export-data" readonly style="width:100%;min-height:120px;padding:12px;background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font-mono);font-size:12px">${contextStr}</textarea>
      <button class="btn btn-sm btn-secondary" style="margin-top:6px" onclick="copyAIData()">📋 复制状态</button>
    </div>

    <div>
      <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px">粘贴AI生成的剧情JSON</label>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">
        格式: {"narrative": "剧情文本", "choices": [{"id":"c1","text":"选项1"}], "effects": {"flag":"xxx", "affection": {"NPC":5}}}
      </p>
      <textarea id="ai-import-data" style="width:100%;min-height:200px;padding:12px;background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font-mono);font-size:12px" placeholder='在这里粘贴我生成的JSON数据包...'></textarea>
    </div>
    
    <div class="import-actions" style="margin-top:12px">
      <button class="btn btn-primary btn-sm" onclick="importAIContent()">📥 导入剧情</button>
      <button class="btn btn-sm btn-ghost" onclick="closeModalById('save-modal')">取消</button>
    </div>

    <div style="margin-top:20px;padding:16px;background:var(--bg-card);border-radius:var(--radius-md)">
      <h4 style="font-size:14px;margin-bottom:8px">📌 使用说明</h4>
      <ol style="font-size:12px;color:var(--text-secondary);line-height:1.8;padding-left:20px">
        <li>点击「复制状态」，将当前游戏状态粘贴到对话中发给我</li>
        <li>告诉我你想做什么，我生成后续剧情+选项+状态变更</li>
        <li>我把结果以JSON格式发给你，你粘贴到上面的输入框</li>
        <li>点击「导入剧情」，游戏自动更新</li>
      </ol>
    </div>
  `;
  modal.style.display = 'flex';
};

window.copyAIData = function() {
  const ta = document.getElementById('ai-export-data');
  if (ta) {
    ta.select();
    document.execCommand('copy');
    alert('✅ 已复制。请在对话中粘贴并发给我，我来生成下一段剧情。');
  }
};

window.importAIContent = function() {
  const ta = document.getElementById('ai-import-data');
  if (!ta || !ta.value.trim()) {
    alert('请先粘贴AI生成的剧情JSON数据包');
    return;
  }
  
  try {
    const data = JSON.parse(ta.value.trim());
    
    if (!GameEngine || !GameEngine.state) {
      alert('请先开始游戏再导入剧情');
      return;
    }
    
    // Apply narrative
    if (data.narrative) {
      GameEngine.state.narrative = data.narrative;
    }
    
    // Apply choices
    if (data.choices) {
      GameEngine.state.choices = data.choices;
    }
    
    // Apply effects
    if (data.effects) {
      GameEngine._applyEffects(data.effects);
    }
    
    // Apply state overrides
    if (data.state) {
      Object.assign(GameEngine.state, data.state);
    }
    
    // Re-render
    const result = {
      narrative: data.narrative || GameEngine.state.narrative || '剧情已更新',
      choices: data.choices || GameEngine.state.choices || []
    };
    
    const na = document.getElementById('narrative-area');
    const ca = document.getElementById('choices-area');
    if (typeof renderNarrative === 'function' && na) na.innerHTML = renderNarrative(result);
    if (typeof renderChoices === 'function' && ca) ca.innerHTML = renderChoices(result);
    
    // Auto-save
    GameEngine.autoSave();
    
    closeModalById('save-modal');
    alert('✅ AI剧情已成功导入！游戏状态已更新。');
  } catch(e) {
    alert('❌ 格式错误：' + e.message + '\n\n请确保粘贴的是有效的JSON格式。');
  }
};

window.showTemplateGuide = function() {
  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '📖 模板开发指南';
  body.innerHTML = `
    <div style="font-size:13px;line-height:1.8;color:var(--text-secondary)">
      <h4 style="color:var(--text-primary);margin-bottom:8px">模板结构</h4>
      <pre style="background:var(--bg-input);padding:12px;border-radius:var(--radius-sm);font-size:12px;overflow-x:auto">
{
  "template": {
    "slug": "my-game",
    "title": "我的游戏",
    "description": "...",
    "startLocation": "start",
    
    "bloodlines": [{ "id": "xxx", "name": "...", "desc": "..." }],
    "backgrounds": [{ "id": "xxx", "name": "...", "desc": "..." }],
    "attributes": [{ "id": "str", "name": "力量", "desc": "..." }],
    "spiritWords": [{ "id": "xxx", "name": "...", "type": "攻击型", "desc": "..." }],
    
    "locations": {
      "start": { "id": "start", "name": "起点", "icon": "📍", "desc": "..." }
    },
    
    "npcs": {
      "npc1": { "id": "npc1", "name": "...", "title": "...", "desc": "..." }
    }
  },
  
  "scenes": {
    "start": {
      "id": "start",
      "chapter": 1,
      "location": "start",
      "narrative": "故事从这里开始...",
      "effects": { "flag": "started" },
      "choices": [
        { 
          "text": "选项A",
          "next": "scene_a",
          "effects": { "flag": "chose_a" }
        }
      ]
    }
  }
}
      </pre>

      <h4 style="color:var(--text-primary);margin:16px 0 8px">场景节点字段</h4>
      <ul style="padding-left:20px">
        <li><b>id</b> — 场景唯一标识</li>
        <li><b>chapter</b> — 章节编号</li>
        <li><b>location</b> — 对应locations中的id</li>
        <li><b>narrative</b> — 叙事文本，支持{name}等变量</li>
        <li><b>effects</b> — 进入场景时自动触发的效果</li>
        <li><b>choices</b> — 玩家选项列表</li>
        <li><b>combat</b> — 战斗配置（可选）</li>
      </ul>

      <h4 style="color:var(--text-primary);margin:16px 0 8px">选项字段</h4>
      <ul style="padding-left:20px">
        <li><b>text</b> — 选项文本</li>
        <li><b>hint</b> — 选项提示（可选）</li>
        <li><b>next</b> — 跳转到下一个场景id</li>
        <li><b>effects</b> — 选择后触发的效果</li>
        <li><b>conditions</b> — 选项出现条件（可选）</li>
        <li><b>check</b> — 属性检定（可选）</li>
        <li><b>combat</b> — 触发战斗（可选）</li>
      </ul>

      <h4 style="color:var(--text-primary);margin:16px 0 8px">效果字段 (effects)</h4>
      <ul style="padding-left:20px">
        <li><b>flag</b> — 添加标记</li>
        <li><b>removeFlag</b> — 移除标记</li>
        <li><b>hp</b> — 加减生命值</li>
        <li><b>sp</b> — 加减灵力</li>
        <li><b>exp</b> — 加减经验</li>
        <li><b>item</b> — 获得物品</li>
        <li><b>removeItem</b> — 失去物品</li>
        <li><b>affection</b> — NPC好感度变更 {"NPC名": 数值}</li>
        <li><b>location</b> — 切换地点</li>
        <li><b>chapter</b> — 切换章节</li>
      </ul>
    </div>
    <button class="btn btn-secondary btn-full" style="margin-top:16px" onclick="closeModalById('save-modal')">关闭</button>
  `;
  modal.style.display = 'flex';
};

window.deleteGame = async function(slug) {
  if (!confirm(`确认删除模板 "${slug}"？此操作不可撤销。`)) return;
  await App.deleteGame(slug);
  navigate('creator');
};
