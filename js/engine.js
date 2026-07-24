/* ========================================
   UU模拟器 - 游戏引擎
   叙事引擎 + TRPG战斗系统 + 状态管理
   ======================================== */

const GameEngine = {
  char: null,
  template: null,
  state: null,
  currentSaveId: null,
  autoSaveTimer: null,

  async init(char, template) {
    this.char = char;
    this.template = template;
    this.state = {
      location: char.location || template.startLocation || 'start',
      chapter: 1,
      scene: 'intro',
      hp: char.hp || 50,
      maxHp: char.maxHp || 50,
      sp: 10,
      maxSp: 10,
      inventory: char.inventory || [],
      flags: char.flags || [],
      relationships: char.relationships || {},
      storyLog: char.storyLog || [],
      combat: null,
      choices: [],
      narrative: '',
      turn: 0
    };
    // Start auto-save
    this._startAutoSave();
    return this;
  },

  _startAutoSave() {
    if (this.autoSaveTimer) clearInterval(this.autoSaveTimer);
    this.autoSaveTimer = setInterval(() => {
      if (this.char) this.autoSave();
    }, 60000); // Auto save every 60 seconds
  },

  // ==========================================
  // 叙事引擎
  // ==========================================

  async startScene(sceneId) {
    const template = this.template;
    const scene = template.scenes?.[sceneId] || template.scenes?.['start'];
    if (!scene) {
      return this._generateAIScene(sceneId);
    }

    this.state.location = scene.location || this.state.location;
    this.state.scene = sceneId;

    let narrative = this._renderText(scene.narrative || '');
    
    // Check for combat
    if (scene.combat) {
      this.startCombat(scene.combat);
    }

    // Build choices
    let choices = [];
    if (scene.choices) {
      choices = scene.choices
        .filter(c => this._checkConditions(c.conditions))
        .map(c => ({
          id: c.id || Math.random().toString(36).slice(2, 8),
          text: this._renderText(c.text),
          hint: c.hint ? this._renderText(c.hint) : '',
          next: c.next,
          effects: c.effects || {},
          combat: c.combat || null,
          check: c.check || null
        }));
    }

    // Apply automatic effects
    this._applyEffects(scene.effects);

    this.state.narrative = narrative;
    this.state.choices = choices;
    this.state.turn++;
    this.state.storyLog.push({ turn: this.state.turn, scene: sceneId, narrative: narrative.slice(0, 100) });

    return { narrative, choices, state: this._getState() };
  },

  async makeChoice(choiceId) {
    const choice = this.state.choices.find(c => c.id === choiceId);
    if (!choice) throw new Error('无效的选择');

    // Apply effects
    this._applyEffects(choice.effects);

    // Skill check
    if (choice.check) {
      const result = this._skillCheck(choice.check);
      this.state.narrative += `\n\n[检定: ${choice.check.attr}] 掷出 ${result.roll} + ${result.modifier} = ${result.total}，目标值 ${result.dc} — ${result.success ? '✅ 成功' : '❌ 失败'}`;
      if (choice.check.failNext && !result.success) {
        return this.startScene(choice.check.failNext);
      }
    }

    // Start combat
    if (choice.combat) {
      this.startCombat(choice.combat);
      return this._renderState();
    }

    // Go to next scene
    if (choice.next) {
      return this.startScene(choice.next);
    }

    // Fallback: generate AI scene
    return this._generateAIScene(`after_${choiceId}`);
  },

  // ==========================================
  // TRPG战斗系统 (D20)
  // ==========================================

  startCombat(combatConfig) {
    const enemies = combatConfig.enemies || [];
    this.state.combat = {
      active: true,
      turn: 0,
      round: 1,
      enemies: enemies.map(e => ({
        ...e,
        currentHp: e.hp || 20,
        maxHp: e.hp || 20,
        status: 'alive'
      })),
      log: ['⚔️ 战斗开始！'],
      playerAction: null,
      enemyTarget: null,
      isPlayerTurn: true
    };
  },

  performAction(action, targetId) {
    if (!this.state.combat) return null;
    const combat = this.state.combat;
    const char = this.char;
    const attrs = char.attributes || {};
    let result = { log: [], effects: {} };

    // Roll initiative
    if (combat.turn === 0) {
      const ini = this._d20() + Math.floor((attrs.agi || 1) / 2);
      const eIni = this._d20() + 5;
      combat.isPlayerTurn = ini >= eIni;
      combat.log.push(`🎲 先攻检定: 你(${ini}) vs 敌人(${eIni}) — ${combat.isPlayerTurn ? '你先手' : '敌人先手'}`);
      combat.turn = 1;
      if (!combat.isPlayerTurn) return this._enemyTurn();
    }

    switch(action) {
      case 'attack': {
        const enemy = combat.enemies.find(e => e.id === targetId && e.status === 'alive');
        if (!enemy) return null;
        const roll = this._d20();
        const mod = Math.floor((attrs.str || 1) / 2);
        const total = roll + mod;
        const ac = enemy.ac || 10;
        const hit = total >= ac;
        
        let dmg = 0;
        let log = `🎯 攻击 ${enemy.name}: 掷出 ${roll} + ${mod} = ${total} vs AC ${ac} — ${hit ? '命中！' : '未命中'}`;
        
        if (hit) {
          dmg = this._d20(6) + Math.floor((attrs.str || 1) / 3);
          if (roll === 20) { dmg *= 2; log += ' 💥 暴击！'; }
          enemy.currentHp = Math.max(0, enemy.currentHp - dmg);
          log += ` 造成 ${dmg} 点伤害`;
          if (enemy.currentHp <= 0) {
            enemy.status = 'dead';
            log += ` 💀 ${enemy.name} 被击败！`;
          }
        }
        combat.log.push(log);
        result.log.push(log);
        break;
      }
      case 'spirit': {
        // Use spirit word (言灵)
        const spCost = 3;
        if (this.state.sp < spCost) {
          combat.log.push('❌ 灵力不足，无法使用言灵');
          return null;
        }
        this.state.sp -= spCost;
        const enemy = combat.enemies.find(e => e.id === targetId && e.status === 'alive');
        if (!enemy) return null;
        const roll = this._d20();
        const mod = Math.floor((attrs.int || 1) / 2) + Math.floor((attrs.blood || 1) / 2);
        const total = roll + mod;
        const dc = 8 + (enemy.mdef || 5);
        const hit = total >= dc;
        
        let dmg = 0;
        let log = `🔮 言灵释放: 掷出 ${roll} + ${mod} = ${total} vs DC ${dc} — ${hit ? '成功' : '失败'}`;
        
        if (hit) {
          dmg = this._d20(8) + Math.floor((attrs.blood || 1) / 2);
          if (roll >= 18) { dmg = Math.floor(dmg * 1.5); log += ' ✨ 言灵共鸣！'; }
          enemy.currentHp = Math.max(0, enemy.currentHp - dmg);
          log += ` 造成 ${dmg} 点精神伤害`;
          if (enemy.currentHp <= 0) {
            enemy.status = 'dead';
            log += ` 💀 ${enemy.name} 被击败！`;
          }
        }
        combat.log.push(log);
        result.log.push(log);
        break;
      }
      case 'defend': {
        const heal = this._d20(4) + Math.floor((attrs.con || 1) / 3);
        this.state.hp = Math.min(this.state.maxHp, this.state.hp + heal);
        combat.log.push(`🛡️ 防御姿态: 恢复 ${heal} HP (当前 ${this.state.hp}/${this.state.maxHp})`);
        result.log.push(`防御恢复 ${heal} HP`);
        break;
      }
      case 'flee': {
        const roll = this._d20();
        const mod = Math.floor((attrs.agi || 1) / 2);
        const success = roll + mod > 12;
        combat.log.push(`🏃 试图逃跑: 掷出 ${roll} + ${mod} = ${roll + mod} — ${success ? '成功逃脱' : '逃跑失败'}`);
        if (success) {
          combat.active = false;
          combat.log.push('✅ 你成功脱离了战斗');
          return { type: 'flee_success', log: ['成功逃离战斗'] };
        }
        return null;
      }
    }

    // Check if all enemies dead
    const alive = combat.enemies.filter(e => e.status === 'alive');
    if (alive.length === 0) {
      combat.active = false;
      combat.log.push('🏆 战斗胜利！');
      result.log.push('🏆 战斗胜利！');
      // Reward
      const exp = combat.enemies.reduce((sum, e) => sum + (e.expReward || 10), 0);
      this.char.exp = (this.char.exp || 0) + exp;
      result.effects.expGain = exp;
      this.state.combat = null;
      return { type: 'victory', ...result };
    }

    // Enemy turn
    return this._enemyTurn();
  },

  _enemyTurn() {
    const combat = this.state.combat;
    if (!combat || !combat.active) return null;

    const alive = combat.enemies.filter(e => e.status === 'alive');
    const result = { log: [], effects: {} };

    alive.forEach(enemy => {
      const roll = this._d20();
      const atk = enemy.atk || 5;
      const total = roll + atk;
      const ac = 10 + Math.floor((this.char.attributes?.agi || 1) / 2);
      const hit = total >= ac;
      
      let log = `👹 ${enemy.name} 攻击: 掷出 ${roll} + ${atk} = ${total} vs AC ${ac} — ${hit ? '命中！' : '未命中'}`;
      
      if (hit) {
        const dmg = this._d20(6) + Math.floor(atk / 2);
        this.state.hp = Math.max(0, this.state.hp - dmg);
        log += ` 受到 ${dmg} 点伤害 (剩余 ${this.state.hp}/${this.state.maxHp})`;
        
        if (this.state.hp <= 0) {
          log += ' 💀 你被击倒了...';
          this.state.combat.active = false;
          this.state.combat = null;
          result.log.push(log);
          return { type: 'defeat', log: result.log };
        }
      }
      combat.log.push(log);
      result.log.push(log);
    });

    combat.round++;
    combat.isPlayerTurn = true;
    return { type: 'enemy_turn_end', ...result };
  },

  // ==========================================
  // 工具函数
  // ==========================================

  _d20(sides = 20) {
    return Math.floor(Math.random() * sides) + 1;
  },

  _skillCheck(check) {
    const attr = check.attr || 'str';
    const dc = check.dc || 10;
    const roll = this._d20();
    const modifier = Math.floor((this.char.attributes?.[attr] || 1) / 2);
    const total = roll + modifier;
    return { roll, modifier, total, dc, success: total >= dc };
  },

  _checkConditions(conditions) {
    if (!conditions) return true;
    const flags = this.state.flags;
    const rels = this.state.relationships;
    
    if (conditions.flag) return flags.includes(conditions.flag);
    if (conditions.noFlag) return !flags.includes(conditions.noFlag);
    if (conditions.attr) {
      const [attr, op, val] = conditions.attr.split(/\s+/);
      const actual = this.char.attributes?.[attr] || 1;
      if (op === '>=') return actual >= parseInt(val);
      if (op === '<=') return actual <= parseInt(val);
      if (op === '>') return actual > parseInt(val);
      if (op === '<') return actual < parseInt(val);
      if (op === '==') return actual === parseInt(val);
    }
    if (conditions.affection) {
      const [npc, op, val] = conditions.affection.split(/\s+/);
      const actual = rels[npc] || 0;
      if (op === '>=') return actual >= parseInt(val);
      if (op === '>') return actual > parseInt(val);
    }
    if (conditions.item) return this.state.inventory.includes(conditions.item);
    if (conditions.noItem) return !this.state.inventory.includes(conditions.noItem);
    return true;
  },

  _applyEffects(effects) {
    if (!effects) return;
    if (effects.flag) this.state.flags.push(effects.flag);
    if (effects.removeFlag) {
      this.state.flags = this.state.flags.filter(f => f !== effects.removeFlag);
    }
    if (effects.item) {
      if (!this.state.inventory.includes(effects.item)) this.state.inventory.push(effects.item);
    }
    if (effects.removeItem) {
      this.state.inventory = this.state.inventory.filter(i => i !== effects.removeItem);
    }
    if (effects.hp) {
      this.state.hp = Math.max(0, Math.min(this.state.maxHp, this.state.hp + effects.hp));
    }
    if (effects.sp) {
      this.state.sp = Math.max(0, Math.min(this.state.maxSp, this.state.sp + effects.sp));
    }
    if (effects.exp) {
      this.char.exp = (this.char.exp || 0) + effects.exp;
    }
    if (effects.affection) {
      Object.entries(effects.affection).forEach(([npc, val]) => {
        this.state.relationships[npc] = (this.state.relationships[npc] || 0) + val;
      });
    }
    if (effects.setAffection) {
      Object.entries(effects.setAffection).forEach(([npc, val]) => {
        this.state.relationships[npc] = val;
      });
    }
    if (effects.location) {
      this.state.location = effects.location;
    }
    if (effects.chapter) {
      this.state.chapter = effects.chapter;
    }
  },

  _renderText(text) {
    if (!text) return '';
    return text
      .replace(/{name}/g, this.char?.name || '你')
      .replace(/{gender}/g, this.char?.gender === '女' ? '她' : '他')
      .replace(/{self}/g, this.char?.gender === '女' ? '你' : '你')
      .replace(/{bloodline}/g, this.char?.bloodline || '混血种')
      .replace(/{spirit}/g, this._getSpiritName())
      .replace(/{location}/g, this.state?.location || '未知');
  },

  _getSpiritName() {
    const names = {
      sword: '天羽羽斩', flame: '君焰', time: '时间零',
      thunder: '雷池', soul: '审判', shield: '无尘之地'
    };
    return names[this.char?.spirit] || '未知言灵';
  },

  _getState() {
    return {
      hp: this.state.hp,
      maxHp: this.state.maxHp,
      sp: this.state.sp,
      maxSp: this.state.maxSp,
      location: this.state.location,
      chapter: this.state.chapter,
      scene: this.state.scene,
      turn: this.state.turn,
      inventory: [...this.state.inventory],
      flags: [...this.state.flags],
      relationships: { ...this.state.relationships },
      attribtues: { ...(this.char.attributes || {}) },
      exp: this.char.exp || 0,
      level: this.char.level || 1,
      combat: this.state.combat ? { ...this.state.combat, log: [...this.state.combat.log] } : null
    };
  },

  _generateAIScene(sceneId) {
    // Placeholder for AI-generated scenes
    // When AI generation is triggered, this returns a format that the user imports
    return {
      type: 'ai_needed',
      sceneId: sceneId,
      context: {
        location: this.state.location,
        flags: this.state.flags,
        relationships: this.state.relationships,
        char: { name: this.char.name, attributes: this.char.attributes, bloodline: this.char.bloodline }
      },
      narrative: '[AI生成区域] 这段剧情需要我（AI）来生成。请告诉我你当前的选择，我来写接下来的故事。',
      choices: [
        { id: 'ai_wait', text: '等待AI生成剧情...', hint: '在聊天中告诉我你的行动', next: null }
      ]
    };
  },

  // ==========================================
  // 存档系统
  // ==========================================

  async save(slotName) {
    const saveData = {
      id: this.currentSaveId || `save_${Date.now()}`,
      charId: this.char.id,
      slotName: slotName || `存档 ${formatDate(Date.now())}`,
      char: { ...this.char },
      state: { ...this.state, storyLog: this.state.storyLog.slice(-50) },
      savedAt: Date.now(),
      chapter: this.state.chapter,
      location: this.state.location,
      turn: this.state.turn
    };
    if (!this.currentSaveId) {
      this.currentSaveId = saveData.id;
    }
    await App.saveGame(saveData);
    return saveData;
  },

  async autoSave() {
    if (!this.char) return;
    const saves = await App.getSaves(this.char.id);
    const autoSaves = saves.filter(s => s.slotName?.startsWith('[自动]'));
    // Keep only 5 auto saves
    if (autoSaves.length >= 5) {
      const oldest = autoSaves.sort((a, b) => a.savedAt - b.savedAt)[0];
      await App.deleteSave(oldest.id);
    }
    const saveData = {
      id: `auto_${Date.now()}`,
      charId: this.char.id,
      slotName: `[自动] 第${this.state.chapter}章 - ${formatDate(Date.now())}`,
      char: { ...this.char },
      state: { ...this.state, storyLog: this.state.storyLog.slice(-30) },
      savedAt: Date.now(),
      chapter: this.state.chapter,
      location: this.state.location
    };
    await App.saveGame(saveData);
  },

  async load(saveId) {
    const data = await App.loadSave(saveId);
    if (!data) throw new Error('存档未找到');
    this.char = data.char;
    this.state = data.state;
    this.currentSaveId = data.id;
    return this._renderState();
  }
};

// ==========================================
// 游戏界面渲染
// ==========================================
Router.register('game', async (params) => {
  const charId = params.charId;
  const char = App.currentChar;
  if (!char) return '<div class="page-content"><h1>请先创建角色</h1><button class="btn btn-primary" onclick="navigate(\'lobby\')">返回大厅</button></div>';

  const template = getGameTemplate(char.game);
  if (!template) return '<div class="page-content"><h1>游戏模板未找到</h1></div>';

  await GameEngine.init(char, template);
  const result = await GameEngine.startScene('start');

  // Re-save character reference
  App.currentChar = GameEngine.char;

  return renderGameUI(result);
});

function renderGameUI(result) {
  const s = GameEngine._getState();
  const char = GameEngine.char;
  const attrs = char.attributes || {};

  return `
  <div class="game-layout">
    <!-- 左侧面板：角色信息 -->
    <div class="game-sidebar">
      <div class="sidebar-section" style="text-align:center">
        <div class="char-portrait">${char.gender === '女' ? '👩' : '🧑'}</div>
        <h3 style="font-size:15px">${char.name}</h3>
        <p style="font-size:12px;color:var(--text-muted)">Lv.${char.level || 1} · ${char.bloodline || '混血种'}</p>
      </div>
      <div class="sidebar-section">
        <h4>状态</h4>
        <div class="stat-bar">
          <span class="label">HP</span>
          <div class="bar-bg"><div class="bar-fill" style="width:${(s.hp/s.maxHp)*100}%;background:var(--accent-red)"></div></div>
          <span class="value">${s.hp}/${s.maxHp}</span>
        </div>
        <div class="stat-bar">
          <span class="label">SP</span>
          <div class="bar-bg"><div class="bar-fill" style="width:${(s.sp/s.maxSp)*100}%;background:var(--accent-blue)"></div></div>
          <span class="value">${s.sp}/${s.maxSp}</span>
        </div>
        <div class="stat-bar">
          <span class="label">EXP</span>
          <div class="bar-bg"><div class="bar-fill" style="width:${((char.exp||0) % 100)/100*100}%;background:var(--accent-gold)"></div></div>
          <span class="value">${char.exp||0}</span>
        </div>
      </div>
      <div class="sidebar-section">
        <h4>属性</h4>
        ${Object.entries(attrs).map(([k, v]) => {
          const names = {str:'力量',agi:'敏捷',con:'体质',int:'智力',cha:'魅力',blood:'血统'};
          return `<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0">
            <span style="color:var(--text-secondary)">${names[k]||k}</span>
            <span style="color:var(--accent-gold)">${v}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="sidebar-section">
        <h4>背包 (${s.inventory.length})</h4>
        <div class="inventory-grid">
          ${Array.from({length:8}).map((_, i) => `
            <div class="inv-slot ${s.inventory[i] ? 'has-item' : ''}" title="${s.inventory[i] || ''}">
              ${s.inventory[i] ? '📦' : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="sidebar-section">
        <h4>好感度</h4>
        ${Object.keys(s.relationships).length === 0 ? '<div style="font-size:12px;color:var(--text-muted)">暂无</div>' :
          Object.entries(s.relationships).slice(0, 5).map(([npc, val]) => `
            <div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0">
              <span style="color:var(--text-secondary)">${npc}</span>
              <span style="color:${val > 0 ? 'var(--success)' : val < 0 ? 'var(--danger)' : 'var(--text-muted)'}">${val > 0 ? '+' : ''}${val}</span>
            </div>
          `).join('')}
      </div>
    </div>

    <!-- 中间：叙事主区域 -->
    <div class="game-main" id="game-main">
      <div style="margin-bottom:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="location-tag" style="padding:4px 12px;border-radius:4px;background:rgba(212,168,67,0.15);color:var(--accent-gold);font-size:12px">📍 ${s.location}</span>
        <span style="font-size:12px;color:var(--text-muted)">第${s.chapter}章 · 回合 ${s.turn}</span>
        <span style="flex:1"></span>
        <button class="btn btn-sm btn-ghost" onclick="showSaveModal()">💾 存档</button>
        <button class="btn btn-sm btn-ghost" onclick="showLoadModal()">📂 读档</button>
      </div>

      <div class="narrative-area" id="narrative-area">
        ${renderNarrative(result)}
      </div>

      <div class="choices-area" id="choices-area">
        <h4>你的选择：</h4>
        ${renderChoices(result)}
      </div>
    </div>

    <!-- 右侧面板：地图 & 信息 -->
    <div class="game-sidebar-right">
      <div class="sidebar-section">
        <h4>地图</h4>
        <div class="map-container">
          ${renderMap(s.location)}
        </div>
      </div>
      <div class="sidebar-section">
        <h4>章节进度</h4>
        <div style="font-size:13px;color:var(--text-muted)">
          ${s.chapter === 1 ? '🌅 火之晨曦' : s.chapter === 2 ? '🌙 悼亡者之瞳' : s.chapter === 3 ? '🌊 黑月之潮' : '🔥 奥丁之渊'}
        </div>
        <div class="stat-bar" style="margin-top:8px">
          <span class="label">进度</span>
          <div class="bar-bg"><div class="bar-fill" style="width:${Math.min(100, (s.turn/50)*100)}%;background:var(--accent-gold)"></div></div>
          <span class="value">${Math.min(100, Math.floor((s.turn/50)*100))}%</span>
        </div>
      </div>
      <div class="sidebar-section">
        <h4>标记</h4>
        ${s.flags.length === 0 ? '<div style="font-size:12px;color:var(--text-muted)">暂无</div>' :
          s.flags.map(f => `<div style="font-size:12px;padding:3px 0">🏷️ ${f}</div>`).join('')}
      </div>
      <div class="sidebar-section">
        <button class="btn btn-sm btn-secondary btn-full" onclick="showAIImport()">🤖 AI导入剧情</button>
      </div>
    </div>
  </div>`;
}

function renderNarrative(result) {
  if (!result) return '<div class="system-msg">加载中...</div>';
  
  let html = '<div class="narrative-text">';
  
  // Location tag
  if (result.narrative) {
    html += `<span class="location-tag">📍 ${GameEngine.state?.location || ''}</span>\n\n`;
    
    // Parse narrative for special tags
    let text = result.narrative;
    // Highlight NPC names (Chinese characters followed by : or said patterns)
    text = text.replace(/(路明非|楚子航|凯撒|诺诺|昂热|芬里厄|夏弥|源稚生|绘梨衣)/g, '<span class="npc-name">$1</span>');
    // Highlight item names
    text = text.replace(/《([^》]+)》/g, '<span class="item-name">《$1》</span>');
    // System messages
    text = text.replace(/\[系统\]/g, '<span class="system-msg">[系统]</span>');
    
    html += text.replace(/\n/g, '<br>');
  }
  
  // Combat state
  if (GameEngine.state?.combat?.active) {
    const combat = GameEngine.state.combat;
    html += `
    <div class="combat-overlay">
      <div class="combat-title">⚔️ 战斗中</div>
      <div class="combat-stats">
        <div class="combatant">
          <div class="name">${GameEngine.char.name}</div>
          <div class="hp-bar"><div class="hp-fill" style="width:${(GameEngine.state.hp/GameEngine.state.maxHp)*100}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted)">${GameEngine.state.hp}/${GameEngine.state.maxHp} HP</div>
        </div>
        ${combat.enemies.filter(e => e.status === 'alive').map(e => `
          <div class="combatant">
            <div class="name" style="color:var(--accent-red)">${e.name}</div>
            <div class="hp-bar"><div class="hp-fill" style="width:${(e.currentHp/e.maxHp)*100}%;background:var(--accent-red)"></div></div>
            <div style="font-size:12px;color:var(--text-muted)">${e.currentHp}/${e.maxHp} HP</div>
          </div>
        `).join('')}
      </div>
      <div class="combat-log-area">
        ${combat.log.slice(-5).map(l => `<div class="${l.includes('命中') || l.includes('暴击') ? 'success' : l.includes('未命中') || l.includes('失败') ? 'failure' : ''}">${l}</div>`).join('')}
      </div>
      ${combat.isPlayerTurn ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <button class="btn btn-primary btn-sm" onclick="combatAction('attack', '${combat.enemies.filter(e=>e.status==='alive')[0]?.id || ''}')">⚔️ 攻击</button>
          <button class="btn btn-secondary btn-sm" onclick="combatAction('spirit', '${combat.enemies.filter(e=>e.status==='alive')[0]?.id || ''}')">🔮 言灵</button>
          <button class="btn btn-secondary btn-sm" onclick="combatAction('defend', '')">🛡️ 防御</button>
          <button class="btn btn-secondary btn-sm" onclick="combatAction('flee', '')">🏃 逃跑</button>
        </div>
      ` : '<p style="text-align:center;color:var(--text-muted)">等待敌人行动...</p>'}
    </div>`;
  }
  
  html += '</div>';
  return html;
}

function renderChoices(result) {
  if (!result?.choices || result.choices.length === 0) {
    return '<p style="color:var(--text-muted);font-size:13px">等待AI剧情...</p>';
  }
  
  return result.choices.map(c => `
    <button class="btn-choice" onclick="selectChoice('${c.id}')">
      ${c.text}
      ${c.hint ? `<span class="hint">${c.hint}</span>` : ''}
    </button>
  `).join('');
}

function renderMap(currentLocation) {
  const locations = GameEngine.template?.locations || {};
  const locs = Object.values(locations);
  if (locs.length === 0) return '<div style="font-size:12px;color:var(--text-muted)">暂无地图数据</div>';
  
  return locs.map(l => `
    <div class="map-location ${l.id === currentLocation ? 'current' : ''} ${GameEngine.state.flags.includes(`visited_${l.id}`) ? 'visited' : 'locked'}">
      ${l.icon || '📍'} ${l.name}
    </div>
  `).join('');
}

// ==========================================
// 全局交互函数
// ==========================================
window.selectChoice = async function(choiceId) {
  try {
    const result = await GameEngine.makeChoice(choiceId);
    // Re-render game UI
    const main = document.getElementById('game-main');
    if (main) {
      // Update narrative
      const na = document.getElementById('narrative-area');
      const ca = document.getElementById('choices-area');
      if (na) na.innerHTML = renderNarrative(result);
      if (ca) ca.innerHTML = renderChoices(result);
      // Update sidebar stats
      updateSidebar();
    } else {
      // Full re-render
      const page = document.getElementById('page-game');
      if (page) page.innerHTML = renderGameUI(result);
    }
  } catch(e) {
    alert('操作失败: ' + e.message);
  }
};

window.combatAction = async function(action, targetId) {
  try {
    const result = GameEngine.performAction(action, targetId);
    const na = document.getElementById('narrative-area');
    const ca = document.getElementById('choices-area');
    if (na) na.innerHTML = renderNarrative({ narrative: '', choices: [] });
    updateSidebar();
    
    // Check combat end
    if (result?.type === 'victory' || result?.type === 'defeat' || result?.type === 'flee_success') {
      // Return to narrative
      const nextResult = await GameEngine.startScene(GameEngine.state.scene || 'start');
      if (na) na.innerHTML = renderNarrative(nextResult);
      if (ca) ca.innerHTML = renderChoices(nextResult);
    }
  } catch(e) {
    console.error(e);
  }
};

function updateSidebar() {
  // This would update the sidebar stats without full re-render
  // For simplicity, we just update key elements by ID
}

window.showSaveModal = async function() {
  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '💾 保存游戏';
  
  const saves = await App.getSaves(GameEngine.char?.id);
  body.innerHTML = `
    <div style="margin-bottom:16px">
      <button class="btn btn-primary btn-full" onclick="doSave('手动存档')">📀 新建存档</button>
    </div>
    ${saves.length > 0 ? `
      <h4 style="margin-bottom:8px;font-size:14px;color:var(--text-secondary)">已有存档</h4>
      <div class="save-list">
        ${saves.map(s => `
          <div class="save-item">
            <div class="save-info">
              <div class="save-title">${s.slotName}</div>
              <div class="save-meta">${formatDate(s.savedAt)} · 第${s.chapter}章 · ${s.location}</div>
            </div>
            <div class="save-actions">
              <button class="btn btn-sm btn-secondary" onclick="doLoad('${s.id}')">读取</button>
              <button class="btn btn-sm btn-ghost" onclick="doDelete('${s.id}')">删除</button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '<p style="color:var(--text-muted);font-size:13px">暂无存档</p>'}
  `;
  modal.style.display = 'flex';
};

window.showLoadModal = async function() {
  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '📂 读取存档';
  
  const saves = await App.getSaves(GameEngine.char?.id);
  body.innerHTML = saves.length > 0 ? `
    <div class="save-list">
      ${saves.map(s => `
        <div class="save-item" onclick="doLoad('${s.id}')">
          <div class="save-info">
            <div class="save-title">${s.slotName}</div>
            <div class="save-meta">${formatDate(s.savedAt)} · 第${s.chapter}章 · ${s.location}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '<p style="color:var(--text-muted)">暂无存档</p>';
  modal.style.display = 'flex';
};

window.doSave = async function(name) {
  await GameEngine.save(name);
  alert('✅ 存档成功');
  closeModalById('save-modal');
};

window.doLoad = async function(id) {
  if (!confirm('读取存档将覆盖当前进度，确认？')) return;
  try {
    const result = await GameEngine.load(id);
    const page = document.getElementById('page-game');
    if (page) page.innerHTML = renderGameUI(result);
    closeModalById('save-modal');
    alert('✅ 读取成功');
  } catch(e) {
    alert('读取失败: ' + e.message);
  }
};

window.doDelete = async function(id) {
  if (!confirm('确认删除此存档？')) return;
  await App.deleteSave(id);
  showSaveModal();
};

window.showAIImport = function() {
  // This opens a dialog for importing AI-generated content
  const state = GameEngine.state;
  const context = {
    location: state.location,
    flags: state.flags,
    relationships: state.relationships,
    char: { name: GameEngine.char.name, attrs: GameEngine.char.attributes }
  };
  
  const exportData = `[UU-REQ] 当前状态: 位置=${state.location}, 第${state.chapter}章, 回合${state.turn}
[UU-REQ] 角色: ${GameEngine.char.name} (${GameEngine.char.bloodline})
[UU-REQ] 标记: ${state.flags.join(', ') || '无'}
[UU-REQ] 关系: ${Object.entries(state.relationships).map(([n, v]) => `${n}(${v})`).join(', ') || '无'}
[UU-REQ] 请继续剧情...`;

  const modal = document.getElementById('save-modal');
  const title = document.getElementById('save-modal-title');
  const body = document.getElementById('save-modal-body');
  title.textContent = '🤖 AI剧情导入';
  body.innerHTML = `
    <p style="margin-bottom:12px;color:var(--text-secondary);font-size:13px">将当前状态发送给我（AI），我生成剧情后你把结果粘贴回来。</p>
    <div class="import-area">
      <textarea id="ai-export-text" readonly>${exportData}</textarea>
    </div>
    <div style="margin-top:12px">
      <label style="font-size:13px;color:var(--text-secondary)">把我生成的剧情粘贴到这里：</label>
      <textarea id="ai-import-text" placeholder='粘贴AI剧情数据包...' style="width:100%;min-height:150px;margin-top:8px;padding:12px;background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font-mono);font-size:13px"></textarea>
    </div>
    <div class="import-actions">
      <button class="btn btn-primary btn-sm" onclick="importAIContent()">📥 导入剧情</button>
      <button class="btn btn-sm btn-secondary" onclick="copyAIExport()">📋 复制状态</button>
      <button class="btn btn-sm btn-ghost" onclick="closeModalById('save-modal')">取消</button>
    </div>
  `;
  modal.style.display = 'flex';
};

window.copyAIExport = function() {
  const ta = document.getElementById('ai-export-text');
  if (ta) {
    ta.select();
    document.execCommand('copy');
    alert('✅ 已复制当前状态，粘贴到对话中发送给我即可');
  }
};

window.importAIContent = function() {
  const ta = document.getElementById('ai-import-text');
  if (!ta || !ta.value.trim()) {
    alert('请先粘贴AI生成的剧情数据包');
    return;
  }
  
  try {
    const data = JSON.parse(ta.value.trim());
    // Apply the AI-generated content
    if (data.narrative) {
      GameEngine.state.narrative = data.narrative;
    }
    if (data.choices) {
      GameEngine.state.choices = data.choices;
    }
    if (data.effects) {
      GameEngine._applyEffects(data.effects);
    }
    if (data.state) {
      Object.assign(GameEngine.state, data.state);
    }
    
    const result = {
      narrative: data.narrative || '剧情已更新',
      choices: data.choices || []
    };
    
    const na = document.getElementById('narrative-area');
    const ca = document.getElementById('choices-area');
    if (na) na.innerHTML = renderNarrative(result);
    if (ca) ca.innerHTML = renderChoices(result);
    updateSidebar();
    closeModalById('save-modal');
    alert('✅ AI剧情已导入');
  } catch(e) {
    alert('格式错误，请确保是有效的JSON数据。错误: ' + e.message);
  }
};

function closeGame() {
  if (!confirm('退出游戏？进度将自动保存。')) return;
  GameEngine.autoSave();
  navigate('lobby');
}
