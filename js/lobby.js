/* ========================================
   UU模拟器 - 游戏大厅
   ======================================== */

Router.register('home', async () => {
  const user = App.user;
  const games = await App.getGames();
  const featured = games.length > 0 ? games : [
    {
      slug: 'dragonraja', title: '龙族：火之晨曦',
      desc: '在卡塞尔学院的大门背后，隐藏着龙族与混血种千年的战争。你收到了一封来自芝加哥远郊的神秘录取通知书...',
      tags: ['奇幻', '剧情向', 'TRPG'], players: '1', rating: 4.8,
      banner: '🐉', author: '内置'
    }
  ];

  return `
  <div class="page-content">
    <div class="hero">
      <h1>欢迎来到 <span>UU 模拟器</span></h1>
      <p>AI驱动的文字冒险游戏平台。每一个选择，都将改变你的命运。</p>
      ${user ? `<p style="color:var(--text-secondary)">欢迎回来，${user.nick || user.username}</p>`
             : `<button class="btn btn-primary btn-lg" onclick="showAuth()">立即开始冒险</button>`}
    </div>

    <div class="lobby-filters">
      <span class="filter-tag active">全部</span>
      <span class="filter-tag">奇幻</span>
      <span class="filter-tag">TRPG</span>
      <span class="filter-tag">剧情向</span>
      <span class="filter-tag">高自由度</span>
    </div>

    <div class="featured-grid">
      ${games.concat(featured).slice(0, 1).map(g => `
        <div class="game-card" onclick="startGame('${g.slug}')">
          <div class="game-card-banner" style="background: linear-gradient(135deg, #1a0a2e, #2a1a1a);">
            <span style="font-size:64px">${g.banner || '🎮'}</span>
            <div class="overlay"></div>
          </div>
          <div class="game-card-body">
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
          </div>
          <div class="game-card-meta">
            <span>${g.tags?.map(t => `<span class="tag">${t}</span>`).join(' ') || ''}</span>
            <span>⭐ ${g.rating || '?'}</span>
          </div>
        </div>
      `).join('')}
    </div>

    ${!user ? `
    <div style="text-align:center;margin-top:48px;padding:32px;background:var(--bg-card);border-radius:var(--radius-md);border:1px solid var(--border-color)">
      <h3 style="margin-bottom:12px">登录后即可创建角色、保存进度</h3>
      <button class="btn btn-primary" onclick="showAuth()">登录 / 注册</button>
    </div>` : `
    <div style="text-align:center;margin-top:48px;padding:32px;background:var(--bg-card);border-radius:var(--radius-md);border:1px solid var(--border-color)">
      <h3 style="margin-bottom:12px">开始你的龙族冒险</h3>
      <p style="color:var(--text-secondary);margin-bottom:16px">创建属于你的混血种角色，踏入卡塞尔学院的大门</p>
      <button class="btn btn-primary btn-lg" onclick="startGame('dragonraja')">🐉 进入龙族世界</button>
    </div>`}
  </div>`;
});

Router.register('lobby', async () => {
  const games = await App.getGames();
  const builtin = [
    { slug: 'dragonraja', title: '龙族：火之晨曦', desc: '卡塞尔学院，混血种与龙族的千年战争。你收到了一封神秘的录取通知书...', tags: ['奇幻', 'TRPG', '剧情向'], banner: '🐉', rating: 4.8 }
  ];
  const all = games.length > 0 ? games : builtin;

  return `
  <div class="page-content">
    <div class="page-header">
      <h1>🎮 游戏大厅</h1>
      <p>选择一个世界，开启你的冒险</p>
    </div>
    <div class="lobby-filters">
      <span class="filter-tag active">全部</span>
      <span class="filter-tag">奇幻</span>
      <span class="filter-tag">TRPG</span>
    </div>
    <div class="featured-grid">
      ${all.map(g => `
        <div class="game-card" onclick="startGame('${g.slug}')">
          <div class="game-card-banner" style="background: linear-gradient(135deg, #1a0a2e, #2a1a1a);">
            <span style="font-size:64px">${g.banner || '🎮'}</span>
            <div class="overlay"></div>
          </div>
          <div class="game-card-body">
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
          </div>
          <div class="game-card-meta">
            <span>${g.tags?.map(t => `<span class="tag">${t}</span>`).join(' ') || ''}</span>
            <span>⭐ ${g.rating || '?'}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
});

// 开始游戏
function startGame(slug) {
  if (!App.user) {
    showAuth();
    return;
  }
  Router.go('character', { game: slug });
}
