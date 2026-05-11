import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, Building2, Lock, Star, Phone } from 'lucide-react';
import { marketData } from '../data/mockData';

type Plan = 'professional' | 'enterprise';

export default function Page5Market() {
  const { t } = useTranslation();
  const [plan, setPlan] = useState<Plan>('professional');
  const [chartType, setChartType] = useState<'price' | 'volume'>('price');

  const isEnterprise = plan === 'enterprise';

  function activityLabel(a: string) {
    const map: Record<string, string> = {
      '非常活絡': t('p5.activityLevels.veryActive'),
      '活絡': t('p5.activityLevels.active'),
      '穩定': t('p5.activityLevels.stable'),
      '低': t('p5.activityLevels.low'),
    };
    return map[a] ?? a;
  }

  function demandLabel(d: string) {
    const map: Record<string, string> = {
      '高': t('p5.demandLevels.high'),
      '中': t('p5.demandLevels.medium'),
      '低': t('p5.demandLevels.low'),
    };
    return map[d] ?? d;
  }

  function creditTypeLabel(type: string) {
    const map: Record<string, string> = {
      '再生能源': t('common.creditTypes.renewable'),
      '節能設備': t('common.creditTypes.efficiency'),
      '森林吸收': t('common.creditTypes.forest'),
      '其他': t('common.creditTypes.other'),
    };
    return map[type] ?? type;
  }

  const opportunities = [
    { titleKey: 'p5.opp1Title', descKey: 'p5.opp1Desc', icon: '🏢', color: 'bg-green-50 border-green-200' },
    { titleKey: 'p5.opp2Title', descKey: 'p5.opp2Desc', icon: '🏭', color: 'bg-blue-50 border-blue-200' },
    { titleKey: 'p5.opp3Title', descKey: 'p5.opp3Desc', icon: '💼', color: 'bg-purple-50 border-purple-200' },
    { titleKey: 'p5.opp4Title', descKey: 'p5.opp4Desc', icon: '📈', color: 'bg-amber-50 border-amber-200' },
    { titleKey: 'p5.opp5Title', descKey: 'p5.opp5Desc', icon: '🌱', color: 'bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('p5.title')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEnterprise ? t('p5.subtitleEnt') : t('p5.subtitlePro')}
          </p>
        </div>

        {/* Plan toggle */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setPlan('professional')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !isEnterprise ? 'bg-white text-shell-green shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('common.plan.professional')}
          </button>
          <button
            onClick={() => setPlan('enterprise')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              isEnterprise ? 'bg-white text-shell-green shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star size={12} className="text-amber-500" /> {t('common.plan.enterprise')}
          </button>
        </div>
      </div>

      {/* Early Access Banner */}
      <div className="bg-gradient-to-r from-shell-green to-shell-teal text-white rounded-xl p-4 flex items-center gap-4">
        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm font-bold">{t('p5.earlyAccessBadge')}</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{t('p5.earlyAccessMsg')}</div>
          <div className="text-xs text-white/80 mt-0.5">{t('p5.earlyAccessSub')}</div>
        </div>
        <button className="flex-shrink-0 bg-white text-shell-green text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
          {t('p5.earlyAccessCta')}
        </button>
      </div>

      {/* Market Overview Cards */}
      <div className={`grid gap-4 ${isEnterprise ? 'grid-cols-6' : 'grid-cols-5'}`}>
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

      {/* Charts */}
      <div className="grid grid-cols-5 gap-5">
        {/* Price / Volume trend */}
        <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">{t('p5.trendTitle')}</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setChartType('price')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${chartType === 'price' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
              >
                {t('p5.priceTab')}
              </button>
              <button
                onClick={() => setChartType('volume')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${chartType === 'volume' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
              >
                {t('p5.volumeTab')}
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            {chartType === 'price' ? (
              <LineChart data={marketData.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={1} />
                <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} tickFormatter={(v) => `¥${(v / 1000).toFixed(1)}k`} />
                <Tooltip formatter={(v) => [`¥${Number(v).toLocaleString()}`, 'JPY/t']} />
                <Line type="monotone" dataKey="price" stroke="#1a7f5a" strokeWidth={2} dot={false} />
              </LineChart>
            ) : (
              <BarChart data={marketData.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={1} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t`, t('p5.volumeTab')]} />
                <Bar dataKey="volume" fill="#1a7f5a" radius={[3, 3, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Credit type comparison */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p5.creditCompareTitle')}</h2>
          <div className="space-y-3">
            {marketData.creditTypeComparison.map((ct) => (
              <div key={ct.type} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ct.color }} />
                  <span className="text-sm font-semibold text-gray-800">{creditTypeLabel(ct.type)}</span>
                  <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    ct.activity === '非常活絡' ? 'bg-green-100 text-green-700' :
                    ct.activity === '活絡' ? 'bg-emerald-100 text-emerald-700' :
                    ct.activity === '穩定' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{activityLabel(ct.activity)}</span>
                </div>
                <div className="text-xs text-gray-500">¥{ct.priceRange} / t-CO₂</div>
                <div className="text-xs text-gray-400 mt-0.5">{ct.suitableFor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business tips (Professional) */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { titleKey: 'p5.tip1Title', descKey: 'p5.tip1Desc' },
          { titleKey: 'p5.tip2Title', descKey: 'p5.tip2Desc' },
          { titleKey: 'p5.tip3Title', descKey: 'p5.tip3Desc' },
        ].map((item) => (
          <div key={item.titleKey} className="bg-shell-green/5 border border-shell-green/15 rounded-xl p-4">
            <div className="text-sm font-semibold text-shell-green-dark mb-1">{t(item.titleKey)}</div>
            <div className="text-xs text-gray-600 leading-relaxed">{t(item.descKey)}</div>
          </div>
        ))}
      </div>

      {/* Enterprise-only sections */}
      {isEnterprise ? (
        <div className="space-y-5">
          {/* Enterprise transaction rankings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">{t('p5.rankingsTitle')}</h2>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                <button className="px-3 py-1 text-xs bg-white text-gray-800 rounded-md shadow-sm">{t('p5.rankingHistorical')}</button>
                <button className="px-3 py-1 text-xs text-gray-500">{t('p5.rankingMonthly')}</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">{t('p5.colRank')}</th>
                  <th className="text-left px-4 py-2.5 font-medium">{t('p5.colEnterprise')}</th>
                  <th className="text-left px-4 py-2.5 font-medium">{t('p5.colIndustry')}</th>
                  <th className="text-right px-4 py-2.5 font-medium">{t('p5.colVolume')}</th>
                  <th className="text-right px-4 py-2.5 font-medium">{t('p5.colAmount')}</th>
                  <th className="text-left px-4 py-2.5 font-medium">{t('p5.colCreditType')}</th>
                  <th className="text-left px-4 py-2.5 font-medium">{t('p5.colBusinessNote')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {marketData.enterpriseRankings.map((row, i) => (
                  <tr key={row.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row.industry}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-700">{row.volume.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-700">¥{(row.amount / 1000000).toFixed(0)}M</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{creditTypeLabel(row.creditType)}</td>
                    <td className="px-4 py-3 text-xs text-shell-green-dark">{row.businessNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Market participants + OTC */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p5.participantsTitle')}</h2>
              <div className="space-y-3">
                {marketData.participantCategories.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 font-medium">{cat.category}</span>
                      <span className="text-xs text-gray-500">{cat.share}% · {cat.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-shell-green rounded-full" style={{ width: `${cat.share}%` }} />
                    </div>
                    <div className="text-xs text-gray-400">{cat.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p5.otcTitle')}</h2>
              <div className="space-y-3">
                {marketData.otcData.map((row) => (
                  <div key={row.type} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{creditTypeLabel(row.type)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.demand === '高' ? 'bg-red-100 text-red-600' :
                        row.demand === '中' ? 'bg-amber-100 text-amber-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>{t('p5.otcDemand')} {demandLabel(row.demand)}</span>
                    </div>
                    <div className="text-xs text-gray-500">{t('p5.otcPrice')}：¥{row.otcPrice} / t-CO₂</div>
                    <div className="text-xs text-gray-400 mt-0.5">{row.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Opportunity Map */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p5.opportunityTitle')}</h2>
            <div className="grid grid-cols-5 gap-3">
              {opportunities.map((opp) => (
                <div key={opp.titleKey} className={`p-4 rounded-xl border text-center ${opp.color}`}>
                  <div className="text-2xl mb-2">{opp.icon}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{t(opp.titleKey)}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t(opp.descKey)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-shell-dark text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">{t('p5.ctaTitle')}</div>
              <div className="text-sm text-gray-400 mt-0.5">{t('p5.ctaDesc')}</div>
            </div>
            <button className="flex items-center gap-2 bg-shell-green text-white px-5 py-2.5 rounded-lg hover:bg-shell-green-dark transition-colors whitespace-nowrap">
              <Phone size={14} /> {t('p5.ctaBtn')}
            </button>
          </div>
        </div>
      ) : (
        /* Professional: teaser for enterprise features */
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <Lock size={32} className="text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-600 mb-1">{t('p5.lockedTitle')}</h3>
          <p className="text-sm text-gray-400 mb-4">{t('p5.lockedDesc')}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setPlan('enterprise')} className="px-5 py-2 bg-shell-green text-white rounded-lg text-sm hover:bg-shell-green-dark">
              {t('p5.previewBtn')}
            </button>
            <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-white">
              {t('common.buttons.upgrade')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
