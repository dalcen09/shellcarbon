import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Building2, Lock, Star, FileSpreadsheet, FileText, ClipboardList, Phone, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { marketData, creditTypeTreemapData } from '../data/mockData';

type Plan = 'professional' | 'enterprise';

const DIAGNOSTIC_QUESTIONS = [
  { key: 'q1', opts: ['ESG 報告揭露', '供應鏈客戶要求', '國際客戶要求', '先理解日本碳權市場', '品牌形象 / CSR', '計劃買入 / 持有 / 移轉'] },
  { key: 'q2', opts: ['製造業', '貿易商', '金融 / 保險', '建設 / 不動產', '零售 / 品牌', '科技 / SaaS', '物流', '顧問 / ESG 服務', '其他'] },
  { key: 'q3', opts: ['先觀察不購買', '小額試行', '中型導入', '大型採購', '需要日本商社協助', '尚未確定'] },
  { key: 'q4', opts: ['價格', '流動性', 'ESG 故事性', '日本企業合作機會', '國際市場銜接', '對外報告說明', '未來商業拓展'] },
  { key: 'q5', opts: ['已有日本客戶', '已有日本供應商', '日本設有分公司 / 據點', '正在開發日本市場', '尚未有但希望建立', '不確定'] },
];

function getDiagnosticResult(answers: Record<number, string>) {
  const q1 = answers[0] || '';
  const q2 = answers[1] || '';
  const q4 = answers[3] || '';

  if (q2.includes('建設') || q2.includes('不動產')) {
    return { type: '節能設備', reason: '建設與不動產業最適合節能設備信用，與業務直接相關且市場需求活絡', difficulty: '中', suitable: '建設業、不動產業、HVAC 相關企業' };
  }
  if (q4.includes('ESG 故事性') || q2.includes('品牌')) {
    return { type: '森林吸收', reason: '高故事性 ESG 揭露首選，適合品牌導向企業', difficulty: '中高', suitable: '品牌型企業、零售業' };
  }
  if (q2.includes('製造') || q1.includes('供應鏈')) {
    return { type: '節能設備', reason: '製造業節能設備信用最直接對應 Scope 1/2，供應鏈揭露效果佳', difficulty: '中', suitable: '製造業、工廠型企業' };
  }
  return { type: '再生能源', reason: 'ESG 報告與供應鏈碳管理的首選，市場需求最強勁、流動性最高', difficulty: '低', suitable: 'ESG 導入初期企業、積極開拓日本市場的企業' };
}

type CreditTypeItem = typeof creditTypeTreemapData[number];

function CompanyPanel({ item, count, isEnterprise, onUpgrade, t }: {
  item: CreditTypeItem;
  count: number;
  isEnterprise: boolean;
  onUpgrade: () => void;
  t: (k: string) => string;
}) {
  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-3 text-white" style={{ backgroundColor: item.color }}>
        <div className="text-sm font-bold leading-tight">{item.name}</div>
        <div className="text-xs opacity-80 mt-0.5">¥{item.priceRange} / t</div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {item.companies.slice(0, count).map((co) => (
          <div key={co.name} className="p-3">
            <div className="flex items-start justify-between mb-1">
              <div className="text-xs font-semibold text-gray-800 leading-tight">{co.name}</div>
              <div className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-shell-green/10 text-shell-green ml-2 flex-shrink-0">{co.score}</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">{co.type} · {co.role}</div>
            <div className="flex flex-wrap gap-1 mb-1">
              {co.tags.map(tag => <span key={tag} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{tag}</span>)}
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">{co.reason}</div>
          </div>
        ))}
      </div>
      {!isEnterprise && (
        <div className="px-3 py-2.5 border-t border-gray-100 bg-gray-50">
          <button onClick={onUpgrade} className="w-full py-1.5 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark">
            {t('p5.infoPanelCta')}
          </button>
          <p className="text-xs text-gray-400 text-center mt-1">{t('p5.infoPanelUpgrade')}</p>
        </div>
      )}
      <div className="px-3 py-2 bg-amber-50 border-t border-amber-100 text-xs text-amber-700 leading-relaxed">
        {t('p5.infoPanelDisclaimer')}
      </div>
    </div>
  );
}

export default function Page5Market() {
  const { t } = useTranslation();
  const [plan, setPlan] = useState<Plan>('professional');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [diagStep, setDiagStep] = useState<number>(-1);
  const [diagAnswers, setDiagAnswers] = useState<Record<number, string>>({});

  const isEnterprise = plan === 'enterprise';
  const companyCount = isEnterprise ? 3 : 1;
  const diagResult = diagStep === 5 ? getDiagnosticResult(diagAnswers) : null;
  const diagResultItem = diagResult ? creditTypeTreemapData.find(ct => ct.name === diagResult.type) : null;

  function activityLabel(a: string) {
    const map: Record<string, string> = { '非常活絡': t('p5.activityLevels.veryActive'), '活絡': t('p5.activityLevels.active'), '穩定': t('p5.activityLevels.stable'), '低': t('p5.activityLevels.low') };
    return map[a] ?? a;
  }
  function demandLabel(d: string) {
    const map: Record<string, string> = { '高': t('p5.demandLevels.high'), '中': t('p5.demandLevels.medium'), '低': t('p5.demandLevels.low') };
    return map[d] ?? d;
  }
  function creditTypeLabel(type: string) {
    const map: Record<string, string> = { '再生能源': t('common.creditTypes.renewable'), '節能設備': t('common.creditTypes.efficiency'), '森林吸收': t('common.creditTypes.forest'), '其他': t('common.creditTypes.other') };
    return map[type] ?? type;
  }
  const barData = creditTypeTreemapData.map(ct => ({
    name: ct.name,
    size: ct.size,
    cumulativeSize: ct.cumulativeSize,
    color: ct.color,
    activity: ct.activity,
    companies: ct.companies,
  }));

  const activeItem = selectedType
    ? creditTypeTreemapData.find(ct => ct.name === selectedType) ?? creditTypeTreemapData[0]
    : creditTypeTreemapData[0];

  function handleDiagAnswer(optIdx: number) {
    const opt = DIAGNOSTIC_QUESTIONS[diagStep].opts[optIdx];
    const next = { ...diagAnswers, [diagStep]: opt };
    setDiagAnswers(next);
    if (diagStep < 4) setDiagStep(diagStep + 1);
    else setDiagStep(5);
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('p5.title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{isEnterprise ? t('p5.subtitleEnt') : t('p5.subtitlePro')}</p>
        </div>
        <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
          <button onClick={() => setPlan('professional')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isEnterprise ? 'bg-white text-shell-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t('common.plan.professional')}
          </button>
          <button onClick={() => setPlan('enterprise')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${isEnterprise ? 'bg-white text-shell-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <Star size={12} className="text-amber-500" /> {t('common.plan.enterprise')}
          </button>
        </div>
      </div>

      {/* Early Access Banner */}
      <div className="bg-gradient-to-r from-shell-green to-shell-teal text-white rounded-xl p-4 flex items-center gap-4">
        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap">{t('p5.earlyAccessBadge')}</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{t('p5.earlyAccessMsg')}</div>
          <div className="text-xs text-white/80 mt-0.5">{t('p5.earlyAccessSub')}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="bg-white text-shell-green text-xs font-semibold px-3 py-2 rounded-lg hover:bg-white/90 whitespace-nowrap">{t('p5.earlyAccessCta')}</button>
          <button className="bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-white/30 whitespace-nowrap">{t('p5.earlyAccessCta2')}</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={`grid gap-4 ${isEnterprise ? 'grid-cols-2 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-5'}`}>
        {[
          { label: t('p5.latestPrice'), value: `¥${marketData.latestPrice.toLocaleString()}`, sub: t('common.units.jpyPerT'), icon: TrendingUp, color: 'text-shell-green' },
          { label: t('p5.monthlyVolume'), value: `${(marketData.monthlyVolume / 1000).toFixed(1)}k`, sub: 't-CO₂', icon: Activity, color: 'text-blue-600' },
          { label: t('p5.monthlyValue'), value: `¥${(marketData.monthlyValue / 1000000).toFixed(0)}M`, sub: 'JPY', icon: TrendingUp, color: 'text-purple-600' },
          { label: t('p5.mainCreditType'), value: creditTypeLabel(marketData.mainCreditType), sub: t('p5.mostActive'), icon: Activity, color: 'text-emerald-600' },
          { label: t('p5.activityLevel'), value: activityLabel(marketData.activityLevel), sub: t('p5.overallEval'), icon: Activity, color: 'text-amber-600' },
          ...(isEnterprise ? [{ label: t('p5.otcUpdated'), value: '3', sub: '', icon: Building2, color: 'text-red-600' }] : []),
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-400 mb-1">{card.label}</div>
            <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-shell-green/5 border border-shell-green/15 rounded-lg px-4 py-3 text-xs text-gray-600 leading-relaxed">{t('p5.marketNote')}</div>

      {/* Monthly Bar Chart + Company Cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">{t('p5.treemapTitle')} · {t('p5.treemapMonthly')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Bar chart */}
          <div className="md:col-span-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-3">{t('p5.treemapHint')}</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart layout="vertical" data={barData} barSize={22} margin={{ left: 8, right: 36, top: 4, bottom: 4 }}>
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={62} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`${Number(v).toLocaleString()} t-CO₂`, '']} />
                <Bar dataKey="size" radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
                  onClick={(d: any) => setSelectedType(selectedType === d.name ? null : d.name)}>
                  {barData.map((d) => (
                    <Cell key={d.name} fill={d.color} opacity={selectedType && selectedType !== d.name ? 0.45 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Company cards panel */}
          <CompanyPanel item={activeItem} count={companyCount} isEnterprise={isEnterprise} onUpgrade={() => setPlan('enterprise')} t={t} />
        </div>
      </div>

      {/* Enterprise: Historical Cumulative Bar Chart + 3 Company Cards */}
      {isEnterprise && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">{t('p5.treemapTitle')} · {t('p5.treemapCumulative')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart layout="vertical" data={barData} barSize={22} margin={{ left: 8, right: 36, top: 4, bottom: 4 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={62} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: any) => [`${Number(v).toLocaleString()} t-CO₂`, '']} />
                  <Bar dataKey="cumulativeSize" radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }}
                    onClick={(d: any) => setSelectedType(selectedType === d.name ? null : d.name)}>
                    {barData.map((d) => (
                      <Cell key={d.name} fill={d.color} opacity={selectedType && selectedType !== d.name ? 0.45 : 1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <CompanyPanel item={activeItem} count={3} isEnterprise={true} onUpgrade={() => {}} t={t} />
          </div>
        </div>
      )}

      {/* Business tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ titleKey: 'p5.tip1Title', descKey: 'p5.tip1Desc' }, { titleKey: 'p5.tip2Title', descKey: 'p5.tip2Desc' }, { titleKey: 'p5.tip3Title', descKey: 'p5.tip3Desc' }].map((item) => (
          <div key={item.titleKey} className="bg-shell-green/5 border border-shell-green/15 rounded-xl p-4">
            <div className="text-sm font-semibold text-shell-green-dark mb-1">{t(item.titleKey)}</div>
            <div className="text-xs text-gray-600 leading-relaxed">{t(item.descKey)}</div>
          </div>
        ))}
      </div>

      {/* Enterprise sections */}
      {isEnterprise ? (
        <div className="space-y-5">
          {/* Industry analysis */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100"><h2 className="text-sm font-semibold text-gray-700">{t('p5.industryTitle')}</h2></div>
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-xs text-gray-500">
                <th className="text-left px-4 py-2.5 font-medium">{t('p5.colIndustry')}</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p5.colVolumeLvl')}</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p5.colCreditType')}</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p5.colActivityLvl')}</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p5.colTaiwanMeaning')}</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {marketData.industryAnalysis.map((row) => (
                  <tr key={row.industry} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-800 text-xs">{row.industry}</td>
                    <td className="px-4 py-2.5 text-xs"><span className={`px-2 py-0.5 rounded-full font-medium ${row.volume === '高' ? 'bg-green-100 text-green-700' : row.volume === '中高' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{demandLabel(row.volume === '中高' ? '中' : row.volume)}</span></td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{row.creditType}</td>
                    <td className="px-4 py-2.5 text-xs"><span className={`px-2 py-0.5 rounded-full font-medium ${row.activity === '高' || row.activity === '中高' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{row.activity}</span></td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{row.taiwanMeaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5-Question Diagnostic Tool */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">{t('p5.diagTitle')}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t('p5.diagDesc')}</p>
              </div>
              {diagStep >= 0 && (
                <button onClick={() => { setDiagStep(-1); setDiagAnswers({}); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                  <RotateCcw size={12} /> {t('p5.diagRestart')}
                </button>
              )}
            </div>

            {diagStep === -1 && (
              <div className="mt-4 flex items-center gap-4">
                <button onClick={() => setDiagStep(0)} className="flex items-center gap-2 px-5 py-2.5 bg-shell-green text-white text-sm font-semibold rounded-lg hover:bg-shell-green-dark">
                  {t('p5.diagStart')} <ChevronRight size={14} />
                </button>
                <p className="text-xs text-gray-400">5 題，約 1 分鐘</p>
              </div>
            )}

            {diagStep >= 0 && diagStep < 5 && (
              <div className="mt-4">
                {/* Progress */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i < diagStep ? 'bg-shell-green' : i === diagStep ? 'bg-shell-green' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">Q{diagStep + 1} / 5</span>
                </div>

                <p className="text-sm font-semibold text-gray-800 mb-3">{t(`p5.diagQ${diagStep + 1}`)}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DIAGNOSTIC_QUESTIONS[diagStep].opts.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleDiagAnswer(DIAGNOSTIC_QUESTIONS[diagStep].opts.indexOf(opt))}
                      className={`px-3 py-2.5 rounded-lg border text-xs text-left transition-all hover:border-shell-green/50 ${diagAnswers[diagStep] === opt ? 'border-shell-green bg-shell-green/5 text-shell-green font-semibold' : 'border-gray-200 text-gray-700'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {diagStep > 0 && (
                  <button onClick={() => setDiagStep(diagStep - 1)} className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                    <ChevronLeft size={12} /> {t('p5.diagPrev')}
                  </button>
                )}
              </div>
            )}

            {diagStep === 5 && diagResult && diagResultItem && (
              <div className="mt-4 space-y-4">
                {/* Result header */}
                <div className="rounded-xl p-4 text-white" style={{ backgroundColor: diagResultItem.color }}>
                  <div className="text-xs opacity-70">{t('p5.diagResult')}</div>
                  <div className="text-lg font-bold mt-0.5">{diagResult.type}</div>
                  <div className="text-xs opacity-80 mt-1 leading-relaxed">{diagResult.reason}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-400 mb-0.5">{t('p5.diagDifficulty')}</div>
                    <div className="font-semibold text-gray-800">{diagResult.difficulty}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-400 mb-0.5">{t('p5.diagSuitable')}</div>
                    <div className="font-semibold text-gray-800 leading-snug">{diagResult.suitable}</div>
                  </div>
                </div>

                {/* Top 3 companies */}
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-2">{t('p5.diagTop3')}</div>
                  <div className="space-y-2">
                    {diagResultItem.companies.map((co) => (
                      <div key={co.name} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-800">{co.name}</span>
                            <span className="text-xs bg-shell-green/10 text-shell-green font-bold px-1.5 py-0.5 rounded-full">{co.score}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{co.type} · {co.role}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {co.tags.map(tag => <span key={tag} className="bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs">{tag}</span>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-xs text-amber-700 leading-relaxed">
                  {t('p5.infoPanelDisclaimer')}
                </div>

                <button className="w-full py-2.5 bg-shell-green text-white text-sm font-semibold rounded-lg hover:bg-shell-green-dark flex items-center justify-center gap-2">
                  <Phone size={14} /> {t('p5.diagCta')}
                </button>
              </div>
            )}
          </div>

          {/* Market Report Export */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p5.exportTitle')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FileSpreadsheet, label: t('p5.exportExcel'), desc: t('p5.exportExcelDesc'), color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
                { icon: FileText, label: t('p5.exportPdf'), desc: t('p5.exportPdfDesc'), color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
                { icon: ClipboardList, label: t('p5.exportBrief'), desc: t('p5.exportBriefDesc'), color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
                { icon: Phone, label: t('p5.exportContact'), desc: t('p5.exportContactDesc'), color: 'text-shell-green', bg: 'bg-shell-green/5 border-shell-green/20' },
              ].map((item) => (
                <button key={item.label} className={`flex items-start gap-3 p-4 rounded-xl border text-left hover:shadow-sm transition-all ${item.bg}`}>
                  <item.icon size={18} className={`flex-shrink-0 mt-0.5 ${item.color}`} />
                  <div>
                    <div className={`text-sm font-semibold ${item.color}`}>{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA bar */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark"><Phone size={13} /> {t('p5.ctaConsult')}</button>
            <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50"><Star size={13} /> {t('p5.ctaTrial')}</button>
            <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50"><FileText size={13} /> {t('p5.ctaSample')}</button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <Lock size={32} className="text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-600 mb-1">{t('p5.lockedTitle')}</h3>
          <p className="text-sm text-gray-400 mb-4">{t('p5.lockedDesc')}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setPlan('enterprise')} className="px-5 py-2 bg-shell-green text-white rounded-lg text-sm hover:bg-shell-green-dark">{t('p5.previewBtn')}</button>
            <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-white">{t('common.buttons.upgrade')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
