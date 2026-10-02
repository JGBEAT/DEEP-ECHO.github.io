/* 幽海工作室 DeepEcho: translations + tiny i18n engine (vanilla JS)
 *
 * Markup:
 *   data-i18n="key"                    element text is replaced with dict[key]
 *   data-i18n-attr="alt:key;aria-label:key2"   attributes are replaced
 * The Chinese copy stays in the HTML as the no-JS fallback; any key missing
 * from a dictionary falls back to whatever the HTML originally contained.
 *
 * Adding a language (e.g. Japanese), no HTML edits needed:
 *   1. add  "ja": { ...same keys... }  to DICTS below
 *   2. add  "ja": { name: '日本語', short: '日本語' }  to NAMES below
 * The globe menu in the header is built from DICTS + NAMES automatically.
 */
(function () {
  'use strict';

  var DICTS = {
    'zh-Hant': {
      'meta.home.title': '幽海工作室 DeepEcho｜深潛想像，回響於世',
      'meta.home.desc': '深潛想像，回響於世。幽海工作室 DeepEcho 是來自台灣的獨立遊戲與數位內容團隊，承接遊戲開發、UE5 專案、3D 動畫與多媒體製作委託。',
      'meta.game.title': '寂靜沉輪 Silent Wreckage｜幽海工作室 DeepEcho',
      'meta.game.desc': '《寂靜沉輪》Silent Wreckage：潛入沉沒於深海的郵輪，在敘事驅動的 3D 生存解謎恐怖中，揭開時空扭曲背後的真相。Demo 已在 Steam 上架。',

      'skip': '跳至主要內容',
      'nav.label': '主選單',
      'brand.top': '幽海工作室 DeepEcho，回到頁首',
      'brand.home': '幽海工作室 DeepEcho 首頁',
      'menu.open': '開啟選單',
      'menu.close': '關閉選單',
      'lang.group': '語言',
      'lang.change': '切換語言',
      'hero.h1': '幽海工作室 DeepEcho',
      'alt.logo': '幽海工作室 DeepEcho 標誌',
      'nav.services': '服務',
      'nav.works': '作品',
      'nav.about': '關於',
      'nav.contact': '聯絡',
      'common.newTab': '（另開新視窗）',

      'slogan': '深潛想像，回響於世',
      'hero.cta.contact': '洽談合作',
      'hero.cta.works': '探索作品',

      'svc.title': '服務',
      'svc.intro': '從互動遊戲到影像動畫，我們以 Unreal Engine 5 為核心，協助你把構想做成可體驗的作品。',
      'svc.1.title': '遊戲開發',
      'svc.1.alt': 'Game Development',
      'svc.1.desc': '從原型到可發行版本的遊戲開發，涵蓋玩法、關卡與系統實作。',
      'svc.2.title': 'UE5 專案',
      'svc.2.alt': 'Unreal Engine 5 Projects',
      'svc.2.desc': 'Unreal Engine 5 互動專案、即時渲染場景與技術支援。',
      'svc.3.title': '3D 動畫',
      'svc.3.alt': '3D Animation',
      'svc.3.desc': '3D 動畫、過場與宣傳影片製作。',
      'svc.4.title': '多媒體製作',
      'svc.4.alt': 'Media Production',
      'svc.4.desc': '預告片、宣傳素材與各類多媒體內容。',

      'works.title': '作品',
      'works.intro': '我們的原創作品。',
      'works.more': '查看作品',
      'alt.cover': '《寂靜沉輪》封面圖',

      'about.title': '關於工作室',
      'about.body': '幽海工作室 DeepEcho 是來自台灣的獨立遊戲與數位內容團隊，以 Unreal Engine 5 打造沉浸、有氛圍感的互動體驗。除了開發原創遊戲，我們也承接遊戲、UE5 專案、3D 動畫與多媒體製作委託。',
      'about.meta': '獨立遊戲與數位內容　·　台灣',
      'alt.about': '《寂靜沉輪》遊戲畫面',

      'contact.title': '聯絡與合作',
      'contact.lead': '專案委託、合作提案或媒體聯繫，歡迎來信。',
      'social.label': '社群連結',

      'game.badge': 'DEMO 已上架',
      'game.title': '寂靜沉輪',
      'game.alt': 'Silent Wreckage',
      'game.tagline': '潛入沉沒於深海的郵輪，在敘事驅動的 3D 生存解謎恐怖中，揭開時空扭曲背後的真相。',
      'cta.demo': '在 Steam 免費下載 Demo',
      'cta.wishlist': '加入願望清單',

      'story.title': '故事簡介',
      'story.p1': '《寂靜沉輪》是一款結合深海幽閉恐懼與虛擬氣體資源管理的第一人稱3D生存解謎恐怖遊戲。',
      'story.p2': '在接獲失蹤女兒的訊息後，潛水員張益前往深海調查一艘沉沒的郵輪。然而在潛入後，他卻陷入時間與空間崩解的異常循環之中，船內結構在現實與幻象之間不斷變化，黑暗中也開始浮現詭異且具威脅的存在。',
      'story.p3': '在探索過程中，張益必須在空氣逐漸耗盡的壓力下行動，同時拼湊散落於船內的線索。隨著調查深入，他逐漸發現這艘船並非單純的事故殘骸，而是隱藏著更深層且令人不安的真相。隨著謎團逐步揭開，他開始懷疑眼前的一切是否真實，以及引導他的女兒聲音，究竟是否來自她本人，還是另有其物。',
      'story.note': '本作目前為畢業製作 Demo 版本，完整版將於尋求合作夥伴後持續開發。',

      'info.genre': '類型',
      'info.genre.v': '第一人稱恐怖解謎',
      'info.platform': '平台',
      'info.platform.v': 'PC（Windows 10/11）',
      'info.status': '開發狀態',
      'info.status.v': 'Demo 已上架',
      'info.lang': '支援語言',
      'info.lang.v': '繁中、簡中、英文、日文、韓文',
      'info.dev': '開發',

      'feat.title': '遊戲特色',
      'feat.1.title': '氣體管理系統',
      'feat.1.desc': '透過潛水電腦即時調整「MI」與「NI」兩種虛構氣體的比例以維持生存。比例失衡將帶來幻覺、行動遲緩，甚至直接導致死亡。',
      'feat.2.title': '雙重世界穿越',
      'feat.2.desc': '在特定場景中將氣體調至高 NI 比例，可穿越表、裡世界之間的縫隙，探索常規視野下無法到達的空間。',
      'feat.3.title': '沉浸式深海恐懼',
      'feat.3.desc': '極低能見度的水下環境、詭異的怪物追逐與混亂的船艙空間，在資源匱乏與心理壓力的夾擊下求生。',
      'feat.4.title': '高風險決策',
      'feat.4.desc': 'MI 與 NI 過量或不足均會觸發負面效果，必須在緊張的探索中即時判斷。',

      'gallery.title': '截圖與影片',
      'gallery.more': '查看全部 8 張',
      'trailer.label': '觀看預告片',
      'trailer.sr': '（於 Steam 商店頁，另開新視窗）',
      'alt.ss1': '《寂靜沉輪》遊戲截圖 1',
      'alt.ss2': '《寂靜沉輪》遊戲截圖 2',
      'alt.ss3': '《寂靜沉輪》遊戲截圖 3',
      'alt.ss4': '《寂靜沉輪》遊戲截圖 4',
      'alt.ss5': '《寂靜沉輪》遊戲截圖 5',
      'alt.ss6': '《寂靜沉輪》遊戲截圖 6',
      'alt.ss7': '《寂靜沉輪》遊戲截圖 7',
      'alt.ss8': '《寂靜沉輪》遊戲截圖 8',
      'lb.label': '截圖瀏覽',
      'lb.close': '關閉',
      'lb.prev': '上一張',
      'lb.next': '下一張',
      'back': '返回作品列表',

      /* round 4 */
      'nav.process': '合作流程',
      'nav.awards': '獲獎',
      'nav.faq': '常見問題',
      'nav.hire': '委託我們',
      'hero.sub': '遊戲・UE5・3D 動畫・多媒體',
      'proc.title': '合作流程',
      'proc.intro': '從第一次聯繫到交付，每一步都清楚透明。',
      'proc.1.title': '需求諮詢',
      'proc.1.desc': '來信或填寫委託表單，說明專案目標、範圍、時程與預算，我們會回覆並安排線上會議。',
      'proc.2.title': '提案與報價',
      'proc.2.desc': '依需求提出製作方向、時程與報價明細，雙方確認後簽約。',
      'proc.3.title': '前期製作',
      'proc.3.desc': '概念設計、分鏡或原型，先確認方向再進入正式製作。',
      'proc.4.title': '製作與回報',
      'proc.4.desc': '依里程碑交付進度，每個階段都有審閱與修改。',
      'proc.5.title': '交付與支援',
      'proc.5.desc': '交付成品與約定的原始檔，並提供交付後的技術支援。',
      'video.title': '《寂靜沉輪》Demo 預告片',
      'video.play': '播放《寂靜沉輪》Demo 預告片',
      'video.caption': 'Demo 預告片',
      'ost.title': '遊戲配樂',
      'ost.more': '更多影片',
      'awards.title': '獲獎與入圍',
      'award.result.merit': '優選',
      'award.result.finalist': '入圍',
      'award.1.name': '放視大賞 PC 與主機遊戲組',
      'award.2.name': '青春設計節 遊戲設計組',
      'award.3.name': '德國紅點設計大獎 App 類',
      'award.3.result': '紅點獎',
      'award.result.second': '二次審查入選',
      'award.work.sw': '《寂靜沉輪》',
      'tools.title': '使用工具',
      'tools.ue': '即時渲染與遊戲開發',
      'tools.maya': '建模與動畫',
      'tools.zbrush': '數位雕刻',
      'tools.blender': '3D 製作',
      'tools.ae': '動態影像與後製',
      'tools.ps': '貼圖與視覺設計',
      'faq.title': '常見問題',
      'faq.intro': '沒有找到答案？歡迎直接來信詢問。',
      'faq.1.q': '報價怎麼計算？',
      'faq.1.a': '依專案範圍、品質要求與時程評估。提供需求後，我們會給出報價明細。',
      'faq.2.q': '製作需要多久？',
      'faq.2.a': '依規模而定。短篇動畫或素材通常以週計，遊戲與互動專案通常以月計，提案時會附上時程表。',
      'faq.3.q': '付款方式？',
      'faq.3.a': '通常分期付款，例如簽約訂金、里程碑款與驗收尾款，比例依專案而定。',
      'faq.4.q': '著作權歸誰？',
      'faq.4.a': '依合約約定。一般委託案在款項付清後，將成品的著作財產權轉讓或授權給委託方；若無保密需求，我們會保留作品集展示的權利。',
      'faq.5.q': '可以簽保密協議嗎？',
      'faq.5.a': '可以，我們可以在洽談前簽署 NDA。',
      'faq.6.q': '可以修改幾次？',
      'faq.6.a': '每個階段包含的修改次數會寫在合約中，超出範圍的調整另行報價。',
      'faq.7.q': '可以只委託其中一部分嗎？',
      'faq.7.a': '可以，例如只做 3D 模型、動畫，或 UE5 技術支援。',
      'faq.8.q': '接受遠端或海外合作嗎？',
      'faq.8.a': '可以，我們能以中文或英文遠端協作。',
      'contact.direct': '直接聯絡',
      'form.title': '委託表單',
      'form.name': '姓名或公司',
      'form.type': '專案類型',
      'form.select': '請選擇',
      'form.type.game': '遊戲開發',
      'form.type.ue5': 'UE5 專案',
      'form.type.anim': '3D 動畫',
      'form.type.media': '多媒體製作',
      'form.type.other': '其他',
      'form.budget': '預算範圍',
      'form.optional': '（選填）',
      'form.budget.unsure': '尚未確定',
      'form.budget.1': 'NT$10 萬以下',
      'form.budget.2': 'NT$10–30 萬',
      'form.budget.3': 'NT$30–100 萬',
      'form.budget.4': 'NT$100 萬以上',
      'form.timeline': '期望時程',
      'form.timeline.ph': '例如：2026 年 12 月上線',
      'form.details': '專案說明',
      'form.details.ph': '專案目標、內容範圍、平台、參考風格等',
      'form.links': '參考連結',
      'form.submit': '送出委託',
      'form.sending': '傳送中…',
      'form.required': '為必填欄位',
      'form.err.name': '請填寫姓名或公司名稱。',
      'form.err.email': '請填寫有效的 Email。',
      'form.err.type': '請選擇專案類型。',
      'form.err.details': '請簡單說明專案內容。',
      'form.err.summary': '有欄位需要修正，請檢查標示的項目。',
      'form.ok': '已收到你的委託，我們會盡快回覆。',
      'form.fail': '送出失敗，請稍後再試，或直接來信 abstarhuides@gmail.com。',
      'form.mailto': '已為你開啟郵件程式並填好內容，請確認後寄出。若沒有自動開啟，請直接來信 abstarhuides@gmail.com。',
      'form.subject': '委託',
      'form.none': '（未填）'
    },

    'en': {
      'meta.home.title': 'DeepEcho | Dive deep. Echo far.',
      'meta.home.desc': 'Dive deep. Echo far. DeepEcho is an independent game and digital content studio from Taiwan, taking on commissions in game development, Unreal Engine 5 projects, 3D animation and media production.',
      'meta.game.title': 'Silent Wreckage | DeepEcho',
      'meta.game.desc': 'Silent Wreckage: dive into a sunken ocean liner lost in the deep sea and uncover the truth behind a distortion of time and space. The demo is available on Steam.',

      'skip': 'Skip to main content',
      'nav.label': 'Main menu',
      'brand.top': 'DeepEcho, back to top',
      'brand.home': 'DeepEcho home',
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'lang.group': 'Language',
      'lang.change': 'Change language',
      'hero.h1': 'DeepEcho (幽海工作室)',
      'alt.logo': 'DeepEcho logo',
      'nav.services': 'Services',
      'nav.works': 'Works',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'common.newTab': '(opens in a new tab)',

      'slogan': 'Dive deep. Echo far.',
      'hero.cta.contact': 'Work with us',
      'hero.cta.works': 'Explore our work',

      'svc.title': 'Services',
      'svc.intro': 'From interactive games to animation, we build with Unreal Engine 5 at our core and turn your ideas into experiences people can play and watch.',
      'svc.1.title': 'Game Development',
      'svc.1.alt': '遊戲開發',
      'svc.1.desc': 'Game development from prototype to release, covering gameplay, levels and systems.',
      'svc.2.title': 'Unreal Engine 5 Projects',
      'svc.2.alt': 'UE5 專案',
      'svc.2.desc': 'Interactive Unreal Engine 5 projects, real-time rendered environments and technical support.',
      'svc.3.title': '3D Animation',
      'svc.3.alt': '3D 動畫',
      'svc.3.desc': '3D animation, cinematics and promotional videos.',
      'svc.4.title': 'Media Production',
      'svc.4.alt': '多媒體製作',
      'svc.4.desc': 'Trailers, promotional assets and other media content.',

      'works.title': 'Works',
      'works.intro': 'Our original titles.',
      'works.more': 'View project',
      'alt.cover': 'Silent Wreckage cover art',

      'about.title': 'About the Studio',
      'about.body': 'DeepEcho is an independent game and digital content studio from Taiwan, crafting immersive, atmospheric interactive experiences with Unreal Engine 5. Alongside our original games, we take on commissions in game development, UE5 projects, 3D animation and media production.',
      'about.meta': 'Independent games & digital content  ·  Taiwan',
      'alt.about': 'In-game scene from Silent Wreckage',

      'contact.title': 'Contact & Collaboration',
      'contact.lead': 'For commissions, partnership proposals or press, drop us a line.',
      'social.label': 'Social links',

      'game.badge': 'DEMO AVAILABLE',
      'game.title': 'Silent Wreckage',
      'game.alt': '寂靜沉輪',
      'game.tagline': 'Dive into a sunken ocean liner lost in the deep sea and uncover the truth behind a distortion of time and space.',
      'cta.demo': 'Play the free demo on Steam',
      'cta.wishlist': 'Add to Wishlist',

      'story.title': 'Story',
      'story.p1': 'Silent Wreckage is a first-person 3D survival horror puzzle game combining deep-sea claustrophobia with virtual gas resource management.',
      'story.p2': 'After receiving a message from his missing daughter, diver Zhang Yi ventures into the depths to investigate a sunken cruise ship. Upon entering, he becomes trapped in a distorted loop where time and space collapse, and the ship\'s structure shifts between reality and illusion. Strange and hostile entities begin to emerge from the darkness.',
      'story.p3': 'As he explores, Zhang Yi must manage his dwindling air supply while piecing together scattered clues throughout the vessel. Gradually, he uncovers that the ship is more than a simple wreck. It hides a deeper, unsettling truth. As the mystery unfolds, he begins to question what is real, and whether the voice of his daughter is truly guiding him, or something else entirely.',
      'story.note': 'This is a graduation project demo. Full development will continue once we find partners.',

      'info.genre': 'Genre',
      'info.genre.v': 'First-Person Horror Puzzle',
      'info.platform': 'Platform',
      'info.platform.v': 'PC (Windows 10/11)',
      'info.status': 'Status',
      'info.status.v': 'Demo available',
      'info.lang': 'Languages',
      'info.lang.v': 'English, Traditional Chinese, Simplified Chinese, Japanese, Korean',
      'info.dev': 'Developer',

      'feat.title': 'Features',
      'feat.1.title': 'Gas Management System',
      'feat.1.desc': 'Use a diving computer to manage the ratio of two fictional gases, MI and NI, in real time. An imbalanced ratio can trigger hallucinations, slow movement, or even death.',
      'feat.2.title': 'Dual World Traversal',
      'feat.2.desc': 'In certain areas, shifting to a high-NI ratio lets you slip through rifts between two overlapping worlds and reach spaces invisible to normal vision.',
      'feat.3.title': 'Immersive Deep-Sea Horror',
      'feat.3.desc': 'Near-zero visibility, terrifying creature encounters and disorienting shipwreck environments keep you under constant psychological pressure.',
      'feat.4.title': 'High-Stakes Decisions',
      'feat.4.desc': 'Both MI and NI carry negative side effects when overused. Make split-second decisions under extreme stress.',

      'gallery.title': 'Screenshots & Video',
      'gallery.more': 'View all 8',
      'trailer.label': 'Watch the trailer',
      'trailer.sr': '(on the Steam store page, opens in a new tab)',
      'alt.ss1': 'Silent Wreckage screenshot 1',
      'alt.ss2': 'Silent Wreckage screenshot 2',
      'alt.ss3': 'Silent Wreckage screenshot 3',
      'alt.ss4': 'Silent Wreckage screenshot 4',
      'alt.ss5': 'Silent Wreckage screenshot 5',
      'alt.ss6': 'Silent Wreckage screenshot 6',
      'alt.ss7': 'Silent Wreckage screenshot 7',
      'alt.ss8': 'Silent Wreckage screenshot 8',
      'lb.label': 'Screenshot viewer',
      'lb.close': 'Close',
      'lb.prev': 'Previous screenshot',
      'lb.next': 'Next screenshot',
      'back': 'Back to works',

      /* round 4 */
      'nav.process': 'Process',
      'nav.awards': 'Awards',
      'nav.faq': 'FAQ',
      'nav.hire': 'Hire us',
      'hero.sub': 'Games · UE5 · 3D Animation · Media',
      'proc.title': 'How We Work',
      'proc.intro': 'From first contact to delivery, every step is clear.',
      'proc.1.title': 'Discovery',
      'proc.1.desc': 'Email us or fill in the form with your goals, scope, timeline and budget. We\'ll reply and set up a call.',
      'proc.2.title': 'Proposal & Quote',
      'proc.2.desc': 'We propose a direction, schedule and itemized quote. Work starts once both sides sign.',
      'proc.3.title': 'Pre-production',
      'proc.3.desc': 'Concepts, storyboards or prototypes to lock the direction before full production.',
      'proc.4.title': 'Production',
      'proc.4.desc': 'Milestone-based delivery with reviews and revisions at every stage.',
      'proc.5.title': 'Delivery & Support',
      'proc.5.desc': 'We hand over the final work and agreed source files, with support after delivery.',
      'video.title': 'Silent Wreckage Demo Trailer',
      'video.play': 'Play the Silent Wreckage demo trailer',
      'video.caption': 'Demo Trailer',
      'ost.title': 'Game Music',
      'ost.more': 'More on YouTube',
      'awards.title': 'Awards & Selections',
      'award.result.merit': 'Honorable Mention',
      'award.result.finalist': 'Finalist',
      'award.1.name': 'Vision Get Wild Award, PC & Console Games',
      'award.2.name': 'Youth Innovative Design Festival, Game Design',
      'award.3.name': 'Red Dot Award, Apps',
      'award.3.result': 'Red Dot',
      'award.result.second': 'Passed 2nd Screening',
      'award.work.sw': 'Silent Wreckage',
      'tools.title': 'Our Tools',
      'tools.ue': 'Real-time & game dev',
      'tools.maya': 'Modeling & animation',
      'tools.zbrush': 'Digital sculpting',
      'tools.blender': '3D production',
      'tools.ae': 'Motion graphics & compositing',
      'tools.ps': 'Textures & visual design',
      'faq.title': 'FAQ',
      'faq.intro': 'Didn\'t find your answer? Just email us.',
      'faq.1.q': 'How do you price projects?',
      'faq.1.a': 'Based on scope, quality bar and timeline. Send us your brief and we\'ll reply with an itemized quote.',
      'faq.2.q': 'How long does it take?',
      'faq.2.a': 'It depends on scale. Short animations or assets usually take weeks; games and interactive projects usually take months. Every proposal includes a schedule.',
      'faq.3.q': 'How does payment work?',
      'faq.3.a': 'Usually in installments, such as a deposit on signing, milestone payments and a final payment on acceptance. Ratios depend on the project.',
      'faq.4.q': 'Who owns the rights?',
      'faq.4.a': 'As agreed in the contract. Typically, once paid in full, rights to the final work are transferred or licensed to the client. Unless confidential, we keep the right to show it in our portfolio.',
      'faq.5.q': 'Can you sign an NDA?',
      'faq.5.a': 'Yes, we can sign one before discussing details.',
      'faq.6.q': 'How many revisions are included?',
      'faq.6.a': 'The number per stage is set in the contract; changes beyond that are quoted separately.',
      'faq.7.q': 'Can we hire you for just part of a project?',
      'faq.7.a': 'Yes, for example only 3D models, animation or UE5 technical support.',
      'faq.8.q': 'Do you work remotely or with overseas clients?',
      'faq.8.a': 'Yes, we collaborate remotely in Chinese or English.',
      'contact.direct': 'Contact directly',
      'form.title': 'Project inquiry',
      'form.name': 'Name or company',
      'form.type': 'Project type',
      'form.select': 'Select',
      'form.type.game': 'Game development',
      'form.type.ue5': 'UE5 project',
      'form.type.anim': '3D animation',
      'form.type.media': 'Media production',
      'form.type.other': 'Other',
      'form.budget': 'Budget',
      'form.optional': '(optional)',
      'form.budget.unsure': 'Not sure yet',
      'form.budget.1': 'Under NT$100k',
      'form.budget.2': 'NT$100k-300k',
      'form.budget.3': 'NT$300k-1M',
      'form.budget.4': 'Over NT$1M',
      'form.timeline': 'Timeline',
      'form.timeline.ph': 'e.g. launch in December 2026',
      'form.details': 'Project details',
      'form.details.ph': 'Goals, scope, platforms, reference style and so on',
      'form.links': 'Reference links',
      'form.submit': 'Send inquiry',
      'form.sending': 'Sending...',
      'form.required': 'Required',
      'form.err.name': 'Please enter your name or company.',
      'form.err.email': 'Please enter a valid email address.',
      'form.err.type': 'Please choose a project type.',
      'form.err.details': 'Please tell us a little about the project.',
      'form.err.summary': 'Some fields need attention. Please check the highlighted items.',
      'form.ok': 'Thanks, we\'ve received your inquiry and will reply soon.',
      'form.fail': 'Something went wrong. Please try again later, or email abstarhuides@gmail.com.',
      'form.mailto': 'We opened your email app with the details filled in. Please review and send it. If nothing opened, email abstarhuides@gmail.com directly.',
      'form.subject': 'Inquiry',
      'form.none': '(not provided)'
    }
  };

  /* each language's name written in that language, shown in the globe menu;
     "short" is the small label next to the globe on wide screens */
  var NAMES = {
    'zh-Hant': { name: '繁體中文', short: '中文' },
    'en': { name: 'English', short: 'EN' }
  };

  var DEFAULT = 'zh-Hant';
  var STORAGE_KEY = 'deepecho-lang';
  var LANGS = Object.keys(DICTS);
  var fallback = {};          /* original HTML text/attrs, captured once */
  var current = DEFAULT;

  /* map any code ("en-US", "zh-TW", "zh") onto a supported language */
  function match(code) {
    if (!code) return null;
    code = String(code).toLowerCase();
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].toLowerCase() === code) return LANGS[i];
    }
    var base = code.split('-')[0];
    for (var j = 0; j < LANGS.length; j++) {
      if (LANGS[j].toLowerCase().split('-')[0] === base) return LANGS[j];
    }
    return null;
  }

  function readStore() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeStore(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked */ }
  }

  function detect() {
    var fromUrl = null;
    try { fromUrl = match(new URLSearchParams(window.location.search).get('lang')); } catch (e) { /* old browser */ }
    if (fromUrl) { writeStore(fromUrl); return fromUrl; }

    var saved = match(readStore());
    if (saved) return saved;

    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      if (String(prefs[i]).toLowerCase().indexOf('zh') === 0) return 'zh-Hant';
    }
    return match('en') || DEFAULT;
  }

  function t(key, lang) {
    var d = DICTS[lang || current] || {};
    if (Object.prototype.hasOwnProperty.call(d, key)) return d[key];
    if (Object.prototype.hasOwnProperty.call(DICTS[DEFAULT], key)) return DICTS[DEFAULT][key];
    return fallback[key];
  }

  function parseAttrs(spec) {
    return spec.split(';').map(function (pair) {
      var i = pair.indexOf(':');
      return i > 0 ? [pair.slice(0, i).trim(), pair.slice(i + 1).trim()] : null;
    }).filter(Boolean);
  }

  function capture() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute('data-i18n');
      if (!(k in fallback)) fallback[k] = els[i].textContent;
    }
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrEls.length; j++) {
      parseAttrs(attrEls[j].getAttribute('data-i18n-attr')).forEach(function (p) {
        if (!(p[1] in fallback)) fallback[p[1]] = attrEls[j].getAttribute(p[0]);
      });
    }
  }

  function apply(lang) {
    lang = match(lang) || DEFAULT;
    current = lang;
    document.documentElement.setAttribute('lang', lang);

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var v = t(els[i].getAttribute('data-i18n'));
      if (v != null && els[i].textContent !== v) els[i].textContent = v;
    }
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrEls.length; j++) {
      var el = attrEls[j];
      parseAttrs(el.getAttribute('data-i18n-attr')).forEach(function (p) {
        var val = t(p[1]);
        if (val != null) el.setAttribute(p[0], val);
      });
    }

    var items = document.querySelectorAll('[data-lang]');
    for (var b = 0; b < items.length; b++) {
      items[b].setAttribute('aria-checked', String(items[b].getAttribute('data-lang') === lang));
    }
    var labels = document.querySelectorAll('[data-lang-current]');
    for (var c = 0; c < labels.length; c++) {
      labels[c].textContent = (NAMES[lang] && NAMES[lang].short) || lang;
      labels[c].setAttribute('lang', lang);
    }

    document.dispatchEvent(new CustomEvent('de:langchange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    lang = match(lang) || DEFAULT;
    writeStore(lang);
    apply(lang);
    /* keep a ?lang= parameter (if present) in sync so a reload keeps the choice */
    try {
      var url = new URL(window.location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', lang);
        window.history.replaceState(window.history.state, '', url);
      }
    } catch (e) { /* old browser or file:// quirk */ }
  }

  /* ------------------------------------------------------------------
     Globe language menu (menu button pattern):
     Enter / Space / ArrowDown open it on the current language, ArrowUp
     opens on the last item; arrows / Home / End move; Enter / Space pick;
     Esc closes and returns focus; Tab or a click outside closes.
     ------------------------------------------------------------------ */
  var CHECK_SVG = '<svg class="check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';

  function buildMenu(root) {
    var toggle = root.querySelector('.lang-toggle');
    var list = root.querySelector('.lang-list');
    if (!toggle || !list) return;

    list.innerHTML = '';
    LANGS.forEach(function (code) {
      var li = document.createElement('li');
      li.setAttribute('role', 'none');
      var item = document.createElement('button');
      item.type = 'button';
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('data-lang', code);
      item.setAttribute('lang', code);
      item.setAttribute('tabindex', '-1');
      var label = document.createElement('span');
      label.textContent = (NAMES[code] && NAMES[code].name) || code;
      item.appendChild(label);
      item.insertAdjacentHTML('beforeend', CHECK_SVG);
      li.appendChild(item);
      list.appendChild(li);
    });

    function items() { return Array.prototype.slice.call(list.querySelectorAll('[role="menuitemradio"]')); }
    function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

    function open(focusWhich) {
      list.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      var all = items();
      var target = focusWhich === 'last' ? all[all.length - 1]
        : (list.querySelector('[aria-checked="true"]') || all[0]);
      if (target) target.focus();
    }
    function close(returnFocus) {
      if (!isOpen()) return;
      list.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }
    function move(delta) {
      var all = items();
      var i = all.indexOf(document.activeElement);
      var next = all[(i + delta + all.length) % all.length];
      if (next) next.focus();
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) close(false); else open();
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); open('last'); }
    });

    list.addEventListener('click', function (e) {
      var item = e.target.closest('[data-lang]');
      if (!item) return;
      setLang(item.getAttribute('data-lang'));
      close(true);
    });

    root.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        e.stopPropagation();          /* do not also close the mobile nav */
        close(true);
      } else if (e.target.closest('.lang-list')) {
        if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
        else if (e.key === 'Home') { e.preventDefault(); items()[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); var all = items(); all[all.length - 1].focus(); }
        else if (e.key === 'Tab') { close(false); }
      }
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !root.contains(e.target)) close(false);
    });
  }

  capture();
  var menus = document.querySelectorAll('[data-lang-menu]');
  for (var m = 0; m < menus.length; m++) buildMenu(menus[m]);
  apply(detect());

  window.DeepEchoI18n = {
    dicts: DICTS,
    t: function (key) { return t(key); },
    setLang: setLang,
    get lang() { return current; }
  };
})();
