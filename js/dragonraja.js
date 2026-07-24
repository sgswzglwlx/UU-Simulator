/* ========================================
   UU模拟器 - 龙族：火之晨曦 完整数据包
   忠实于江南《龙族》原著设定
   ======================================== */

const DRAGONRAJA = {
  template: {
    slug: 'dragonraja',
    title: '龙族：火之晨曦',
    version: '1.0.0',
    author: '内置 | 江南《龙族》原著改编',
    description: '你收到了一封来自芝加哥远郊卡塞尔学院的录取通知书。这所表面普通的私立大学，实际上是秘党培养屠龙者的秘密机构。作为拥有龙族血统的混血种，你将踏入一个隐藏在人类世界之下的龙族战场。从火之晨曦到黑月之潮，你的每一个选择，都将改写龙族与人类的命运。',
    startLocation: 'start',
    stepNames: ['基本信息', '血统背景', '属性分配', '言灵选择', '确认创建'],

    // ========================================
    // 角色创建选项
    // ========================================
    bloodlines: [
      { id: 'bai_de', name: '白王血裔', desc: '白王的后裔，精神属性潜力极高，言灵天赋惊人。白王是龙族四大君王之外的第五位王者，掌握精神元素的极致。', icon: '🤍' },
      { id: 'hei_de', name: '黑王血裔', desc: '黑王尼德霍格的血脉继承者，肉体力量和龙血纯度极高。黑王是龙族的至高存在，所有龙类的始祖。', icon: '🖤' },
      { id: 'hun_xue', name: '普通混血种', desc: '最常见的混血种，龙血与人类血脉融合均衡。优势在于适应性极强，不会像高纯血统那样容易被龙血反噬。', icon: '💜' },
      { id: 'mi_dang', name: '秘党世家', desc: '出身秘党核心家族，家族世代从事屠龙事业。拥有丰富的知识和人脉，但对你的期望也更高。', icon: '⚜️' }
    ],

    backgrounds: [
      { id: 'student', name: '普通学生', desc: '在收到卡塞尔通知书前，你只是个普通的高中生，过着平凡的生活。但你的血统注定了你不平凡的人生。' },
      { id: 'fighter', name: '武术世家', desc: '自幼习武，身体素质远超常人。虽然不知道龙族的存在，但你的身体早已为战斗做好了准备。' },
      { id: 'scholar', name: '学术天才', desc: '在历史和语言学方面有惊人的天赋。你对古文字和神话传说有独特的理解，这也许源于你血脉中的记忆。' },
      { id: 'loner', name: '独行者', desc: '在街头长大，靠自己的本能活到现在。你的直觉异常敏锐，能感知到常人无法察觉的危险。' }
    ],

    attributes: [
      { id: 'str', name: '力量', desc: '物理攻击力与体能', icon: '💪' },
      { id: 'agi', name: '敏捷', desc: '速度与反应能力', icon: '⚡' },
      { id: 'con', name: '体质', desc: '生命值与伤害抗性', icon: '🛡️' },
      { id: 'int', name: '智力', desc: '知识储备与推理能力', icon: '🧠' },
      { id: 'cha', name: '魅力', desc: '社交能力与领导力', icon: '💎' },
      { id: 'blood', name: '血统纯度', desc: '龙血浓度，影响言灵威力和龙化风险', icon: '🔴' }
    ],

    spiritWords: [
      { id: 'sword', name: '剑御·天羽羽斩', type: '攻击型', desc: '召唤无数利刃攻击敌人。攻击范围广，血统纯度越高剑阵越强。传说中此言灵曾斩杀过龙王。', icon: '🗡️' },
      { id: 'flame', name: '炽·君焰', type: '攻击型', desc: '操控火焰的力量，释放高温烈焰焚烧一切。范围性杀伤力极强，但消耗也巨大。', icon: '🔥' },
      { id: 'time', name: '时隙·时间零', type: '辅助型', desc: '感知时间流速的变化，让自己进入超加速状态。在言灵领域内，外界的一切都像慢动作。', icon: '⏳' },
      { id: 'thunder', name: '雷·雷池', type: '攻击型', desc: '召唤雷电之力守护自身。兼具攻击和防御能力，速度极快。', icon: '⚡' },
      { id: 'soul', name: '圣言·审判', type: '精神型', desc: '强大的精神攻击言灵，直接作用于目标的灵魂。无视物理防御，但对精神力强大的敌人效果减弱。', icon: '👁️' },
      { id: 'shield', name: '盾·无尘之地', type: '防御型', desc: '在周身形成绝对防御领域。在领域内，一切攻击都会被阻挡，是混血种最强的防御言灵。', icon: '🔮' }
    ],

    // ========================================
    // 世界观地点
    // ========================================
    locations: {
      start: { id: 'start', name: '仕兰中学', icon: '🏫', desc: '你生活了十八年的城市，一所普通的中学。但今天，一切都将改变。' },
      cc1000: { id: 'cc1000', name: 'CC1000次列车', icon: '🚂', desc: '通往卡塞尔学院的 magical 列车，从芝加哥出发，驶向一般人无法找到的地方。' },
      campus: { id: 'campus', name: '卡塞尔学院', icon: '🏰', desc: '隐藏在芝加哥远郊山谷中的古老学院，秘党培养屠龙者的总部。哥特式建筑群中隐藏着无数秘密。' },
      hall: { id: 'hall', name: '学院礼堂', icon: '🏛️', desc: '卡塞尔学院的主礼堂，用于新生典礼和重要仪式。穹顶上绘有龙族战争史的壁画。' },
      library: { id: 'library', name: '图书馆·冰窖', icon: '📚', desc: '卡塞尔学院的图书馆地下一层，被称为"冰窖"。这里收藏着关于龙族历史的最珍贵资料。' },
      training: { id: 'training', name: '训练场', icon: '⚔️', desc: '卡塞尔学院的实战训练场，模拟各种战斗环境。混血种们在这里磨练屠龙技艺。' },
      cafeteria: { id: 'cafeteria', name: '学院食堂', icon: '🍽️', desc: '卡塞尔学院的食堂，也是学生们社交的主要场所。这里的菜品种类丰富得不可思议。' },
      dormitory: { id: 'dormitory', name: '学生宿舍', icon: '🛏️', desc: '卡塞尔学院的学生宿舍，古老建筑内部却有着现代化的设施。' },
      chicago: { id: 'chicago', name: '芝加哥', icon: '🌆', desc: '卡塞尔学院附近的大城市。混血种们偶尔会来这里执行任务或放松。' },
      three_gorges: { id: 'three_gorges', name: '三峡水库', icon: '🌊', desc: '中国长江上的巨型水利工程。水下沉睡着龙族的秘密和危险。' },
      beijing: { id: 'beijing', name: '北京', icon: '🏯', desc: '中国的首都。在这座古老的城市地下，隐藏着龙族亲王"大地与山之王"的踪迹。' },
      tokyo: { id: 'tokyo', name: '东京', icon: '🗼', desc: '日本的首都。卡塞尔学院日本分部在这里经营着庞大的地下网络。源氏家族掌控着这座城市的黑夜。' },
      classroom: { id: 'classroom', name: '教室', icon: '📖', desc: '卡塞尔学院的教室。这里的课程包括龙族历史、炼金术和格斗术。' },
      roof: { id: 'roof', name: '学院天台', icon: '🌙', desc: '卡塞尔学院最高的地方，可以俯瞰整个山谷。是学生们谈心或独处的地方。' }
    },

    // ========================================
    // 主要NPC
    // ========================================
    npcs: {
      luminfei: { id: 'luminfei', name: '路明非', title: '新生', desc: '和你同届进入卡塞尔的新生，看起来有点衰，但似乎隐藏着不为人知的力量。', color: '#88cc88' },
      chuzihang: { id: 'chuzihang', name: '楚子航', title: '狮心会会长', desc: '卡塞尔学院狮心会会长，沉默寡言的剑术天才。背后似乎有着沉重的过去。', color: '#6688ff' },
      caesar: { id: 'caesar', name: '凯撒·加图索', title: '学生会主席', desc: '学生会主席，来自意大利加图索家族的贵公子。自信、高傲、实力强大。', color: '#ffcc44' },
      nono: { id: 'nono', name: '诺诺', title: '学姐', desc: '凯撒的女朋友，性格洒脱不羁。对新生非常照顾，似乎对你有特别的兴趣。', color: '#ff6688' },
      angers: { id: 'angers', name: '昂热校长', title: '卡塞尔学院校长', desc: '卡塞尔学院校长，秘党核心人物。看起来像个优雅的老绅士，实际上是最强的屠龙者之一。', color: '#cccccc' },
      schneider: { id: 'schneider', name: '施耐德教授', title: '执行部部长', desc: '卡塞尔学院执行部部长，负责安排屠龙任务。脸上戴着呼吸面罩，声音沙哑。', color: '#aaaaaa' },
      gudelian: { id: 'gudelian', name: '古德里安教授', title: '招生办主任', desc: '卡塞尔学院招生办主任，性格热情到有点神经质。亲自去中国面试路明非，对龙族历史如数家珍。', color: '#88aaff' },
      fengel: { id: 'fengel', name: '芬格尔', title: '学长/室友', desc: '路明非的室友，看上去是个废柴学长，成天在宿舍打游戏。但没人知道他曾经是卡塞尔最强的A级学生。', color: '#aacc88' },
      lumingze: { id: 'lumingze', name: '路鸣泽', title: '???', desc: '神秘的小男孩，自称是路明非的弟弟。总是在最关键的时刻出现，用交易换取路明非的力量。他也许是路明非体内龙族人格的具象。', color: '#ff4444' },
      laotang: { id: 'laotang', name: '老唐', title: '网友', desc: '路明非在星际争霸里认识的朋友，操作犀利，性格豪爽。没人知道他的真实身份——龙王诺顿的人类化身。', color: '#ff8844' },
      fengli: { id: 'fengli', name: '芬里厄', title: '???', desc: '隐藏在学院深处的神秘存在。似乎与龙族有着密切的关系。', color: '#ff4444' },
      xiami: { id: 'xiami', name: '夏弥', title: '新生', desc: '一个神秘的女孩，似乎对龙族有着超乎寻常的了解。', color: '#ff88aa' },
      yuanzhi: { id: 'yuanzhi', name: '源稚生', title: '日本分部分部长', desc: '卡塞尔学院日本分部的执行局局长，源氏家族的大家长。背负着守护日本的重任。', color: '#cc4444' },
      huiyiyi: { id: 'huiyiyi', name: '上杉绘梨衣', title: '源氏家族的公主', desc: '源氏家族的小女儿，拥有极为罕见的强大言灵。她的命运与龙族紧密相连。', color: '#ff88cc' }
    }
  },

  // ========================================
  // 剧情节点树 —— 龙族I~III主线
  // ========================================
  scenes: {
    // ========== 第一章：火之晨曦 ==========
    start: {
      id: 'start',
      chapter: 1,
      location: 'start',
      narrative: `{name}同学：

我们很荣幸地通知您，您已被芝加哥大学附属私立学院——卡塞尔学院（Cassell College）录取。

随信附上您的录取通知书及CC1000次列车的特别车票。请您于本月15日抵达芝加哥联合车站，乘坐CC1000次列车前往学院报到。

请注意：本录取通知书具有法律效力，请勿遗失。

——卡塞尔学院招生办`

      + `\n\n你放下手中的信纸，心跳有些加速。这封信来得太突然了——你甚至不记得自己申请过这所学院。\n\n窗外是仕兰中学午后的阳光，操场上同学们在打篮球。但你知道，从收到这封信开始，你的生活就不一样了。\n\n信的末尾附着一串烫金的地址：芝加哥远郊·卡塞尔学院。以及一行小字——"你身体里流着不一样的血。"\n\n你把这封信翻来覆去看了三遍。去，还是不去？`,

      choices: [
        {
          text: '决定去卡塞尔学院看看',
          hint: '也许这真的是你人生的转折点',
          next: 'cc1000_departure',
          effects: { flag: 'chose_to_go' }
        },
        {
          text: '先和家里人商量一下',
          hint: '这么大的事不能一个人决定',
          next: 'family_talk',
          effects: { flag: 'talked_to_family' }
        },
        {
          text: '在网上搜索卡塞尔学院的信息',
          hint: '一所在网上几乎查不到任何信息的学校',
          next: 'search_info',
          effects: { flag: 'searched_online' }
        }
      ]
    },

    // 分支：和家人商量
    family_talk: {
      id: 'family_talk',
      chapter: 1,
      location: 'start',
      narrative: `你的父母看到这封信后，表情有些复杂。\n\n"卡塞尔学院……"你父亲念着这个名字，像是想起了什么，"我听说过这所学校。你叔叔以前好像也收到过他们的邀请。"\n\n你叔叔？那个你从未谋面、据说在国外做"特殊工作"的叔叔？\n\n"去吧。"你父亲拍了拍你的肩膀，"有些路，是该你自己走的。"\n\n第二天，你收拾好行李，踏上了前往芝加哥的飞机。`,

      effects: { flag: 'family_approves' },
      choices: [
        { text: '前往芝加哥联合车站', next: 'cc1000_departure' }
      ]
    },

    // 分支：网上搜索
    search_info: {
      id: 'search_info',
      chapter: 1,
      location: 'start',
      narrative: `你在网上搜索"卡塞尔学院"，却发现——几乎没有任何信息。\n\n这所学院的官网极其简陋，只有几行介绍文字和一个招生邮箱。没有校园照片，没有学生论坛，没有社交媒体的任何痕迹。\n\n你搜遍了所有留学论坛，只有一条三年前的帖子提到过这个名字："有人听说过卡塞尔学院吗？我收到了他们的录取通知，但网上什么都查不到。"\n\n下面唯一的回复写着："去吧，你不会后悔的。"\n\n这神秘感反而激起了你的好奇心。你合上电脑，开始收拾行李。`,

      choices: [
        { text: '带着好奇心前往芝加哥', next: 'cc1000_departure' }
      ]
    },

    // CC1000次列车
    cc1000_departure: {
      id: 'cc1000_departure',
      chapter: 1,
      location: 'cc1000',
      narrative: `芝加哥联合车站，下午四点。\n\n你在月台上找到了那列CC1000次列车——一列看起来像是上个世纪的老式蒸汽火车，墨绿色的车身在现代化的车站里显得格格不入。\n\n检票员是个戴着圆框眼镜的老头，他看了看你的车票，微微一笑："欢迎上车，{name}同学。"\n\n车厢内部的装修出乎意料地豪华——深红色的天鹅绒座椅、黄铜的灯饰、橡木的壁板。车厢里零星坐着几个和你差不多大的年轻人。\n\n你注意到角落里坐着一个穿白色校服的男生，一头刺眼的金发，正在喝红茶。在他的对面，一个黑发少年靠在窗边，闭目养神，膝盖上横放着一个黑色的琴盒。\n\n列车缓缓开动了，驶入了一条隧道。当它重新驶出时，窗外的景色已经变成了一片陌生的山谷。`,

      choices: [
        {
          text: '主动和金发男生打招呼',
          hint: '看起来是个值得认识的人',
          next: 'meet_caesar',
          effects: { flag: 'met_caesar_first', affection: { '凯撒·加图索': 5 } }
        },
        {
          text: '和那个带琴盒的黑发少年搭话',
          hint: '他身上的气息让你感到熟悉',
          next: 'meet_chuzihang',
          effects: { flag: 'met_chuzihang_first', affection: { '楚子航': 5 } }
        },
        {
          text: '找个空位坐下，观察周围的人',
          hint: '先摸清楚状况再说',
          next: 'cc1000_observe',
          effects: { flag: 'observed_first' }
        }
      ]
    },

    meet_caesar: {
      id: 'meet_caesar',
      chapter: 1,
      location: 'cc1000',
      narrative: `你走向那个金发男生。他抬起头，用一双冰蓝色的眼睛打量着你。\n\n"新生？"他的中文出奇地标准，"我是凯撒·加图索，学生会主席。你呢？"\n\n你报上名字。凯撒点点头，示意你坐下。\n\n"卡塞尔不是什么普通的大学，"他抿了一口红茶，"你很快就会明白。不过别担心，有我在，没人敢欺负新生。"\n\n他笑了笑，那笑容里带着几分自信和几分玩世不恭。\n\n对面的黑发少年这时睁开了眼睛，淡淡地看了一眼凯撒，又闭上了。\n\n"那是楚子航，"凯撒压低声音，"狮心会会长。别招惹他，他是个怪物。"`,

      effects: { flag: 'met_caesar', affection: { '凯撒·加图索': 10 } },
      choices: [
        { text: '询问卡塞尔学院到底是什么地方', next: 'cc1000_question', effects: { flag: 'asked_about_school' } },
        { text: '聊一聊凯撒在学院的生活', next: 'cc1000_chat', effects: { flag: 'chatted_caesar', affection: { '凯撒·加图索': 5 } } },
        { text: '看向窗外的山谷，陷入沉思', next: 'cc1000_arrival' }
      ]
    },

    meet_chuzihang: {
      id: 'meet_chuzihang',
      chapter: 1,
      location: 'cc1000',
      narrative: `你在黑发少年对面坐下。他睁开眼睛，金色的瞳孔一闪而过——你几乎以为自己看错了。\n\n"有事？"他的声音低沉而冷淡。\n\n"呃……第一次来，有点紧张。"你说。\n\n他沉默了几秒，然后说："到了学院，离那个金发的远一点。"他朝凯撒的方向扬了扬下巴，"他是麻烦精。"\n\n他顿了顿，又补充了一句："不过如果你遇到真正的麻烦，可以来找我。狮心会，楚子航。"\n\n说完他重新闭上眼睛，不再说话。他膝盖上的琴盒看起来价值不菲，但你注意到琴盒的边角有磕碰的痕迹——那不是乐器该有的伤痕。`,

      effects: { flag: 'met_chuzihang', affection: { '楚子航': 10 } },
      choices: [
        { text: '追问琴盒里装的是什么', next: 'cc1000_qinhe', effects: { flag: 'asked_about_case' } },
        { text: '安静地坐着，等待到达', next: 'cc1000_arrival' },
        { text: '还是去和那个金发男生聊聊', next: 'meet_caesar', effects: { flag: 'switched_to_caesar' } }
      ]
    },

    cc1000_observe: {
      id: 'cc1000_observe',
      chapter: 1,
      location: 'cc1000',
      narrative: `你找了个靠窗的位置坐下，观察着车厢里的其他人。\n\n除了金发的凯撒和黑发的楚子航，还有几个看起来也是新生的学生——有的在兴奋地交谈，有的紧张地翻看入学手册。\n\n一个红发女生注意到了你的目光，朝你笑了笑。她的笑容很明媚，让你稍微放松了一些。\n\n列车穿行在绿色的山谷中，窗外的风景美得像一幅油画。但你总觉得，这片平静的背后隐藏着什么。\n\n你的手机突然震动了一下——一条新短信："欢迎来到卡塞尔，新生。你身体里的血，在呼唤你。"\n\n发件人未知。`,

      effects: { flag: 'observed', affection: { '诺诺': 5 } },
      choices: [
        { text: '去找那个红发女生搭话', next: 'meet_nono', effects: { flag: 'met_nono' } },
        { text: '去找凯撒聊聊', next: 'meet_caesar' },
        { text: '去找楚子航', next: 'meet_chuzihang' }
      ]
    },

    meet_nono: {
      id: 'meet_nono',
      chapter: 1,
      location: 'cc1000',
      narrative: `你走向那个红发女生。她抬起头，一双暗红色的眼睛笑盈盈地看着你。\n\n"新生？我叫诺诺。你呢？"她的声音很好听。\n\n"你不用太紧张，"她说，"卡塞尔虽然不太正常，但还挺好玩的。至少比普通大学有意思多了。"\n\n她指了指窗外："看到那座山了吗？学院就在山后面。整个山谷都是卡塞尔的地盘。"\n\n你顺着她指的方向看去，隐约看到山谷深处有一座灰色的城堡轮廓。\n\n"对了，"诺诺凑近你，压低声音，"到了之后，别喝校长给你的茶。他老人家泡的茶……一般人扛不住。"\n\n她狡黠地眨了眨眼睛。`,

      effects: { flag: 'met_nono', affection: { '诺诺': 10 } },
      choices: [
        { text: '问诺诺学院里还有什么需要注意的', next: 'cc1000_nono_advice', effects: { flag: 'asked_nono_advice', affection: { '诺诺': 5 } } },
        { text: '看向窗外越来越近的城堡', next: 'cc1000_arrival' }
      ]
    },

    cc1000_question: {
      id: 'cc1000_question',
      chapter: 1,
      location: 'cc1000',
      narrative: `"卡塞尔到底是什么地方？"你问凯撒。\n\n凯撒放下茶杯，表情变得认真了一些。\n\n"一所培养猎人的学校。"他说，"猎杀那些……不该存在于这个世界上的东西。"\n\n"比如？"\n\n"龙。"他说出这个字的时候，车厢里的空气似乎凝固了一秒。"你相信龙存在吗？不是那种长翅膀的大蜥蜴，而是——曾经统治过这个世界的古老生物。"\n\n你没说话。\n\n"你很快就会亲眼看到的。"凯撒重新端起茶杯，"在那之前，好好享受你的普通人生吧。因为从明天开始，你的人生就不再普通了。"`,

      choices: [
        { text: '看向窗外，消化刚才的信息', next: 'cc1000_arrival', effects: { flag: 'know_about_dragons' } },
        { text: '继续追问关于龙族的细节', next: 'cc1000_more_dragon', effects: { flag: 'asked_more_about_dragons' } }
      ]
    },

    cc1000_more_dragon: {
      id: 'cc1000_more_dragon',
      chapter: 1,
      location: 'cc1000',
      narrative: `"龙族……真的存在？"你追问。\n\n凯撒意味深长地笑了笑："人类历史只有五千年，但龙族统治了这个世界几万年。它们沉睡在地底、在深海、在冰川之下……等待着苏醒的时刻。"\n\n"而我们混血种，"他指了指自己，又指了指你，"就是站在人类和龙族之间的那道防线。"\n\n"混血种？"\n\n"你身体里流着龙的血，{name}。这就是为什么卡塞尔选择了你。"\n\n车厢里安静了几秒。远处传来汽笛声，列车正在减速。\n\n"到了。"凯撒站起来，整理了一下衣领，"欢迎来到卡塞尔。"`,

      effects: { flag: 'know_about_hybrids' },
      choices: [
        { text: '跟着凯撒下车', next: 'campus_arrival', effects: { affection: { '凯撒·加图索': 5 } } }
      ]
    },

    cc1000_arrival: {
      id: 'cc1000_arrival',
      chapter: 1,
      location: 'cc1000',
      narrative: `列车缓缓减速。窗外的山谷中，一座灰色的哥特式城堡出现在眼前——那是一座巨大的建筑群，尖塔、拱门、彩色玻璃窗，在夕阳的照耀下泛着金色的光。\n\n那就是卡塞尔学院。\n\n列车停稳了。车厢里的学生们开始收拾行李。凯撒站起身，拉了拉衣领。楚子航提起琴盒，一言不发地走向车门。诺诺朝你挥了挥手。\n\n你深吸一口气，拎起行李，踏上了月台——\n\n山间的风吹在脸上，带着青草和泥土的气息。远处传来悠扬的钟声。\n\n一个新的世界，在你面前展开了。`,

      effects: { flag: 'arrived_cassell' },
      choices: [
        { text: '跟随人流前往学院主楼', next: 'campus_arrival' },
        { text: '先在校园里四处转转', next: 'campus_explore', effects: { flag: 'explored_first' } }
      ]
    },

    cc1000_chat: {
      id: 'cc1000_chat',
      chapter: 1,
      location: 'cc1000',
      narrative: `你和凯撒聊了一路。他告诉你卡塞尔学院的各种趣事——校长昂热喜欢在半夜弹钢琴，图书馆地下有个叫"冰窖"的地方藏着龙族文物，食堂的牛排是全芝加哥最好的……\n\n"对了，"凯撒忽然说，"入学第一天有个小测试。别紧张，不是考试——是测试你的血统纯度。"\n\n"血统纯度？"\n\n"嗯，"凯撒的表情变得微妙，"就是看看你体内的龙血有多少。太高了很危险——你会被龙血控制。太低了又没用。只有恰到好处，才是合格的屠龙者。"\n\n你正要追问，列车鸣响了汽笛。\n\n"到了。"凯撒站起身，"欢迎来到卡塞尔。"`,

      effects: { flag: 'know_about_test', affection: { '凯撒·加图索': 10 } },
      choices: [
        { text: '跟随凯撒下车', next: 'campus_arrival', effects: { affection: { '凯撒·加图索': 5 } } }
      ]
    },

    cc1000_qinhe: {
      id: 'cc1000_qinhe',
      chapter: 1,
      location: 'cc1000',
      narrative: `"你这个琴盒……看起来不像是装乐器的。"你试探着问。\n\n楚子航睁开眼睛，那双金色的瞳孔再次一闪而过。\n\n"你说得对。"他的声音平静得像一潭死水，"里面是一把刀。"\n\n他打开琴盒的一角，你看到一抹冷冽的寒光——那是一柄日本刀，刀身上刻着古老的花纹。\n\n"村雨，"楚子航说，"我父亲留给我的。"\n\n他的眼中闪过一丝不易察觉的悲伤，然后迅速合上了琴盒。\n\n"到了。"他说，站起身来。`,

      effects: { flag: 'saw_村雨', affection: { '楚子航': 5 } },
      choices: [
        { text: '和楚子航一起下车', next: 'campus_arrival', effects: { affection: { '楚子航': 5 } } }
      ]
    },

    cc1000_nono_advice: {
      id: 'cc1000_nono_advice',
      chapter: 1,
      location: 'cc1000',
      narrative: `"学院里还有什么需要注意的？"你问。\n\n诺诺想了想："第一，别惹狮心会的人。第二，别在图书馆里大声说话——管理员是个脾气暴躁的老太太。第三……"她神秘地压低声音，"如果晚上听到走廊里有奇怪的声音，别去管。那只是学院在'呼吸'。"\n\n"呼吸？"\n\n"卡塞尔学院本身就是一座巨大的炼金矩阵，"诺诺说，"它在吸收地脉的能量，用来压制地下的某个东西。"\n\n"什么东西？"\n\n诺诺还没来得及回答，列车汽笛声响起。\n\n"到了。"她站起来，拍了拍你的肩膀，"走吧，冒险开始了。"`,

      effects: { flag: 'nono_warnings', affection: { '诺诺': 5 } },
      choices: [
        { text: '和诺诺一起下车', next: 'campus_arrival', effects: { affection: { '诺诺': 5 } } }
      ]
    },

    campus_explore: {
      id: 'campus_explore',
      chapter: 1,
      location: 'campus',
      narrative: `你没有随人流进去，而是绕着学院的外围走了一圈。\n\n卡塞尔学院比想象中更大。主建筑是一座哥特式城堡，两侧延伸出翼楼，后面是大片的绿地和树林。你注意到主楼后面有一座独立的小教堂，屋顶上有奇怪的金属尖刺——看起来不像是宗教装饰。\n\n在树林边，你发现了一座石碑。上面用拉丁文刻着一行字：\n\n"Illegitimi non carborundum."\n\n（不要被杂碎击败。）\n\n你正琢磨这句话的意思，身后传来一个声音：\n\n"那是卡塞尔的校训。"\n\n你转过身——一个穿着黑色西装、戴着圆框眼镜的老人站在你身后，手里拄着一根乌木手杖。他看起来至少七十岁了，但腰板挺得笔直，眼睛炯炯有神。\n\n"我是昂热，这所学院的校长。"他微笑着说，"欢迎来到卡塞尔。"`,

      effects: { flag: 'met_angers_early', affection: { '昂热校长': 10 } },
      choices: [
        { text: '和校长聊聊学院的历史', next: 'angers_talk', effects: { flag: 'talked_angers', affection: { '昂热校长': 5 } } },
        { text: '跟着校长进入学院', next: 'campus_arrival', effects: { flag: 'enter_with_angers' } }
      ]
    },

    angers_talk: {
      id: 'angers_talk',
      chapter: 1,
      location: 'campus',
      narrative: `"校长先生，这座学院到底——"你开口。\n\n"——到底是做什么的？"昂热接过话头，微笑着用手杖点了点地面，"卡塞尔学院成立于1900年，由秘党创立。我们的使命只有一个：屠龙。"\n\n"龙真的存在？"\n\n昂热的表情变得深邃："不仅存在，而且它们正在苏醒。一百二十年前，秘党的创始人们就预见到了这一天。所以他们建立了卡塞尔，一代一代地培养屠龙者，为的就是在龙族回归的时候——人类不会毫无还手之力。"\n\n他看着你，目光变得锐利："而你，{name}，就是被选中的人。你身体里流着龙的血——但你选择站在人类这边。"\n\n"走吧，"他转身走向学院大门，"还有很多事等着你。"`,

      effects: { flag: 'angers_explained', affection: { '昂热校长': 10 } },
      choices: [
        { text: '跟着校长进入学院', next: 'campus_arrival' }
      ]
    },

    // 到达学院
    campus_arrival: {
      id: 'campus_arrival',
      chapter: 1,
      location: 'campus',
      narrative: `你走进卡塞尔学院的大门。\n\n门厅比想象中更加宏伟——高达二十米的穹顶上绘着巨大的壁画，描绘着人与龙之间的战争。穿着各色校服的学生们在走廊里穿梭，有的在讨论课程，有的在争论什么。\n\n一个戴眼镜的男生匆匆走过，怀里抱着一本比你头还厚的书，书名是《龙族谱系学导论》。\n\n"新生？"一个声音从身后传来。\n\n你转身——一个穿着黑色风衣、戴着呼吸面罩的男人站在你面前。他的声音沙哑而低沉，面罩后面是一双锐利的眼睛。\n\n"我是施耐德，执行部部长。"他说，"跟我来，需要进行入学测试。"\n\n他没有等你回答，转身就走。他的步伐很快，风衣的下摆翻飞，露出腰间别着的——那是一把枪？`,

      choices: [
        { text: '跟上施耐德教授', next: 'blood_test', effects: { flag: 'followed_schneider' } },
        { text: '先找个新生问问情况', next: 'find_luminfei', effects: { flag: 'look_for_other_newbie' } }
      ]
    },

    find_luminfei: {
      id: 'find_luminfei',
      chapter: 1,
      location: 'campus',
      narrative: `你在走廊里拦住了一个看起来同样迷茫的男生——他戴着一副黑框眼镜，头发有点乱，看起来跟你差不多大。\n\n"你好……你也是新生？"你问。\n\n"啊，是是是，"他有点慌张地点头，"我叫路明非，来自……呃……不重要。你也是刚来的？"\n\n"是啊，你知道入学测试在哪吗？"\n\n路明非挠了挠头："好像……听说是在礼堂那边？我刚看到一个穿风衣的怪人往那边走了。"\n\n"那是施耐德教授。"你说。\n\n"哦……"路明非缩了缩脖子，"看起来不太好惹。要不……咱俩一起去？"\n\n他冲你笑了笑，那笑容带着点讨好，但也让人放心。`,

      effects: { flag: 'met_luminfei', affection: { '路明非': 10 } },
      choices: [
        { text: '和路明非一起去礼堂', next: 'blood_test', effects: { flag: 'go_with_mingfei', affection: { '路明非': 5 } } }
      ]
    },

    // ========== 血统测试 ==========
    blood_test: {
      id: 'blood_test',
      chapter: 1,
      location: 'hall',
      narrative: `礼堂里，所有新生排成一排。\n\n施耐德教授站在前方，手里拿着一个金属盒子。\n\n"你们来到这里，不是偶然，"他的声音在空旷的礼堂里回荡，"卡塞尔学院从全世界寻找拥有龙族血统的人。你们每个人的身体里，都流着龙的血。"\n\n新生们窃窃私语。\n\n"但龙血既是恩赐，也是诅咒。血统纯度太低，无法成为合格的屠龙者。血统纯度太高——你可能会被龙血反噬，变成……龙。"\n\n施耐德打开金属盒，里面是一排注射器，针头泛着诡异的蓝光。\n\n"这是测试药剂。它会暂时激发你体内的龙血，让我们能够检测你的血统纯度。注射过程可能有些不适。"\n\n他叫出第一个名字。\n\n轮到你了。施耐德看着你，手中的注射器在灯光下闪烁。\n\n"伸出手。"他说。`,

      choices: [
        {
          text: '伸出手，接受测试',
          hint: '这是了解自己的唯一途径',
          next: 'test_result',
          effects: { flag: 'accepted_test' }
        },
        {
          text: '"等等——药剂注射后会发生什么？"',
          hint: '先问清楚',
          next: 'test_question',
          effects: { flag: 'asked_about_test' }
        }
      ]
    },

    test_question: {
      id: 'test_question',
      chapter: 1,
      location: 'hall',
      narrative: `"注射后会怎么样？"你问。\n\n施耐德面无表情地看着你："龙血会被激活。你的瞳孔可能会变成金色。你可能会听到一些……声音。那是龙族血脉中的记忆在苏醒。"\n\n"有人会失控吗？"\n\n"很少。"施耐德说，"但确实发生过。"\n\n他顿了顿："但如果你连了解自己的勇气都没有，那你就不配站在卡塞尔的旗下。你想清楚了吗？"\n\n礼堂里安静极了。所有新生都在看着你。`,

      choices: [
        { text: '伸出手："来吧。"', next: 'test_result', effects: { flag: 'accepted_test_after_question' } },
        { text: '后退一步："我需要时间考虑。"', next: 'test_refuse', effects: { flag: 'refused_test' } }
      ]
    },

    test_refuse: {
      id: 'test_refuse',
      chapter: 1,
      location: 'hall',
      narrative: `你后退了一步。\n\n施耐德看着你，眼神中并无责怪。"理解。恐惧是正常的。"\n\n他转向下一个学生。\n\n但你心里明白——这一步后退，可能意味着你还没有准备好面对真正的自己。\n\n测试结束后，施耐德找到你："在你的血统稳定之前，你可以作为旁听生留在卡塞尔。但记住——龙血不会因为你逃避就消失。它在你体内流淌，总有一天，你必须面对它。"`,

      effects: { flag: 'refused_test', location: 'hall' },
      choices: [
        { text: '在学院里先适应一段时间', next: 'campus_life_intro', effects: { flag: 'audit_student' } },
        { text: '改变主意，去找施耐德要求重新测试', next: 'test_result', effects: { flag: 'changed_mind_test' } }
      ]
    },

    // ========== 测试结果 ==========
    test_result: {
      id: 'test_result',
      chapter: 1,
      location: 'hall',
      narrative: `针尖刺入皮肤。冰凉的液体注入血管。\n\n一开始什么感觉都没有。然后——\n\n你的心脏猛地一跳。血液像是变成了岩浆，在血管里奔涌。你的视野变成了一片金色——你看到天花板上的壁画活了，龙在火焰中翱翔，古代的英雄们在龙背上战斗。\n\n你听到了一个声音——低沉、古老、充满了力量——在你的脑海里回荡：\n\n"……你终于来了。"\n\n然后一切归于平静。\n\n你眨了眨眼睛，视野恢复了正常。施耐德正看着手中的仪器，表情难得地出现了一丝波动。\n\n"有意思。"他说。\n\n他没有告诉你具体数值，但你注意到周围的学生看你的眼神变得不一样了。路明非投来一个又惊讶又佩服的表情。凯撒在角落里微微挑眉。`,

      effects: { flag: 'test_done', location: 'hall' },
      choices: [
        {
          text: '追问施耐德教授我的血统评级',
          hint: '你必须知道真相',
          next: 'ask_rating',
          effects: { flag: 'asked_rating' }
        },
        {
          text: '先去找路明非聊聊',
          hint: '他也是新生，应该能理解你的感受',
          next: 'talk_to_mingfei',
          effects: { flag: 'talk_mingfei_after_test', affection: { '路明非': 5 } }
        },
        {
          text: '去找诺诺，她看起来比较好说话',
          hint: '也许她能告诉你学院的真实情况',
          next: 'talk_to_nono_after',
          effects: { flag: 'talk_nono_after_test', affection: { '诺诺': 5 } }
        }
      ]
    },

    ask_rating: {
      id: 'ask_rating',
      chapter: 1,
      location: 'hall',
      narrative: `你追上施耐德教授："我的血统评级是多少？"\n\n施耐德停下脚步，沉默了几秒。\n\n"S级。"他说。\n\n周围安静得可怕。\n\n"卡塞尔学院建校一百二十年来，只出过三个S级评级的学生。"施耐德看着你，"你知道这意味着什么吗？"\n\n你不知道。但你从他的眼神中看到了一丝——担忧。\n\n"S级意味着你的龙血纯度极高，"施耐德说，"高到……如果有一天你选择站在龙族那边，你会成为一个极其危险的敌人。"\n\n他转身离开，留下一句话：\n\n"别让我们失望。"`,

      effects: { flag: 's_rating', location: 'hall' },
      choices: [
        { text: '去找路明非，他看起来需要朋友', next: 'talk_to_mingfei', effects: { affection: { '路明非': 5 } } },
        { text: '去图书馆查资料，了解S级血统的含义', next: 'library_first', effects: { flag: 'go_library_for_info' } },
        { text: '去找凯撒，他应该知道更多', next: 'talk_to_caesar_after', effects: { affection: { '凯撒·加图索': 5 } } }
      ]
    },

    talk_to_mingfei: {
      id: 'talk_to_mingfei',
      chapter: 1,
      location: 'campus',
      narrative: `你找到路明非的时候，他正蹲在礼堂外面的台阶上发呆。\n\n"嘿。"你坐到他旁边。\n\n"啊，是你。"他勉强笑了笑，"听说你是S级？厉害啊……"他的语气里听不出嫉妒，只有赞叹。\n\n"你怎么样？"\n\n"我？"路明非自嘲地笑了笑，"A级……但我觉得可能是搞错了。我就是个普通人，真的。打游戏还行，让我屠龙？算了吧。"\n\n他低下头："但来都来了……总不能就这么跑了吧。"\n\n他看着远方的山峦，沉默了一会儿。\n\n"你说，我们真的能……呃……屠龙吗？"他问，"我是说，那可是龙啊，神话里那种。"`,

      effects: { flag: 'comforted_mingfei', affection: { '路明非': 10 } },
      choices: [
        { text: '"能。因为我们已经没有退路了。"', next: 'campus_life_intro', effects: { flag: 'encouraged_mingfei', affection: { '路明非': 5 } } },
        { text: '"我也不知道，但总要试试。"', next: 'campus_life_intro', effects: { flag: 'honest_with_mingfei', affection: { '路明非': 5 } } }
      ]
    },

    talk_to_nono_after: {
      id: 'talk_to_nono_after',
      chapter: 1,
      location: 'cafeteria',
      narrative: `你在食堂找到了诺诺。她正一个人吃着冰淇淋，看到你过来，笑了笑。\n\n"S级？不错嘛。"她竖起大拇指，"我就知道你不一样。"\n\n"你也是S级？"\n\n"我？"诺诺笑了，"B+。够用就行。"\n\n她挖了一勺冰淇淋："S级有好有坏。好处是，你会得到更多的资源和关注。坏处是——更多人盯着你。而且，血统越高，越容易被龙血影响。"\n\n她看着你，表情变得认真：\n\n"在卡塞尔，力量越强，责任越大。别被力量冲昏了头。"`,

      effects: { flag: 'talked_nono', affection: { '诺诺': 10 } },
      choices: [
        { text: '"我会记住的。"', next: 'campus_life_intro' },
        { text: '问诺诺关于执行部的事情', next: 'ask_about_executive', effects: { flag: 'asked_about_exec' } }
      ]
    },

    talk_to_caesar_after: {
      id: 'talk_to_caesar_after',
      chapter: 1,
      location: 'campus',
      narrative: `你在训练场找到了凯撒。他正在练习射击，每一枪都正中靶心。\n\n"S级？"他放下枪，擦了擦汗，"意料之中。我看人的眼光一向很准。"\n\n"S级到底意味着什么？"\n\n凯撒靠在墙边："意味着你可能是这一代混血种里最强的之一。也意味着……你可能会成为所有龙王的目标。"\n\n他顿了顿："你知道为什么卡塞尔要建立执行部吗？因为历史上那些S级血统的混血种，有一半最后都……叛变了。龙血对他们的影响太大了。"\n\n他直视着你的眼睛：\n\n"你会叛变吗？"`,

      effects: { flag: 'talked_caesar', affection: { '凯撒·加图索': 10 } },
      choices: [
        { text: '"绝对不会。我知道自己站在哪一边。"', next: 'campus_life_intro', effects: { flag: 'sworn_to_caesar', affection: { '凯撒·加图索': 5 } } },
        { text: '"我不知道。但我希望不会。"', next: 'campus_life_intro', effects: { flag: 'honest_to_caesar', affection: { '凯撒·加图索': 5 } } }
      ]
    },

    ask_about_executive: {
      id: 'ask_about_executive',
      chapter: 1,
      location: 'cafeteria',
      narrative: `"执行部是做什么的？"你问。\n\n诺诺的表情变得有些微妙："执行部……就是干脏活的。处理龙族事件、回收危险物品、清除叛徒……总之，最危险的任务都是执行部在做。"\n\n"施耐德教授就是执行部的头儿。别看他那样，他是卡塞尔最强的几个人之一。"\n\n"你加入执行部了吗？"\n\n诺诺摇摇头："还没。但……可能迟早的事。加入执行部意味着你随时可能被派去执行危险任务。生还率……"她没有说下去。\n\n她看了看时间："哦，下午有龙族历史课，别忘了去。芬格尔教授的课，他虽然疯疯癫癫的，但讲的东西很有意思。"`,

      effects: { flag: 'know_about_exec', affection: { '诺诺': 5 } },
      choices: [
        { text: '去上龙族历史课', next: 'history_class', effects: { flag: 'went_to_history' } },
        { text: '先去图书馆查资料', next: 'library_first', effects: { flag: 'go_library' } }
      ]
    },

    library_first: {
      id: 'library_first',
      chapter: 1,
      location: 'library',
      narrative: `卡塞尔学院的图书馆比你想象中大了十倍。一排排高耸的书架上，塞满了关于龙族的书籍——有些书脊上印着你认不出的文字。\n\n你找到了一本《混血种血统评级详解》，翻到了关于S级的章节：\n\n"S级：血统纯度在90%以上。此类混血种拥有接近纯血龙族的力量，能够使用高危言灵。注意：S级混血种的精神状态必须定期评估，龙血反噬风险极高。"\n\n你正要继续读下去，忽然感觉到一股视线。\n\n你抬起头——在书架的另一端，站着一个白裙子的女孩。她的头发是银白色的，眼睛是淡金色的，正静静地看着你。\n\n看到你注意到她，她微微歪了歪头，然后……消失了。\n\n你揉了揉眼睛。书架另一端空无一人。`,

      effects: { flag: 'saw_white_girl', location: 'library' },
      choices: [
        { text: '追过去查看', next: 'library_mystery', effects: { flag: 'chased_mystery_girl' } },
        { text: '继续看书，可能是自己眼花了', next: 'campus_life_intro', effects: { flag: 'dismissed_vision' } }
      ]
    },

    library_mystery: {
      id: 'library_mystery',
      chapter: 1,
      location: 'library',
      narrative: `你绕过书架，但走廊里空无一人。只有一扇虚掩的门——门上刻着一个古老的符号：一个圆圈，中间是一条首尾相接的龙。\n\n你推开门，里面是一条向下的楼梯。阴冷的风从下方吹来，带着一股……血腥味。\n\n楼梯口挂着一块牌子：\n\n"冰窖——未经授权禁止入内"\n\n你听到下面传来铁链拖拽的声音，以及一声低沉的、不像是人类的……呼吸。`,

      effects: { flag: 'found_ice_cellar' },
      choices: [
        { text: '下去看看', next: 'ice_cellar', effects: { flag: 'entered_ice_cellar' } },
        { text: '先退回去，以后做好准备再来', next: 'campus_life_intro', effects: { flag: 'retreated_from_cellar' } }
      ]
    },

    ice_cellar: {
      id: 'ice_cellar',
      chapter: 1,
      location: 'library',
      narrative: `你走下楼梯。越往下走，空气越冷。\n\n冰窖的底层是一个巨大的地下空间。四周的墙壁上镶嵌着巨大的铁门，门上刻满了封印符文。铁链从天花板垂下，吊着一些……你不想知道是什么的东西。\n\n在空间的中央，有一个巨大的铁笼。笼子里，一个少年蜷缩在角落里。他抬起头，你看到了他的脸——金色的瞳孔，苍白到几乎透明的皮肤。\n\n他朝你咧嘴一笑，露出一口尖牙：\n\n"你也是来看我的吗？"\n\n他的声音年轻得像个孩子。但他的眼睛——那双金色的眼睛里，有一种不属于人类的、古老的东西。\n\n"我叫芬里厄。"他说，"你是第一个敢走进来的新生。"`,

      effects: { flag: 'met_fengli', affection: { '芬里厄': 10 } },
      choices: [
        { text: '"你……被关在这里？"', next: 'fengli_talk', effects: { flag: 'talked_fengli', affection: { '芬里厄': 5 } } },
        { text: '转身离开——这个东西太危险了', next: 'campus_life_intro', effects: { flag: 'fled_from_fengli' } }
      ]
    },

    fengli_talk: {
      id: 'fengli_talk',
      chapter: 1,
      location: 'library',
      narrative: `"算是吧。"芬里厄坐在地上，双手抱着膝盖，"他们说我是……龙。或者说是龙的容器。"\n\n他歪着头看你："你不怕我？"\n\n"应该怕吗？"\n\n芬里厄笑了："不知道。我自己也不知道我是什么。我只知道……我有时候会做梦，梦到天空是红色的，大地在燃烧。我站在尸山血海上，所有人都怕我。"\n\n他的笑容变得有些悲伤："但我连这个笼子都出不去。"\n\n远处传来脚步声。\n\n"有人来了。"芬里厄说，"你该走了。下次来的时候，给我带点吃的——这里的营养液难喝死了。"\n\n他冲你眨眨眼。`,

      effects: { flag: 'talked_fengli_deep', affection: { '芬里厄': 15 } },
      choices: [
        { text: '匆匆离开，不想被人发现', next: 'campus_life_intro' },
        { text: '坚定地说："我会再来的。"', next: 'campus_life_intro', effects: { flag: 'promised_fengli', affection: { '芬里厄': 10 } } }
      ]
    },

    history_class: {
      id: 'history_class',
      chapter: 1,
      location: 'classroom',
      narrative: `龙族历史课的教室是一个古老的阶梯教室。墙上挂满了各个时期人类与龙族战争的画作。\n\n芬格尔教授是个头发乱糟糟的老人，穿着沾满粉笔灰的西装。他一进门就踩到了讲台边的书堆上，差点摔倒。\n\n"啊，新生！"他扶了扶眼镜，"欢迎来到龙族历史课。今天我们来聊聊——龙王们。"\n\n他在黑板上画了一个圆：\n\n"龙族有四大君王：青铜与火之王、大地与山之王、海洋与水之王、天空与风之王。它们各自统领一支龙族，在远古时代与人类争夺这个世界的统治权。"\n\n"后来呢？"\n\n"后来……人类赢了。"芬格尔的表情变得复杂，"但只是暂时的。龙族在沉睡，但它们终将醒来。而我们的任务——就是在它们醒来之前，找到它们……消灭它们。"`,

      effects: { flag: 'took_history_class' },
      choices: [
        { text: '"龙王真的可以被杀死吗？"', next: 'history_question', effects: { flag: 'asked_about_king' } },
        { text: '下课后去训练场练习', next: 'training_first', effects: { flag: 'go_training' } }
      ]
    },

    history_question: {
      id: 'history_question',
      chapter: 1,
      location: 'classroom',
      narrative: `芬格尔听到你的问题，沉默了几秒。\n\n"好问题。"他说，"龙王到底能不能被杀死？历史上，我们杀死过龙王。但不是用普通的武器——只有特定的武器、特定的言灵、在特定的情况下，才能真正杀死一个龙王。"\n\n"而且，"芬格尔压低声音，"就算你杀死了它们的肉体，龙王的灵魂也不会消散。它们会在某个地方沉睡，等待重生。"\n\n"那怎么才能真正杀死一个龙王？"\n\n芬格尔看着你，那双浑浊的老眼中闪过一丝锐利的光芒：\n\n"这就是卡塞尔一直在寻找的答案。"`,

      effects: { flag: 'asked_king_death' },
      choices: [
        { text: '下课后去训练场', next: 'training_first' },
        { text: '去找昂热校长谈谈', next: 'talk_angers_office', effects: { flag: 'visit_angers' } }
      ]
    },

    training_first: {
      id: 'training_first',
      chapter: 1,
      location: 'training',
      narrative: `训练场上，几个高年级生正在对战。他们的速度快得惊人——你看到一个人影闪过，木刀在空中留下残影，对手已经被击倒在地。\n\n"新生？来试试？"一个穿着训练服的学长朝你招手。\n\n你接过木刀。手感很沉——这是一把真正的日本刀的重量。\n\n"别紧张，"学长说，"让我看看你的底子。"\n\n他摆出进攻姿势。\n\n你的心跳加速。血液中似乎有什么东西在涌动——你感觉视野变得清晰了，对方的动作在你眼中变得……慢了。`,

      effects: { flag: 'first_training' },
      choices: [
        {
          text: '主动出击',
          hint: '先发制人',
          next: 'training_combat',
          effects: { flag: 'aggressive_training' }
        },
        {
          text: '防守，观察对方的动作',
          hint: '知己知彼',
          next: 'training_defense',
          effects: { flag: 'defensive_training' }
        }
      ]
    },

    training_combat: {
      id: 'training_combat',
      chapter: 1,
      location: 'training',
      narrative: `你主动发起进攻。木刀破空而出，速度快得连你自己都惊讶。\n\n学长侧身避开，但你的刀锋擦过他的肩膀——他踉跄了一步，脸上露出惊讶的表情。\n\n"好快！"他说，"你真的是新生？"\n\n你没有回答，因为在你眼中，他的动作还在变慢。你甚至能看到他下一步的意图——他的重心在向右偏移，准备反击。\n\n你提前做出了反应。\n\n五分钟后，学长坐在地上喘着粗气，而你还站着。\n\n"S级……果然名不虚传。"他苦笑着说。`,

      effects: { flag: 'won_training', location: 'training' },
      choices: [
        { text: '继续训练，提升实力', next: 'campus_life_intro', effects: { flag: 'keep_training' } },
        { text: '去找楚子航请教剑术', next: 'find_chuzihang_sword', effects: { flag: 'seek_chu_sword', affection: { '楚子航': 5 } } }
      ]
    },

    training_defense: {
      id: 'training_defense',
      chapter: 1,
      location: 'training',
      narrative: `你摆出防守姿态，仔细观察着对方的每一个动作。\n\n学长试探性地出了一刀——你格挡住了。他又出了第二刀——你又挡住了。\n\n但你发现，你的防守虽然稳健，却始终找不到反击的机会。你的血统给了你超人的感知力，但你的身体还没有跟上。\n\n"不错，"学长说，"基本功扎实。但你太被动了——在真正的战斗中，防守是无法取胜的。"\n\n他收刀："去找楚子航吧，他的剑术是学院里最好的。也许他能教你一些东西。"`,

      effects: { flag: 'defense_training', location: 'training' },
      choices: [
        { text: '去找楚子航请教', next: 'find_chuzihang_sword', effects: { flag: 'seek_chu_sword', affection: { '楚子航': 5 } } },
        { text: '继续自己练习', next: 'campus_life_intro' }
      ]
    },

    find_chuzihang_sword: {
      id: 'find_chuzihang_sword',
      chapter: 1,
      location: 'training',
      narrative: `你在训练场的角落找到了楚子航。他正在独自练习挥刀，一刀又一刀，动作精准得像机器。\n\n"有事？"他停下动作，但没有看你。\n\n"想请教剑术。"\n\n楚子航沉默了几秒，然后说："剑术没有捷径。每天挥刀一万次，十年后你就会了。"\n\n他转过头，金色的瞳孔在昏暗中发着光："但你的问题不是剑术。你的问题是——你还不确定自己要为什么而战。"\n\n他收刀入鞘："等你想明白了，再来找我。"\n\n他提起琴盒，转身离开。`,

      effects: { flag: 'talked_chu_sword', affection: { '楚子航': 5 } },
      choices: [
        { text: '留在训练场，开始挥刀练习', next: 'campus_life_intro', effects: { flag: 'started_sword_practice' } },
        { text: '去天台思考楚子航的话', next: 'roof_think', effects: { flag: 'went_to_roof' } }
      ]
    },

    roof_think: {
      id: 'roof_think',
      chapter: 1,
      location: 'roof',
      narrative: `学院天台的风很大。从这里可以看到整个卡塞尔山谷的全貌——灰色的城堡、绿色的树林、远处的山脉。\n\n你靠在栏杆上，想着楚子航的话。\n\n你要为什么而战？为了人类？为了卡塞尔？还是……为了自己？\n\n身后传来脚步声。\n\n"在想什么？"是诺诺。\n\n她没有等你回答，走到你身边，看着远方的风景：\n\n"我刚来卡塞尔的时候也经常来这里。这里能看到整个学院，但又离它很远。适合想事情。"\n\n她沉默了一会儿，然后说：\n\n"我不知道你正在为什么而困惑。但记住——答案不在过去，在未来。不管你是什么血统、什么身份，决定你成为什么样的人的，是你的选择。"\n\n她拍了拍你的肩膀，转身离开。`,

      effects: { flag: 'thought_on_roof', affection: { '诺诺': 5 } },
      choices: [
        { text: '回到宿舍，准备明天的课程', next: 'campus_life_intro' }
      ]
    },

    // ========== 古德里安教授 & 路鸣泽幻境 ==========
    gudelian_interview: {
      id: 'gudelian_interview',
      chapter: 1,
      location: 'cc1000',
      narrative: `CC1000次列车的包厢里，一个头发乱糟糟、戴着厚眼镜的中年男人正兴奋地翻着一叠文件。\n\n"你就是{name}吧？"他抬起头，笑容灿烂得像见了亲人，"我是古德里安，卡塞尔学院招生办主任！终于等到你了！"\n\n他太热情了，让你有点不适应。但他接下来的话让你的注意力完全集中了起来——\n\n"龙族，不是神话里的生物，而是曾经统治过这个世界的真实存在。"古德里安推了推眼镜，"它们拥有远超人类的智慧和力量，掌握着被称为'言灵'的超自然能力。人类和龙族的战争持续了上万年。"\n\n"而我们混血种——人类和龙族的混血后代——就是站在两个种族之间的存在。卡塞尔学院的使命，就是培养混血种成为屠龙者，在龙族苏醒之前……阻止它们。"\n\n你的脑海中忽然闪过一个画面——\n\n天空是血红色的。一望无际的尸山血海上，一条黑色的巨龙盘旋在天际。它的翅膀遮蔽了太阳，每一次呼吸都带来雷霆。无数人在它面前跪倒……\n\n"喂？喂——你还好吗？"\n\n古德里安的声音把你拉回现实。你发现自己满头冷汗，手心全是汗。\n\n"你……你刚才看到了什么？"古德里安的表情变得严肃起来。`,

      effects: { flag: 'met_gudelian' },
      choices: [
        { text: '"我看到了……一条黑色的龙。"', next: 'lumingze_vision', effects: { flag: 'saw_black_dragon_vision' } },
        { text: '"没什么，可能是太累了。"', next: 'lumingze_vision', effects: { flag: 'hid_vision' } }
      ]
    },

    lumingze_vision: {
      id: 'lumingze_vision',
      chapter: 1,
      location: 'cc1000',
      narrative: `古德里安的表情变得更加凝重："你看到的……可能是你血脉中的记忆。混血种的血统纯度越高，越容易在特定条件下触发血脉记忆。"\n\n"那是……什么龙？"\n\n"黑王。"古德里安压低声音，"尼德霍格——龙族的至高存在，所有龙类的始祖。它在数千年前被封印，但它的死亡……可能只是假象。"\n\n你正想追问，忽然感到一阵晕眩。\n\n世界像水波一样扭曲。\n\n你站在一片虚空之中。面前是一个穿着黑色西装的小男孩——看起来不过十几岁，却有着一双深邃得不像孩子的金色眼睛。\n\n"哥哥。"他微笑着说。\n\n"你……你是谁？"\n\n"我是路鸣泽，"小男孩歪了歪头，"你的弟弟。不过你还记不得我——没关系，我们有的是时间。"\n\n他走近你，在你耳边轻声说：\n\n"记住，哥哥。当你有需要的时候，只要呼唤我的名字——我会帮你……但每帮你一次，你就要付出四分之一的代价。"\n\n周围的虚空碎裂了。你回到了列车上。古德里安正焦急地摇着你的肩膀。\n\n"谢天谢地，你醒了！"他松了一口气，"你刚才感觉怎么样？"\n\n"我……看到了一个男孩。"你喃喃道。\n\n古德里安的脸色变了："一个穿着黑西装的小男孩？"\n\n你点点头。\n\n古德里安没有继续追问，但你看到他握着钢笔的手在微微颤抖。`,

      effects: { flag: 'met_lumingze', affection: { '路鸣泽': 10 } },
      choices: [
        { text: '"他是谁？"——逼问古德里安', next: 'ask_gudelian_about_boy', effects: { flag: 'asked_about_lumingze' } },
        { text: '不再追问，看向窗外飞驰的风景', next: 'campus_arrival' }
      ]
    },

    ask_gudelian_about_boy: {
      id: 'ask_gudelian_about_boy',
      chapter: 1,
      location: 'cc1000',
      narrative: `"那个男孩到底是谁？"你追问。\n\n古德里安沉默了很久，最后叹了口气：\n\n"我不知道该怎么解释。但……在卡塞尔的记载中，有一种现象叫做'双生子'——一些血统纯度极高的混血种，体内会诞生另一个人格。那个人格拥有龙类的记忆和力量。"\n\n"他是……我的另一个人格？"\n\n"也许。"古德里安认真地看着你，"他的存在意味着你的血统可能比我们想象的还要高。但这也意味着……你的精神世界可能比他更强大才行。否则，他会取代你。"\n\n列车开始减速。窗外出现了山谷中的城堡。\n\n"到了。"古德里安站起身，挤出一个笑容，"欢迎来到卡塞尔——你未来六年的家。"`,

      effects: { flag: 'know_about_dual_personality' },
      choices: [
        { text: '站起身，走向车门', next: 'campus_arrival' }
      ]
    },

    // ========== 自由一日 ==========
    freedom_day: {
      id: 'freedom_day',
      chapter: 1,
      location: 'campus',
      narrative: `入学第三天，你被诺诺从宿舍里拽了出来。\n\n"快！今天是自由一日！"她兴奋地说。\n\n"自由一日？"\n\n"卡塞尔学院的传统——这一天学院里没有规则。学生会和狮心会会进行一场模拟战争，用弗里德里克公子赞助的弗丽嘉子弹（打中会让人短暂麻痹）。赢的人可以获得一个特权。"\n\n你被拉到了主楼前的广场上。这里已经变成了战场——\n\n凯撒·加图索站在喷泉上方，手持一把沙漠之鹰（装填着弗丽嘉子弹），金发在阳光下闪闪发光。他的身后是学生会的人马。\n\n对面，楚子航独自站在广场的另一端，手持木刀。他的身后没有一个人。\n\n"狮心会就你一个？"凯撒问。\n\n"够了。"楚子航淡淡地说。\n\n枪声响起。\n\n你看到了你一生中最不可思议的画面——楚子航的身影在子弹雨中穿梭，速度快得留下了残影。他一刀斩向凯撒，凯撒侧身避开，开枪回击……\n\n一颗流弹朝你飞来。\n\n你的瞳孔骤然收缩——那颗子弹在你眼中慢了下来，慢到你甚至能看到它旋转的轨迹。你的身体自动做出了反应。`,

      effects: { flag: 'witnessed_freedom_day' },
      choices: [
        {
          text: '闪开子弹',
          hint: '你的血统在保护你',
          next: 'freedom_day_dodge',
          effects: { flag: 'dodged_bullet' }
        },
        {
          text: '站在原地——你相信他们不敢打中新生',
          hint: '赌一把',
          next: 'freedom_day_stand',
          effects: { flag: 'stood_still' }
        },
        {
          text: '冲进战场帮楚子航',
          hint: '热血上涌',
          next: 'freedom_day_fight',
          effects: { flag: 'joined_freedom_day', affection: { '楚子航': 10 } }
        }
      ]
    },

    freedom_day_dodge: {
      id: 'freedom_day_dodge',
      chapter: 1,
      location: 'campus',
      narrative: `你的身体在意识之前就做出了反应——你以一种完全不符合人体工学的角度侧身，子弹擦着你的耳朵飞过，钉在了身后的墙上。\n\n整个战场安静了一秒。\n\n凯撒吹了声口哨："新生？反应不错。"\n\n楚子航看了你一眼，什么也没说。但你看到他嘴角似乎微微上扬了一点。\n\n诺诺从旁边冒出来，拍了拍你的肩膀："厉害啊！S级果然名不虚传！"\n\n战斗继续。最终楚子航以微弱的优势击败了凯撒——但两个人都被打得够呛。\n\n"这只是开始，楚子航。"凯撒扔掉空枪，擦了擦脸上的灰。\n\n"随时奉陪。"楚子航收刀。\n\n自由一日结束了。但你知道——你已经亲眼见识了卡塞尔学院最强的两个人。`,

      effects: { flag: 'dodged', affection: { '凯撒·加图索': 5, '楚子航': 5 } },
      choices: [
        { text: '回宿舍休息，明天还有课', next: 'meeting_fengel', effects: { flag: 'go_dorm_after_freedom' } }
      ]
    },

    freedom_day_stand: {
      id: 'freedom_day_stand',
      chapter: 1,
      location: 'campus',
      narrative: `你站在原地，一动不动。\n\n子弹在你耳边呼啸而过——但没有一颗打中你。看起来凯撒和楚子航都刻意避开了新生的区域。\n\n战斗结束后，凯撒经过你身边，拍了拍你的肩膀："够胆。新生里敢在自由一日站着不动的，你是第一个。"\n\n楚子航从另一侧走过，低声说了一句："勇气可嘉。但战场上，运气不会一直在你这边。"\n\n他的语气里没有嘲讽，只有……关心？`,

      effects: { flag: 'stood_still_done', affection: { '凯撒·加图索': 5, '楚子航': 5 } },
      choices: [
        { text: '回宿舍', next: 'meeting_fengel' }
      ]
    },

    freedom_day_fight: {
      id: 'freedom_day_fight',
      chapter: 1,
      location: 'campus',
      narrative: `你冲进战场。\n\n你甚至不知道自己为什么要这么做——但你的血液在沸腾，你的心脏在狂跳，你的每一个细胞都在渴望战斗。\n\n你捡起地上的一把训练匕首，朝学生会的一侧冲去。你的速度快得惊人——你闪过两个学生会的成员，一刀"砍"中了其中一个的肩膀。弗丽嘉子弹的麻痹效果让他立刻倒地。\n\n凯撒看了你一眼，眼神中闪过一丝兴致："哦？新生也来掺和？"\n\n他抬手一枪——但目标不是你，而是你身后一个打算偷袭你的学生会成员。\n\n"别打他，"凯撒说，"这是我的猎物。"\n\n你意识到——你已经卷入了卡塞尔学院最顶层的较量。`,

      effects: { flag: 'fought_freedom', affection: { '楚子航': 10 } },
      choices: [
        { text: '战斗结束后回宿舍', next: 'meeting_fengel' }
      ]
    },

    // ========== 芬格尔 & 室友 ==========
    meeting_fengel: {
      id: 'meeting_fengel',
      chapter: 1,
      location: 'dormitory',
      narrative: `卡塞尔学院的学生宿舍比想象中好得多——单人间，但客厅和卫生间是共用的。\n\n你推开门，看到一个胡子拉碴的男生正盘腿坐在客厅沙发上，疯狂地按着手柄。电视屏幕上，一队星际争霸的枪兵正在和虫族大军血战。\n\n"哟！新室友？"他头也不回地说，"我叫芬格尔，卡塞尔学院在读第八年——别问为什么读了八年，问就是挂科太多。"\n\n他暂停了游戏，转过身来——一张看起来挺帅但被邋遢掩盖了的脸。\n\n"你就是那个S级新生？"他上下打量了你一番，"看起来也不怎么样嘛。"\n\n然后他笑了："开玩笑的！S级啊，我当年也是A级呢……呃，好吧，那是很久以前的事了。"\n\n他拍了拍身边的位置："来一局星际？让你见识见识什么叫真正的技术。"`,

      effects: { flag: 'met_fengel', affection: { '芬格尔': 10 } },
      choices: [
        {
          text: '跟他打一局星际争霸',
          hint: '你也是高手',
          next: 'gaming_with_fengel',
          effects: { flag: 'played_starcraft' }
        },
        {
          text: '"不了，我想去图书馆看看。"',
          hint: '先熟悉学院环境',
          next: 'library_explore',
          effects: { flag: 'skip_gaming' }
        }
      ]
    },

    gaming_with_fengel: {
      id: 'gaming_with_fengel',
      chapter: 1,
      location: 'dormitory',
      narrative: `你在芬格尔身边坐下，选好了种族。\n\n三分钟后——你的基地被芬格尔的隐刀砍了个精光。\n\n"哈哈哈哈！"芬格尔笑得前仰后合，"新生就是新生！不过……你的操作有模有样的，以前经常玩？"\n\n"算是。"你说。\n\n"那我们在战网上加个好友呗？"芬格尔说，"我认识一个叫'老唐'的，打得贼好，改天拉你一起三黑。"\n\n他熟练地打开了战网，输入了一个ID：\n\n"老唐"——人类玩家，钻石段位，胜率68%。\n\n"这家伙操作猛如虎，"芬格尔说，"就是太爱吹牛了。每次赢了都说'弟弟们学着点'。"\n\n你记下了这个名字。`,

      effects: { flag: 'gamed_with_fengel', affection: { '芬格尔': 10 } },
      choices: [
        { text: '加入游戏，和老唐一起打一局', next: 'online_laotang', effects: { flag: 'played_with_laotang' } },
        { text: '该去上课了', next: 'exam_3e', effects: { flag: 'skip_online' } }
      ]
    },

    // ========== 老唐/网游 ==========
    online_laotang: {
      id: 'online_laotang',
      chapter: 1,
      location: 'dormitory',
      narrative: `你加入了芬格尔和老唐的队伍。\n\n耳机里传来一个爽朗的声音："哟！新人？芬格尔你小子终于找到第三个队友了？"\n\n"这是我室友，"芬格尔说，"S级新生，牛逼得很。"\n\n"S级？"老唐的语气有些微妙的变化，"卡塞尔的S级可不多见啊……有意思。"\n\n游戏开始了。\n\n你很快发现，老唐的星际水平确实很高。他的运营行云流水，操作精准得不像人类。你们三个人配合默契，连胜了三局。\n\n"不错不错！"老唐在语音里大笑，"比芬格尔那菜逼强多了！以后常来啊！"\n\n"喂！"芬格尔抗议。\n\n你笑了。这是你到卡塞尔以来最轻松的时刻。\n\n但你不知道的是——在世界的另一端，某个昏暗的房间里，一个年轻人正盯着屏幕上你的ID，若有所思。\n\n"S级……卡塞尔……有意思。"他轻声说。\n\n他是老唐。但在他血液深处，某种沉睡的东西正在苏醒。`,

      effects: { flag: 'befriended_laotang', affection: { '老唐': 15, '芬格尔': 5 } },
      choices: [
        { text: '下线，准备明天的3E考试', next: 'exam_3e', effects: { flag: 'prepare_for_3e' } }
      ]
    },

    // ========== 3E考试 ==========
    exam_3e: {
      id: 'exam_3e',
      chapter: 1,
      location: 'classroom',
      narrative: `3E考试——卡塞尔学院新生最重要的考试之一。\n\n教室里安静得可怕。每个新生面前都放着一份试卷——但试卷上没有任何文字，只有一些奇怪的、扭曲的符号。\n\n"这是龙文。"监考的曼施坦因教授说，"你们不需要理解它。只需要看着它。"\n\n"看着它？"\n\n"对。龙文不是用眼睛读的，是用血统读的。"\n\n你低头看着试卷上的符号。那些扭曲的线条在你眼中开始……移动？它们像活过来一样，在你眼前扭动、重组、形成新的形状。\n\n你的脑海中响起一个声音——低沉、古老、如同大地的脉搏。那是龙文在吟唱。\n\n你不由自主地跟着那个声音默念起来。\n\n试卷上的符号发出了淡淡的金光。\n\n曼施坦因教授猛地转过身来看着你。他的表情——像是看到了什么不可思议的东西。`,

      effects: { flag: 'took_3e_exam' },
      choices: [
        { text: '继续吟唱，让龙文的力量引导你', next: 'exam_3e_embrace', effects: { flag: 'embraced_dragon_language' } },
        { text: '强行停止，你不想暴露太多', next: 'exam_3e_hide', effects: { flag: 'hid_dragon_ability' } }
      ]
    },

    exam_3e_embrace: {
      id: 'exam_3e_embrace',
      chapter: 1,
      location: 'classroom',
      narrative: `你没有压制那股力量。\n\n龙文的吟唱声从你喉咙里清晰地流淌出来——那是一种不属于人类的语言，每一个音节都带着古老的力量。试卷上的金光越来越亮，最终形成了一个金色的漩涡。\n\n周围的同学都震惊地看着你。\n\n曼施坦因教授快步走到你面前，按住你的肩膀："停下！"\n\n你停了下来。但那双金色的瞳孔久久没有褪去。\n\n"你的3E考试成绩——"曼施坦因停顿了一下，"超出了量表的最高值。我需要报告校长。"\n\n他离开教室时，你听到他低声说了一句：\n\n"又一个S级……不，也许比S级更高。"`,

      effects: { flag: 'exam_3e_revealed' },
      choices: [
        { text: '去找古德里安教授询问你的成绩', next: 'exam_result_talk', effects: { flag: 'ask_about_3e_score' } },
        { text: '回宿舍，芬格尔应该知道这意味着什么', next: 'exam_with_fengel', effects: { flag: 'go_to_fengel_3e' } }
      ]
    },

    exam_3e_hide: {
      id: 'exam_3e_hide',
      chapter: 1,
      location: 'classroom',
      narrative: `你咬紧牙关，强行压制住了那股冲动。\n\n龙文的金光在你眼中闪烁了一下，然后熄灭了。你保持了沉默。\n\n但曼施坦因教授还是注意到了你——他走到你桌前，看了一眼你的试卷。试卷上的符号没有任何反应——但你的瞳孔，在那一瞬间变成了金色。\n\n"有意思。"他说，没有多说什么。\n\n考试结束后，他叫住了你：\n\n"你压制了自己的血统。为什么？"\n\n"我不想……引人注目。"\n\n曼施坦因看了你一会儿："明智的选择。但在卡塞尔，隐藏实力有时候比展示实力更危险。因为别人不知道你的底牌——就会把你当成未知因素来处理。"\n\n他转身离开："如果我是你，我会在下次机会到来时，让大家看到你的真实力量。"`,

      effects: { flag: 'hid_3e_power' },
      choices: [
        { text: '回宿舍', next: 'exam_with_fengel' }
      ]
    },

    exam_result_talk: {
      id: 'exam_result_talk',
      chapter: 1,
      location: 'campus',
      narrative: `你在办公室里找到了古德里安教授。他正看着你的3E考试成绩发呆。\n\n"这个数据……"他喃喃道，"一般来说，A级学生的龙文共鸣率在60%到80%之间。S级是90%以上。"\n\n"你的共鸣率——"他抬起头看着你，"是98.7%。这意味着你几乎可以和纯血龙族一样直接沟通龙文。"\n\n"这是好事还是坏事？"\n\n古德里安苦笑道："好的一面是，你的言灵潜力可能比任何在世的混血种都强。坏的一面是……你的龙血浓度太高了。你和龙王之间的界限，可能比我们想象的要薄。"\n\n"我会不会被龙血反噬？"\n\n古德里安没有回答。\n\n沉默本身就是答案。`,

      effects: { flag: 'know_3e_score' },
      choices: [
        { text: '离开办公室，消化这个消息', next: 'library_explore', effects: { flag: 'need_to_think' } }
      ]
    },

    exam_with_fengel: {
      id: 'exam_with_fengel',
      chapter: 1,
      location: 'dormitory',
      narrative: `芬格尔正躺在床上吃薯片。\n\n"回来了？3E考得怎么样？"他漫不经心地问。\n\n"我……可能搞砸了。"你说。\n\n芬格尔坐起来，难得地露出了认真的表情："什么叫搞砸了？"\n\n"我吟唱出了龙文。整个考场都看到了。"\n\n芬格尔沉默了几秒，然后吹了声口哨："菜鸟，你不知道吗？能直接吟唱龙文的混血种——在整个卡塞尔历史上，不超过十个人。"\n\n"而那十个人——"他压低声音，"有一个还活着，是我们的校长。有三个已经死了，被龙血反噬而死。还有六个……叛变了。"\n\n他拍了拍你的肩膀："欢迎来到高血统俱乐部。希望你运气够好。"`,

      effects: { flag: 'fengel_warning' },
      choices: [
        { text: '去图书馆查资料，了解高血统混血种的历史', next: 'library_explore', effects: { flag: 'go_to_library' } }
      ]
    },

    // ========== 图书馆·冰窖 ==========
    library_explore: {
      id: 'library_explore',
      chapter: 1,
      location: 'library',
      narrative: `卡塞尔学院的图书馆比你想象中大了十倍。一排排高耸的书架上，塞满了关于龙族的书籍——有些书脊上印着你认不出的文字。\n\n你找到了一本《混血种血统评级详解》，翻到了关于S级的章节：\n\n"S级：血统纯度在90%以上。此类混血种拥有接近纯血龙族的力量，能够使用高危言灵。注意：S级混血种的精神状态必须定期评估，龙血反噬风险极高。"\n\n你正要继续读下去，忽然感觉到一股视线。\n\n你抬起头——在书架的另一端，站着一个白裙子的女孩。她的头发是银白色的，眼睛是淡金色的，正静静地看着你。\n\n看到你注意到她，她微微歪了歪头，然后……凭空消失了。\n\n你揉了揉眼睛。书架另一端空无一人。但你低头时发现地上有一片银白色的鳞片——在灯光下泛着冷冽的光。\n\n那不是人类的鳞片。`,

      effects: { flag: 'library_mystery', location: 'library' },
      choices: [
        { text: '追过去查看', next: 'ice_cellar_door', effects: { flag: 'chased_mystery' } },
        { text: '继续看书，可能只是幻觉', next: 'library_continue', effects: { flag: 'ignored_vision' } }
      ]
    },

    library_continue: {
      id: 'library_continue',
      chapter: 1,
      location: 'library',
      narrative: `你摇摇头，把注意力转回书本。但那一幕一直在你脑海中挥之不去。\n\n银白色的女孩、淡金色的眼睛、凭空消失……她是谁？为什么会在图书馆里？\n\n你翻开另一本书——关于龙族四大君王的记载。\n\n"青铜与火之王·诺顿，四大君王中最暴戾的一位。它的权柄是铸造与火焰。传说它在长江水下建造了一座青铜城，将自己的王座安置其中……"\n\n你的目光在"青铜城"三个字上停住了。\n\n你有种预感——你很快就要和这位龙王打交道了。`,

      effects: { flag: 'read_about_norton', location: 'library' },
      choices: [
        { text: '回宿舍休息', next: 'campus_life_intro' }
      ]
    },

    ice_cellar_door: {
      id: 'ice_cellar_door',
      chapter: 1,
      location: 'library',
      narrative: `你绕过书架，在走廊尽头发现了一扇虚掩的铁门。门上刻着一个古老的符号——一个圆圈，中间是一条首尾相接的龙。\n\n这是龙族的印记。\n\n你推开门，一条向下的楼梯出现在眼前。阴冷的风从下方吹来，带着一股……血腥和钢铁的味道。\n\n楼梯口挂着一块铜牌：\n\n"冰窖（Ice Cellar）——S级权限 · 未经执行部部长授权，任何人不得入内"\n\n你听到下方传来一阵金属碰撞的声音——像是铁链在拖拽。然后是低沉的、不像是人类的呼吸声。\n\n你体内的龙血在躁动。它在呼唤你下去。`,

      effects: { flag: 'found_ice_cellar' },
      choices: [
        { text: '下去看看', next: 'ice_cellar_deep', effects: { flag: 'entered_ice_cellar' } },
        { text: '先退回去——没有授权就闯入太危险了', next: 'campus_life_intro', effects: { flag: 'retreated' } }
      ]
    },

    ice_cellar_deep: {
      id: 'ice_cellar_deep',
      chapter: 1,
      location: 'library',
      narrative: `你走下楼梯。越往下走，空气越冷，血腥味也越来越重。\n\n冰窖的底层是一个巨大的地下空间。四周的墙壁上镶嵌着巨大的铁门，门上刻满了发光的封印符文。铁链从天花板垂下，吊着一些……你不确定是什么的东西。\n\n在空间的中央，有一个巨大的铁笼。笼子里，一个少年蜷缩在角落里。他听到脚步声，抬起头——\n\n他的脸苍白到几乎透明，瞳孔是金色的，嘴角带着一丝不属于人类的微笑。\n\n"你是新来的？"他的声音像少年一样清澈，"我叫芬里厄。你是第一个敢走进来的新生。"\n\n他站起来，走到铁笼边。你这才注意到他的手脚上都锁着刻满符文的镣铐。\n\n"他们说我是一条龙。"他歪着头看你，"你觉得呢？"\n\n远处传来脚步声。芬里厄的笑容收敛了："有人来了。你该走了——不过下次来的时候，能给我带点吃的吗？这里的营养液……太难喝了。"\n\n他冲你眨了眨眼睛。那个瞬间，你真的在他身后看到了一对巨大的、半透明的金色翅膀。`,

      effects: { flag: 'met_fengli', affection: { '芬里厄': 15 } },
      choices: [
        { text: '匆匆离开，不想被人发现', next: 'campus_life_intro' },
        { text: '坚定地说："我会再来的。"', next: 'campus_life_intro', effects: { flag: 'promised_fengli', affection: { '芬里厄': 10 } } }
      ]
    },

    // ========== 校园生活过渡 ==========
    campus_life_intro: {
      id: 'campus_life_intro',
      chapter: 1,
      location: 'campus',
      narrative: `你在卡塞尔学院的第一周就这样过去了。\n\n你上了龙族历史课、炼金术入门、格斗训练……每一天都在接触一个全新的世界。你认识了更多的人——有友好的、有冷漠的、有深藏不露的。\n\n你也在战网上和老唐成了固定队友。每天晚上，你和芬格尔、老唐三个人一起打星际争霸。老唐的操作一如既往地犀利，但他的话语中偶尔会流露出一种……不属于普通游戏玩家的沧桑感。\n\n"老唐，你到底是做什么的？"有一次你问。\n\n"我？"老唐在语音里笑了笑，"一个……四处旅行的古董商人。专门倒卖那些"不该存在"的东西。"\n\n"不该存在的东西？"\n\n"比如说——刻着龙文的青铜器。"\n\n你的心猛地跳了一下。\n\n"开玩笑的！"老唐大笑，"你这也信？"\n\n但你知道——他不完全是在开玩笑。\n\n这天，施耐德教授在走廊里叫住了你：\n\n"有一个任务，"他说，"需要你去执行。"\n\n"什么任务？"\n\n"三峡水库。我们的探测设备在那里的水下检测到了强烈的龙类反应。"施耐德的表情严肃，"可能是龙王。"\n\n他终于说出了那个词：\n\n"青铜与火之王。"`,

      effects: { flag: 'first_mission', chapter: 1, location: 'campus' },
      choices: [
        {
          text: '"我去。"——毫不犹豫地接下任务',
          hint: '这是证明自己的机会',
          next: 'mission_three_gorges',
          effects: { flag: 'accepted_mission' }
        },
        {
          text: '"我需要准备一下。"——先做功课再出发',
          hint: '知己知彼',
          next: 'mission_preparation',
          effects: { flag: 'prepare_mission' }
        }
      ]
    },

    mission_preparation: {
      id: 'mission_preparation',
      chapter: 1,
      location: 'library',
      narrative: `你用了一天时间在图书馆查阅关于青铜与火之王的资料。\n\n根据古籍记载，青铜与火之王是四大龙王中最好战的一位。它在远古时代就被封印——而封印的地点，据说就在中国长江的水底。\n\n你还找到了一个重要的信息：青铜与火之王有一个弱點——它的权柄与"锻造"有关。它的力量来自于金属和火焰，如果能在没有金属的环境中战斗……\n\n你把这条信息记在了心里。\n\n出发那天，施耐德在校门口等你。同行的还有——\n\n楚子航站在车边，肩上斜挎着那个黑色的琴盒。\n\n"我和你一起去。"他说。`,

      effects: { flag: 'prepared_mission', affection: { '楚子航': 10 } },
      choices: [
        { text: '"走吧。"——和楚子航一起出发', next: 'mission_three_gorges', effects: { flag: 'go_with_chu' } }
      ]
    },

    // ========== 三峡任务（Book I 高潮） ==========
    // ========== 老唐的真实身份 ==========
    laotang_reveal: {
      id: 'laotang_reveal',
      chapter: 1,
      location: 'three_gorges',
      narrative: `在你出发前往三峡之前，你给老唐发了一条消息："我最近要去出差，可能上不了线了。"\n\n老唐的回复很快："出差？去哪？"\n\n"三峡。"\n\n那之后，老唐沉默了整整五分钟。然后他发来一条消息：\n\n"……{name}，有件事我一直没告诉你。我不是什么古董商人。"\n\n"我……我不知道该怎么解释。但如果你在三峡水下看到一座青铜城——不要进去。"\n\n你的血液凝固了。\n\n"你怎么知道三峡水下有青铜城？"你打字的手在颤抖。\n\n没有回复。\n\n老唐的ID变灰了。他下线了。\n\n你突然意识到——\n\n老唐从来不 sick。他的操作精准得像机器。他对龙族的事情有着超乎寻常的了解。他从不谈论自己的过去。\n\n一个可怕的念头浮现在你脑海中。\n\n你拨通了古德里安的电话："教授，龙王诺顿……有没有可能以人类的形态存在？"\n\n电话那头沉默了。\n\n"理论上……"古德里安的声音变得艰难，"龙王的灵魂可以在人类的身体中重生。那个人甚至可能不知道自己是谁，直到龙血完全苏醒。"\n\n"如果那个人来到了三峡呢？"\n\n"那就意味着——诺顿要回家了。"`,

      effects: { flag: 'know_laotang_truth' },
      choices: [
        { text: '带着这个秘密前往三峡', next: 'mission_three_gorges', effects: { flag: 'go_three_gorges_with_secret' } },
        { text: '试图联系老唐，劝他不要来', next: 'try_stop_laotang', effects: { flag: 'try_warn_laotang' } }
      ]
    },

    try_stop_laotang: {
      id: 'try_stop_laotang',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你疯狂地给老唐打电话，但全部无人接听。\n\n你给他发语音消息："老唐！不管你是谁——不要来三峡！我们可以想办法帮你！"\n\n几分钟后，你收到了一条简短的回复：\n\n"太迟了，兄弟。"\n\n"我已经在路上了。"\n\n你的心沉到了谷底。`,

      effects: { flag: 'warned_laotang' },
      choices: [
        { text: '出发去三峡', next: 'mission_three_gorges' }
      ]
    },

    mission_three_gorges: {
      id: 'mission_three_gorges',
      chapter: 1,
      location: 'three_gorges',
      narrative: `长江三峡，夜色如墨。\n\n你们站在水库岸边。水面平静得像一面黑色的镜子，但水下探测器的读数显示——下方三百米处，有巨大的生物反应。\n\n"龙王就在下面。"施耐德的声音从通讯器里传来，"你们的任务是在它完全苏醒之前，用封印装置将其镇压。"\n\n楚子航站在你身边，琴盒打开，露出了里面的刀。月光照在刀身上，反射出冷冽的光芒。\n\n"害怕吗？"他问。\n\n"有一点。"\n\n"那就对了。"楚子航说，"不害怕的人，活不长。"\n\n水面开始沸腾。巨大的气泡从水底涌上来，带着硫磺的气味。水下有什么东西在发光——暗红色的光，像地下深处翻涌的岩浆。\n\n"它来了。"楚子航握紧了刀。`,

      choices: [
        {
          text: '和楚子航一起准备战斗',
          hint: '并肩作战',
          next: 'combat_dragon_bronze',
          effects: { flag: 'fight_together_chu' }
        },
        {
          text: '先观察龙王的动静，寻找弱点',
          hint: '古籍中可能有提示',
          next: 'observe_dragon_first',
          effects: { flag: 'observe_first' }
        }
      ]
    },

    observe_dragon_first: {
      id: 'observe_dragon_first',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你按住楚子航的手："等等。"\n\n水面的沸腾越来越剧烈。一个巨大的身影从水下浮现——那是……一扇门？\n\n一扇青铜门，从水底升起，高达数十米。门上刻满了古老的符文——那是龙文。\n\n"这不是龙王本体，"你说，"这是封印之门。龙王被封印在这扇门后面。"\n\n但门上的符文正在一条条熄灭——封印正在减弱。\n\n"需要加固封印，"你快速说道，"用炼金术。"\n\n楚子航看了你一眼："你会炼金术？"\n\n"学了一点。"\n\n你走向那扇青铜门。门上的符文在你眼中变得清晰——你仿佛能读懂它们的含义。你的手不自觉地抬起，指尖在空气中划出复杂的轨迹。\n\n龙文在你口中吟唱出来——你自己都不知道你是怎么会的。\n\n符文重新亮起，一一点燃。青铜门缓缓沉入水底。\n\n水面恢复了平静。`,

      effects: { flag: 'sealed_bronze_gate', location: 'three_gorges' },
      choices: [
        { text: '和楚子航撤离，任务完成', next: 'post_three_gorges', effects: { flag: 'seal_success', affection: { '楚子航': 10 } } }
      ]
    },

    combat_dragon_bronze: {
      id: 'combat_dragon_bronze',
      chapter: 1,
      location: 'three_gorges',
      narrative: `水面炸裂。\n\n一个巨大的身影从水下冲出——那是一条青铜色的巨龙，浑身覆盖着金属般的鳞片，眼睛是两团燃烧的火焰。\n\n青铜与火之王——诺顿。\n\n它发出震耳欲聋的咆哮，高温的气浪将你掀飞出去。楚子航稳住身形，拔刀冲上——村雨的刀光在夜空中划出一道银线，斩在龙王的鳞片上，迸出一串火星。\n\n"它的鳞片太硬了！"楚子航喊道。\n\n你明白，硬拼没有胜算。你闭上眼睛，感受着血液中涌动的力量——你的言灵在苏醒。\n\n当你睁开眼睛时，世界变成了金色。\n\n你的言灵——发动。`,

      effects: { flag: 'combat_norton', location: 'three_gorges' },
      choices: [
        { text: '使用攻击型言灵全力攻击', next: 'spirit_attack_dragon', effects: { flag: 'use_offensive_spirit' } },
        { text: '使用封印言灵尝试压制龙王', next: 'seal_dragon', effects: { flag: 'use_seal_spirit' } }
      ]
    },

    spirit_attack_dragon: {
      id: 'spirit_attack_dragon',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你的言灵爆发了。\n\n金色的光芒从你体内喷涌而出，形成一道巨大的光柱，直冲云霄。龙王发出了痛苦的咆哮——它的鳞片在光芒中开始龟裂。\n\n楚子航抓住机会，持刀跃起——村雨贯穿了龙王胸口的裂缝。\n\n龙王发出一声震天的怒吼，整个三峡都在颤抖。然后——它的身体开始崩塌，化为漫天的灰烬，落入长江之中。\n\n你和楚子航站在岸边，喘着粗气。\n\n"死了吗？"你问。\n\n楚子航看着逐渐平静的水面："龙王的肉体被摧毁了。但它的灵魂……逃走了。"\n\n他收刀入鞘："不过，至少我们赢了这一仗。"`,

      effects: { flag: 'killed_norton_body', location: 'three_gorges' },
      combat: {
        enemies: [{ id: 'norton', name: '青铜与火之王·诺顿', hp: 80, atk: 12, ac: 16, mdef: 10, expReward: 100 }]
      },
      choices: [
        { text: '返回学院报告任务', next: 'post_three_gorges', effects: { flag: 'return_to_campus' } }
      ]
    },

    seal_dragon: {
      id: 'seal_dragon',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你双手结印，言灵之力化作金色的锁链，从四面八方缠向龙王。\n\n诺顿挣扎着，火焰从它身上喷涌而出，试图烧断锁链。但你咬紧牙关，血统之力全开——锁链越收越紧，最终将龙王牢牢捆住。\n\n它愤怒地咆哮着，被拖回了水下的青铜门中。门扉轰然关闭，封印符文重新亮起。\n\n水面恢复了平静。\n\n楚子航看着你，眼中闪过一丝惊讶："你封印了龙王。"\n\n你瘫坐在地上，浑身脱力。但你知道——这只是暂时的。封印总有一天会再次松动。到时候，需要更强的力量来彻底消灭它。`,

      effects: { flag: 'sealed_norton', location: 'three_gorges' },
      choices: [
        { text: '返回学院', next: 'post_three_gorges', effects: { flag: 'return_after_seal' } }
      ]
    },

    // ========== 高潮：龙王诺顿 ==========
    combat_norton_climax: {
      id: 'combat_norton_climax',
      chapter: 1,
      location: 'three_gorges',
      narrative: `三峡的水面炸裂开来。\n\n一座巨大的青铜城从水底升起——那是龙王诺顿的王座，一座由青铜铸就的宫殿，布满了龙文和古老的图腾。在青铜城的顶端，站着一个你熟悉的身影。\n\n老唐。\n\n不——那已经不是老唐了。他的眼睛燃烧着金色的火焰，皮肤上浮现出青铜色的鳞片纹路。他的头顶升起了一对弯曲的角。\n\n"诺顿……青铜与火之王。"楚子航握紧了村雨，低声说。\n\n老唐——不，诺顿——低头看着你们。他的表情中混杂着痛苦和愤怒。\n\n"{name}……"他的声音变得沙哑而古老，"我不想伤害你。但这是我回家的路——我已经等了一万年。"\n\n他抬起手。空气开始燃烧。整个三峡的温度骤然升高了十几度。\n\n楚子航拔刀冲了上去——但诺顿随手一挥，一道火焰将楚子航击飞了出去。\n\n你站在原地，看着老唐——你的朋友——变成了龙王。\n\n你的血液在沸腾。你的脑海中响起了路鸣泽的声音：\n\n"哥哥，你需要我的帮助。"\n\n"代价是四分之一的生命——你愿意付吗？"`,

      effects: { flag: 'confront_norton' },
      choices: [
        {
          text: '呼唤路鸣泽——付出四分之一的代价换取力量',
          hint: '"帮我。"',
          next: 'lumingze_deal_climax',
          effects: { flag: 'made_deal_with_lumingze' }
        },
        {
          text: '拒绝交易——用自己现有的力量战斗',
          hint: '"我不能拿命去赌。"',
          next: 'fight_norton_alone',
          effects: { flag: 'refused_deal' }
        },
        {
          text: '试图和老唐交流——唤醒他的人性',
          hint: '"老唐！你他妈的清醒一点！"',
          next: 'talk_to_laotang_final',
          effects: { flag: 'try_save_laotang' }
        }
      ]
    },

    lumingze_deal_climax: {
      id: 'lumingze_deal_climax',
      chapter: 1,
      location: 'three_gorges',
      narrative: `"帮我。"你说。\n\n世界静止了。\n\n路鸣泽出现在你面前，穿着一尘不染的黑色西装，金色的眼睛带着笑意。\n\n"成交。"他伸出手，"四分之一的你——归我。"\n\n你握住了他的手。\n\n那一刻，你感觉到一股前所未有的力量从身体深处喷涌而出。你的瞳孔变成了纯粹的熔金色。你的言灵——那个你从未完全掌握的言灵——在这一刻完全觉醒了。\n\n你的周围产生了巨大的气压，水面被压出一个巨坑。楚子航不得不后退几步才能站稳。\n\n诺顿——老唐——看着你，金色的眼中闪过一丝惊讶：\n\n"你……你是那个人的……"他没有说完。\n\n你的言灵爆发了。\n\n一道金色的光柱从你身上冲天而起，将整个三峡照得如同白昼。诺顿的火焰在你面前退缩了——你的力量，竟然压制了龙王。\n\n"结束了，诺顿。"你说。`,

      effects: { flag: 'used_lumingze_power', chapter: 1 },
      combat: {
        enemies: [{ id: 'norton_final', name: '青铜与火之王·诺顿（完全体）', hp: 120, atk: 15, ac: 18, mdef: 12, expReward: 200 }]
      },
      choices: [
        { text: '发动最终一击', next: 'norton_defeated', effects: { flag: 'defeated_norton_with_power' } }
      ]
    },

    fight_norton_alone: {
      id: 'fight_norton_alone',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你咬紧牙关，用自己的力量迎了上去。\n\n诺顿的火焰铺天盖地地涌来——你侧身闪过，言灵的力量在掌心凝聚。你没有路鸣泽的帮助，但你有一个S级混血种的全部潜能。\n\n你冲向诺顿。\n\n战斗持续了十分钟。你的身上布满了烧伤，体力接近极限。但诺顿也不好受——他身上的鳞片被你打碎了好几处。\n\n"你……很强。"诺顿说，语气中带着一丝欣赏，"比我想象的强。"\n\n"但我还没用全力。"\n\n他张开嘴——一道金色的火焰正在他喉咙深处凝聚。那是足以熔化一切的高温。\n\n就在这时——\n\n诺顿的表情忽然扭曲了。他的左眼中闪过一丝……熟悉的、属于"老唐"的光芒。\n\n"{name}……快……"他的声音断断续续，"我……压不住它了……杀了我……"\n\n他的身体在龙王和人类之间剧烈地切换。他在用自己的意识压制动物的本能。\n\n"趁我……还是我……"老唐——诺顿——艰难地说，"动手。"`,

      effects: { flag: 'fought_norton_alone' },
      choices: [
        { text: '含泪发动致命一击', next: 'norton_defeated_sad', effects: { flag: 'killed_laotang' } },
        { text: '试图封印而不是杀死他', next: 'seal_norton_final', effects: { flag: 'sealed_laotang' } }
      ]
    },

    talk_to_laotang_final: {
      id: 'talk_to_laotang_final',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你冲上前去，站在诺顿面前，直视着他金色的眼睛。\n\n"老唐！你还记得吗？星际争霸、通宵的排位赛、赢了之后你的大笑——那不是龙王的记忆，那是你的！"\n\n诺顿的身体僵住了。\n\n"一起打游戏的时光……是真的。"一个微弱的声音从他喉咙里传出来——那是老唐的声音。"那些……不是假的。"\n\n他的眼中闪过一丝清明。\n\n"谢谢你……{name}。"老唐——诺顿——露出了一个人类的笑，"谢谢你把我当朋友。"\n\n然后他的表情变得痛苦："但我压不住它了……龙王要完全觉醒了。在我彻底变成它之前——"\n\n"封印我。"`,

      effects: { flag: 'talked_to_laotang' },
      choices: [
        { text: '用言灵将他封印', next: 'seal_norton_final', effects: { flag: 'sealed_after_talk' } }
      ]
    },

    seal_norton_final: {
      id: 'seal_norton_final',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你双手结印，言灵之力化作金色的锁链，将诺顿层层缠绕。他没有反抗。\n\n"谢谢。"他——或者说老唐——说。\n\n青铜城缓缓沉入水底。诺顿被封印在龙座上，陷入了又一次的长眠。\n\n你瘫坐在地上，浑身脱力。楚子航走过来，沉默地把手放在你肩上。\n\n"你做得很对。"他说，"有时候，最好的结局……不是杀死敌人，而是拯救朋友。"\n\n你看着平静的水面。\n\n老唐还在那里——在青铜城中，在龙王的躯壳里，沉睡着。\n\n也许有一天，你会找到办法真正地救他。`,

      effects: { flag: 'sealed_norton_kindly', location: 'three_gorges' },
      choices: [
        { text: '返回学院', next: 'post_three_gorges' }
      ]
    },

    norton_defeated: {
      id: 'norton_defeated',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你的全力一击贯穿了诺顿的胸口。\n\n青铜与火之王发出一声震天的怒吼——然后他的身体开始崩塌。青铜色的鳞片一片片剥落，化为灰烬。他的身体在金色的火焰中燃烧，最终……化为虚无。\n\n你站在原地，喘着粗气。路鸣泽的力量正在退去——你感到一阵前所未有的虚弱。\n\n"王死了。"楚子航来到你身边，低声说。\n\n但你没有胜利的喜悦。你只感到一种……巨大的空虚。\n\n在诺顿消失的地方，地面上刻着一行字——是用指甲刻的：\n\n"谢谢你，兄弟。"\n\n那是老唐留给你最后的话。`,

      effects: { flag: 'killed_norton', location: 'three_gorges' },
      choices: [
        { text: '返回卡塞尔学院', next: 'post_three_gorges' }
      ]
    },

    norton_defeated_sad: {
      id: 'norton_defeated_sad',
      chapter: 1,
      location: 'three_gorges',
      narrative: `你的武器刺穿了诺顿的心脏。\n\n龙王的瞳孔骤然收缩。然后——金色的火焰从伤口中喷涌而出，将他的身体燃烧殆尽。\n\n在火焰熄灭前的最后一刻，你看到了老唐的脸——他微笑着，像是解脱了。\n\n"能认识你……真好。"\n\n然后他消失了。\n\n你跪在地上。你的双手沾满了灰烬——那曾是你朋友的一部分。\n\n楚子航什么也没说，只是站在你身边。有时候，陪伴本身就是最好的安慰。\n\n过了很久，你站起来。你的脸上没有泪，但你的心在流血。\n\n你知道，你会永远记住老唐——那个在星际争霸里跟你并肩作战的兄弟。`,

      effects: { flag: 'killed_laotang_sadly', location: 'three_gorges' },
      choices: [
        { text: '返回卡塞尔学院', next: 'post_three_gorges' }
      ]
    },

    // ========== 第一章结尾 ==========
    post_three_gorges: {
      id: 'post_three_gorges',
      chapter: 1,
      location: 'campus',
      narrative: `你回到了卡塞尔学院。\n\n三峡的任务让你在学院里名声大噪——学生们看你的眼神里多了一份敬畏。但你知道真正的代价是什么。\n\n如果你和老唐做了交易——你低头看着自己的手。路鸣泽拿走了你四分之一的寿命。你不知道那是多少年——十年？二十年？还是更久？\n\n但至少你还活着。老唐……诺顿……他得到了安息。如果他没有死，而是被封印了——那你还有机会找到救他的办法。\n\n昂热校长在他的办公室里召见了你。\n\n"你做得很好，"他说，"比我预想的好。"\n\n他走到窗边，看着远方的山脉：\n\n"龙族有四位君王。青铜与火之王只是第一个。大地与山之王、海洋与水之王、天空与风之王……它们都在苏醒。"\n\n他转过身，目光如炬：\n\n"你准备好面对它们了吗？"\n\n窗外，夜色降临。卡塞尔学院的钟楼敲响了十一下。\n\n你知道，属于你的战争，才刚刚开始。\n\n而在世界的某个角落——一个穿着黑色西装的小男孩正微笑着，金色的眼睛在黑暗中闪闪发光。\n\n"哥哥……你做得很好。"\n\n"但我拿走的东西——永远都不会还给你了。"`,
      effects: { flag: 'chapter1_complete', chapter: 2, location: 'campus' },
      choices: [
        {
          text: '选择阵营——加入狮心会（楚子航的阵营）',
          hint: '追求最强的力量',
          next: 'chapter2_slytherin',
          effects: { flag: 'join_leonheart', affection: { '楚子航': 15, '凯撒·加图索': -5 } }
        },
        {
          text: '选择阵营——加入学生会（凯撒的阵营）',
          hint: '追求荣耀与名望',
          next: 'chapter2_student_union',
          effects: { flag: 'join_student_union', affection: { '凯撒·加图索': 15, '楚子航': -5 } }
        },
        {
          text: '保持独立，走自己的路',
          hint: '不依附于任何人',
          next: 'chapter2_independent',
          effects: { flag: 'stay_independent' }
        }
      ]
    }
  }
};

// 简化场景数据中缺少的引用场景
// 这些场景会在游戏运行时由AI引擎生成
// 包括：talk_angers_office, chapter2_slytherin, chapter2_student_union, chapter2_independent
// 以及所有后续的龙族II和龙族III剧情
