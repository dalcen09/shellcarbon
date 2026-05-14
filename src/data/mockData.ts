// Mock data for ShellCarbon J-Credit Platform Demo

export const company = {
  nameCN: '台灣綠能科技股份有限公司',
  nameEN: 'Taiwan Green Energy Technology Co., Ltd.',
  country: '台灣',
  city: '台北市',
  industry: '製造業 / 電子元件',
  taxId: '12345678',
  contact: '陳志遠 副總經理',
  department: '永續發展部',
};

export const carbonAssets = {
  totalHeld: 4820,
  available: 3150,
  totalValue: 28920000,
  transferred: 890,
  declared: 780,
  creditTypes: [
    { type: '再生能源', amount: 2100, color: '#22a070' },
    { type: '節能設備', amount: 1560, color: '#0f766e' },
    { type: '森林吸收', amount: 820, color: '#15803d' },
    { type: '其他', amount: 340, color: '#6b7280' },
  ],
};

export const transactions = [
  {
    id: 'TXN-2024-0892',
    date: '2024-11-15',
    type: '購入',
    creditType: '再生能源',
    quantity: 500,
    unitPrice: 6200,
    amount: 3100000,
    status: '完成',
    counterparty: 'Japan Carbon Exchange',
    projectSource: 'Solar Farm Hokkaido 2023',
    esgUsable: true,
    docStatus: '齊全',
  },
  {
    id: 'TXN-2024-0781',
    date: '2024-10-03',
    type: '宣告',
    creditType: '節能設備',
    quantity: 320,
    unitPrice: 5800,
    amount: 1856000,
    status: '完成',
    counterparty: '內部使用',
    projectSource: 'Energy Efficiency Osaka',
    esgUsable: true,
    docStatus: '齊全',
  },
  {
    id: 'TXN-2024-0654',
    date: '2024-08-22',
    type: '轉讓',
    creditType: '森林吸收',
    quantity: 200,
    unitPrice: 7100,
    amount: 1420000,
    status: '完成',
    counterparty: '供應鏈合作方 A',
    projectSource: 'Niigata Forest Project',
    esgUsable: false,
    docStatus: '部分缺件',
  },
  {
    id: 'TXN-2024-0532',
    date: '2024-07-10',
    type: '購入',
    creditType: '再生能源',
    quantity: 800,
    unitPrice: 5950,
    amount: 4760000,
    status: '完成',
    counterparty: 'Mitsui Carbon Trading',
    projectSource: 'Wind Power Aomori 2022',
    esgUsable: true,
    docStatus: '齊全',
  },
  {
    id: 'TXN-2024-0401',
    date: '2024-05-28',
    type: '宣告',
    creditType: '節能設備',
    quantity: 460,
    unitPrice: 5500,
    amount: 2530000,
    status: '完成',
    counterparty: '內部使用',
    projectSource: 'Factory Efficiency Nagoya',
    esgUsable: true,
    docStatus: '齊全',
  },
];

export const applications = [
  {
    id: 'APP-2024-1021',
    type: '購入',
    creditType: '再生能源',
    quantity: 600,
    status: '日本窗口確認',
    stepIndex: 3,
    submittedAt: '2024-12-01',
  },
  {
    id: 'APP-2024-0988',
    type: '宣告',
    creditType: '節能設備',
    quantity: 280,
    status: '文件確認',
    stepIndex: 4,
    submittedAt: '2024-11-25',
  },
];

export const progressSteps = [
  '企業提出申請',
  'ShellCarbon 初步確認',
  '日本窗口確認',
  '報價/條件確認',
  '文件確認',
  '完成登錄',
];

export const scopeData = {
  year: 2023,
  scope1: 12450,
  scope2: 8320,
  total: 20770,
  verificationStatus: '第三方查證完成',
  completeness: 92,
  documents: [
    { name: 'Scope 1 排放明細', status: '完成' },
    { name: 'Scope 2 用電資料', status: '完成' },
    { name: 'ISO 14064-1 報告', status: '完成' },
    { name: '第三方查證聲明', status: '完成' },
    { name: '內部核准紀錄', status: '審核中' },
  ],
  jcredit: {
    dataCompleteness: '高',
    plannableAmount: 3200,
    recommendedUse: 'ESG 報告宣告、供應鏈揭露',
    recommendedType: '再生能源、節能設備',
    canProceed: true,
    steps: ['資料匯入', '文件確認', '使用目的確認', '日本市場窗口確認', '購入/宣告流程建立'],
    currentStep: 2,
  },
};

export const esgDocuments = {
  professional: [
    { id: 'esg-para', label: 'ESG 報告段落', icon: '📄' },
    { id: 'supply-chain', label: '供應鏈揭露文字', icon: '🔗' },
    { id: 'credit-summary', label: '碳信用使用摘要', icon: '📊' },
    { id: 'brief-summary', label: '內部簡報摘要', icon: '📋' },
  ],
  enterprise: [
    { id: 'tx-proof', label: '交易證明清單', icon: '✅' },
    { id: 'cancel-proof', label: '註銷/宣告證明清單', icon: '🔖' },
    { id: 'credit-source', label: '信用來源資料', icon: '🗂️' },
    { id: 'purpose-doc', label: '用途說明文件', icon: '📝' },
    { id: 'internal-approval', label: '內部核准紀錄', icon: '🏛️' },
    { id: 'esg-chapter', label: 'ESG 報告對應章節', icon: '📖' },
    { id: 'advisor-confirm', label: '第三方顧問確認表', icon: '🤝' },
    { id: 'risk-note', label: '風險註記表', icon: '⚠️' },
  ],
  drafts: {
    'esg-para': `【ESG 報告段落草稿】

本公司於 2023 年度完成碳盤查，Scope 1 排放量為 12,450 t-CO₂，Scope 2 排放量為 8,320 t-CO₂，合計 20,770 t-CO₂。

為實踐氣候承諾，本公司透過 ShellCarbon 平台購入日本 J-Credit 認證碳信用額度，共計 4,820 t-CO₂，涵蓋再生能源、節能設備及森林吸收等類型，並依 J-Credit 制度完成宣告使用。

本公司將持續優化排放管理，並透過高品質碳信用採購強化 ESG 揭露品質。

⚠️ 本草稿為系統自動產出，正式使用前請依法務、會計、ESG 顧問與揭露規範確認。`,
    'supply-chain': `【供應鏈揭露文字草稿】

台灣綠能科技股份有限公司已完成 2023 年度碳盤查，並持有日本 J-Credit 認證碳信用額度。

本公司可提供供應鏈夥伴以下碳資產相關文件：
• J-Credit 持有證明
• 宣告使用明細
• ESG 段落參考文字

如需進一步合作，請聯繫永續發展部。

⚠️ 本草稿為系統自動產出，正式使用前請依揭露規範確認。`,
  } as Record<string, string>,
};

export const marketData = {
  latestPrice: 6380,
  monthlyVolume: 125400,
  monthlyValue: 798000000,
  mainCreditType: '再生能源',
  activityLevel: '活絡',
  priceHistory: [
    { month: '2024/01', price: 5200, volume: 98000 },
    { month: '2024/02', price: 5450, volume: 102000 },
    { month: '2024/03', price: 5800, volume: 115000 },
    { month: '2024/04', price: 5650, volume: 108000 },
    { month: '2024/05', price: 6100, volume: 132000 },
    { month: '2024/06', price: 6250, volume: 128000 },
    { month: '2024/07', price: 5950, volume: 119000 },
    { month: '2024/08', price: 6100, volume: 124000 },
    { month: '2024/09', price: 6350, volume: 138000 },
    { month: '2024/10', price: 6200, volume: 121000 },
    { month: '2024/11', price: 6380, volume: 125400 },
    { month: '2024/12', price: 6480, volume: 131000 },
  ],
  creditTypeComparison: [
    { type: '再生能源', priceRange: '5,800–6,800', activity: '非常活絡', suitableFor: 'ESG 報告、供應鏈揭露', color: '#22a070' },
    { type: '節能設備', priceRange: '4,500–5,800', activity: '活絡', suitableFor: '企業宣告、年度配置', color: '#0f766e' },
    { type: '森林吸收', priceRange: '6,000–7,500', activity: '穩定', suitableFor: '高品質 ESG 揭露', color: '#15803d' },
    { type: '其他', priceRange: '3,500–5,000', activity: '低', suitableFor: '一般碳中和聲明', color: '#6b7280' },
  ],
  top10Rankings: [
    { rank: 1,  name: 'Toyota Motor',    industry: '汽車',       volume: 18200, creditType: '再生能源',       direction: '購入',       lastTx: '2024/12' },
    { rank: 2,  name: 'Marubeni',        industry: '商社',       volume: 15600, creditType: '節能設備',       direction: '購入 / 轉讓', lastTx: '2024/12' },
    { rank: 3,  name: 'Mizuho Bank',     industry: '金融',       volume: 12800, creditType: '再生能源',       direction: '購入',       lastTx: '2024/11' },
    { rank: 4,  name: 'Mazda',           industry: '汽車',       volume: 10400, creditType: '再生能源',       direction: '購入',       lastTx: '2024/11' },
    { rank: 5,  name: 'Mitsubishi Corp.', industry: '商社',      volume: 9700,  creditType: '森林吸收',       direction: '購入 / 轉讓', lastTx: '2024/10' },
    { rank: 6,  name: 'ENEOS',           industry: '能源',       volume: 8950,  creditType: '節能設備',       direction: '購入',       lastTx: '2024/10' },
    { rank: 7,  name: 'Sumitomo Corp.',  industry: '商社',       volume: 8200,  creditType: '再生能源',       direction: '轉讓',       lastTx: '2024/09' },
    { rank: 8,  name: 'Hitachi',         industry: '製造 / 電機', volume: 7600, creditType: '節能設備',       direction: '購入',       lastTx: '2024/09' },
    { rank: 9,  name: 'Daikin',          industry: '空調設備',   volume: 6900,  creditType: '節能設備',       direction: '購入',       lastTx: '2024/08' },
    { rank: 10, name: 'Panasonic',       industry: '電機',       volume: 6500,  creditType: '再生能源',       direction: '購入',       lastTx: '2024/08' },
  ],
  potentialPartners: [
    { name: 'Marubeni',        industry: '商社',   demand: '信用轉讓、企業客戶媒合',  reason: '商社具備碳交易與海外網絡',         action: '建議建立窗口' },
    { name: 'Mizuho',          industry: '金融',   demand: 'ESG 金融、碳中和方案',    reason: '可連結企業客戶與永續金融',         action: '列為金融合作對象' },
    { name: 'Mazda',           industry: '汽車',   demand: '供應鏈碳揭露',            reason: '汽車業重視 Scope 3 與供應鏈 ESG', action: '適合供應鏈切入' },
    { name: 'Daikin',          industry: '空調設備', demand: '節能、建築設備減碳',    reason: '與 ShellCarbon HVAC 概念有連結',   action: '適合技術合作觀察' },
    { name: 'Mitsubishi Corp.', industry: '商社',  demand: '信用購入、轉讓、海外資產', reason: '可作為日本市場交易橋樑',          action: '建議長期追蹤' },
  ],
  industryAnalysis: [
    { industry: '商社',       volume: '高',  creditType: '再生能源 / 森林吸收', activity: '高',  taiwanMeaning: '可作為交易與轉讓窗口' },
    { industry: '汽車',       volume: '高',  creditType: '再生能源 / 節能設備', activity: '高',  taiwanMeaning: '供應鏈 ESG 要求強' },
    { industry: '金融',       volume: '中高', creditType: '再生能源',            activity: '中高', taiwanMeaning: '可連結 ESG 金融與客戶資源' },
    { industry: '製造',       volume: '中',  creditType: '節能設備',             activity: '中',  taiwanMeaning: '適合供應鏈揭露' },
    { industry: '建築 / 空調', volume: '中', creditType: '節能設備',             activity: '中',  taiwanMeaning: '與 ShellCarbon 硬體應用有關' },
  ],
  otcData: [
    { type: '再生能源', otcPrice: '6,500–7,200', demand: '高', note: '商社主導大宗場外需求' },
    { type: '節能設備', otcPrice: '5,200–6,000', demand: '中', note: '製造業直接採購' },
    { type: '森林吸收', otcPrice: '7,000–8,500', demand: '低', note: '特定 ESG 高品質需求' },
  ],
};

export const creditTypeTreemapData = [
  {
    name: '再生能源',
    size: 58000,
    cumulativeSize: 620000,
    priceRange: '5,800–6,800',
    activity: '非常活絡',
    esgDir: 'ESG 報告、供應鏈揭露',
    note: '需求最強勁的信用類型，適合 ESG 初次導入企業',
    color: '#22a070',
    companies: [
      { name: '三井物產株式會社', type: '商社', role: '市場參加者', creditTypes: 'J-Credit / GX Credits', tags: ['交易窗口型', '產業標竿型'], score: 88, reason: '適合作為海外企業理解日本碳權市場、交易窗口與日本市場進入路徑的參考對象' },
      { name: 'Toyota Motor', type: '汽車製造', role: '市場參加者', creditTypes: 'J-Credit', tags: ['大量採購型', '供應鏈 ESG'], score: 84, reason: '汽車業最大碳信用購入企業，供應鏈 ESG 要求強' },
      { name: 'Mizuho Bank', type: '金融', role: '市場參加者', creditTypes: 'J-Credit', tags: ['ESG 金融型'], score: 80, reason: '可連結企業客戶與永續金融方案，適合 ESG 揭露需求企業' },
    ],
  },
  {
    name: '節能設備',
    size: 34000,
    cumulativeSize: 310000,
    priceRange: '4,500–5,800',
    activity: '活絡',
    esgDir: '年度宣告、企業碳中和',
    note: '製造業與工廠型企業首選，價格相對穩定',
    color: '#0f766e',
    companies: [
      { name: 'Daikin Industries', type: '空調設備', role: '市場參加者', creditTypes: 'J-Credit', tags: ['設備節能型', '技術合作型'], score: 82, reason: '與 ShellCarbon 硬體節能應用概念高度相關' },
      { name: 'Hitachi', type: '製造/電機', role: '市場參加者', creditTypes: 'J-Credit', tags: ['大型製造型'], score: 78, reason: '節能設備大量採購，供應鏈碳揭露要求強' },
      { name: 'ENEOS', type: '能源', role: '市場參加者', creditTypes: 'J-Credit', tags: ['能源轉型型'], score: 75, reason: '能源業積極採購節能設備信用，轉型需求強' },
    ],
  },
  {
    name: '森林吸收',
    size: 18000,
    cumulativeSize: 165000,
    priceRange: '6,000–7,500',
    activity: '穩定',
    esgDir: '高品質 ESG 揭露',
    note: '高單價、高 ESG 故事性，適合品牌型企業',
    color: '#15803d',
    companies: [
      { name: 'Mitsubishi Corp.', type: '商社', role: '市場參加者', creditTypes: 'J-Credit / 森林吸收', tags: ['高品質 ESG 型', '交易窗口型'], score: 85, reason: '商社可作為日本市場交易橋樑，重視高品質 ESG 揭露' },
      { name: 'Sumitomo Corp.', type: '商社', role: '市場參加者', creditTypes: 'J-Credit', tags: ['轉讓型'], score: 79, reason: '森林吸收信用轉讓窗口，具備國際市場連結' },
      { name: 'Panasonic', type: '電機', role: '市場參加者', creditTypes: 'J-Credit', tags: ['品牌 ESG 型'], score: 74, reason: '品牌型企業重視高故事性 ESG 揭露，採購高品質信用' },
    ],
  },
  {
    name: '再生能源熱/生質能',
    size: 9000,
    cumulativeSize: 72000,
    priceRange: '5,000–6,500',
    activity: '穩定',
    esgDir: '建築節能、熱能減碳',
    note: '與 HVAC 及建築設備應用密切相關',
    color: '#065f46',
    companies: [
      { name: 'Marubeni', type: '商社', role: '市場參加者', creditTypes: 'J-Credit / 再生能源熱', tags: ['能源轉型型', '交易窗口型'], score: 80, reason: '商社具備碳交易與海外網絡，積極佈局再生能源熱' },
      { name: 'ENEOS', type: '能源', role: '市場參加者', creditTypes: 'J-Credit', tags: ['熱能減碳型'], score: 76, reason: '能源業積極採購木質生質能相關信用' },
      { name: 'Daikin Industries', type: '空調設備', role: '市場參加者', creditTypes: 'J-Credit', tags: ['建築節能型'], score: 72, reason: '與 HVAC 建築設備節能應用高度相關' },
    ],
  },
  {
    name: '其他',
    size: 6400,
    cumulativeSize: 48000,
    priceRange: '3,500–5,000',
    activity: '低',
    esgDir: '一般碳中和補充',
    note: '特定需求，建議先評估其他信用類型',
    color: '#6b7280',
    companies: [
      { name: 'Mazda', type: '汽車', role: '市場參加者', creditTypes: 'J-Credit', tags: ['供應鏈揭露型'], score: 70, reason: '汽車業供應鏈碳揭露需求，採購補充性碳信用' },
      { name: 'Hitachi', type: '製造/電機', role: '市場參加者', creditTypes: 'J-Credit', tags: ['一般碳中和型'], score: 65, reason: '製造業補充性碳中和需求' },
      { name: 'Panasonic', type: '電機', role: '市場參加者', creditTypes: 'J-Credit', tags: ['一般碳中和型'], score: 62, reason: '電機業一般碳中和補充採購' },
    ],
  },
];

export const engineData = {
  totalCO2Captured: 18420,
  totalMineralMaterial: 892,
  avgEfficiency: 94.2,
  connectedSites: 47,
  dataCompleteness: 88,
  regions: [
    { name: 'Tokyo', sites: 14, captured: 5820, efficiency: 95.1 },
    { name: 'Taipei', sites: 12, captured: 4930, efficiency: 94.8 },
    { name: 'Osaka', sites: 9, captured: 3710, efficiency: 93.5 },
    { name: 'Yokohama', sites: 7, captured: 2480, efficiency: 92.9 },
    { name: 'Nagoya', sites: 5, captured: 1480, efficiency: 91.3 },
  ],
  buildings: [
    { name: 'Tokyo HQ Tower', region: 'Tokyo', captured: 1820, efficiency: 96.2, status: '運行中' },
    { name: 'Taipei City Office', region: 'Taipei', captured: 1650, efficiency: 95.8, status: '運行中' },
    { name: 'Osaka Factory A', region: 'Osaka', captured: 1420, efficiency: 94.1, status: '運行中' },
    { name: 'Yokohama Port Site', region: 'Yokohama', captured: 980, efficiency: 93.7, status: '運行中' },
    { name: 'Nagoya Manufacturing', region: 'Nagoya', captured: 870, efficiency: 92.4, status: '測試中' },
    { name: 'Tokyo Data Center', region: 'Tokyo', captured: 820, efficiency: 95.5, status: '運行中' },
    { name: 'Taipei Industrial Park', region: 'Taipei', captured: 780, efficiency: 94.2, status: '運行中' },
  ],
};
