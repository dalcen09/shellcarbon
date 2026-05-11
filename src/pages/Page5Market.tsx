import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, Building2, Lock, Star, Phone } from 'lucide-react';
import { marketData } from '../data/mockData';

type Plan = 'professional' | 'enterprise';

export default function Page5Market() {
  const [plan, setPlan] = useState<Plan>('professional');
  const [chartType, setChartType] = useState<'price' | 'volume'>('price');

  const isEnterprise = plan === 'enterprise';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">J-Credit 日本市場情報</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEnterprise
              ? '掌握企業動向、場外情報與商務機會'
              : '掌握價格、交易量與市場趨勢'}
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
            Professional
          </button>
          <button
            onClick={() => setPlan('enterprise')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              isEnterprise ? 'bg-white text-shell-green shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star size={12} className="text-amber-500" /> Enterprise
          </button>
        </div>
      </div>

      {/* Early Access Banner */}
      <div className="bg-gradient-to-r from-shell-green to-shell-teal text-white rounded-xl p-4 flex items-center gap-4">
        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm font-bold">早鳥優惠</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">前 10 位導入企業，可用 Professional 價格取得 Enterprise 功能</div>
          <div className="text-xs text-white/80 mt-0.5">限量名額，現在導入即可鎖定最優條件。聯繫 ShellCarbon 專案窗口了解更多。</div>
        </div>
        <button className="flex-shrink-0 bg-white text-shell-green text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
          立即諮詢
        </button>
      </div>

      {/* Market Overview Cards */}
      <div className={`grid gap-4 ${isEnterprise ? 'grid-cols-6' : 'grid-cols-5'}`}>
        {[
          { label: '最新參考價格', value: `¥${marketData.latestPrice.toLocaleString()}`, sub: 'JPY / t-CO₂', icon: TrendingUp, color: 'text-shell-green' },
          { label: '當月成交量', value: `${(marketData.monthlyVolume / 1000).toFixed(1)}k`, sub: 't-CO₂', icon: Activity, color: 'text-blue-600' },
          { label: '當月成交金額', value: `¥${(marketData.monthlyValue / 1000000).toFixed(0)}M`, sub: 'JPY', icon: TrendingUp, color: 'text-purple-600' },
          { label: '主要信用類型', value: marketData.mainCreditType, sub: '最活躍', icon: Activity, color: 'text-emerald-600' },
          { label: '市場活絡度', value: marketData.activityLevel, sub: '整體評估', icon: Activity, color: 'text-amber-600' },
          ...(isEnterprise ? [{ label: '場外情報', value: '3 筆', sub: '本月更新', icon: Building2, color: 'text-red-600' }] : []),
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
            <h2 className="text-sm font-semibold text-gray-700">歷史趨勢</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setChartType('price')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${chartType === 'price' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
              >
                價格 (JPY/t)
              </button>
              <button
                onClick={() => setChartType('volume')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${chartType === 'volume' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
              >
                成交量 (t-CO₂)
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
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t`, '成交量']} />
                <Bar dataKey="volume" fill="#1a7f5a" radius={[3, 3, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Credit type comparison */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">信用類型比較</h2>
          <div className="space-y-3">
            {marketData.creditTypeComparison.map((ct) => (
              <div key={ct.type} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ct.color }} />
                  <span className="text-sm font-semibold text-gray-800">{ct.type}</span>
                  <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    ct.activity === '非常活絡' ? 'bg-green-100 text-green-700' :
                    ct.activity === '活絡' ? 'bg-emerald-100 text-emerald-700' :
                    ct.activity === '穩定' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{ct.activity}</span>
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
          { tip: '日本企業關注碳信用', desc: '越來越多日本企業採購 J-Credit 用於 ESG 目標，這是建立合作關係的切入點。' },
          { tip: 'ESG 文件可強化信任', desc: '提供完整 J-Credit 文件的供應商，更容易進入日本採購體系。' },
          { tip: '小量導入可降低風險', desc: '從小量購入開始，熟悉流程後再逐步擴大配置，是建議策略。' },
        ].map((item) => (
          <div key={item.tip} className="bg-shell-green/5 border border-shell-green/15 rounded-xl p-4">
            <div className="text-sm font-semibold text-shell-green-dark mb-1">{item.tip}</div>
            <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Enterprise-only sections */}
      {isEnterprise ? (
        <div className="space-y-5">
          {/* Enterprise transaction rankings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">企業交易排行</h2>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                <button className="px-3 py-1 text-xs bg-white text-gray-800 rounded-md shadow-sm">歷史累計</button>
                <button className="px-3 py-1 text-xs text-gray-500">當月</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">#</th>
                  <th className="text-left px-4 py-2.5 font-medium">企業名稱</th>
                  <th className="text-left px-4 py-2.5 font-medium">產業別</th>
                  <th className="text-right px-4 py-2.5 font-medium">交易量 (t)</th>
                  <th className="text-right px-4 py-2.5 font-medium">金額 (JPY)</th>
                  <th className="text-left px-4 py-2.5 font-medium">信用類型</th>
                  <th className="text-left px-4 py-2.5 font-medium">商務意義</th>
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
                    <td className="px-4 py-3 text-xs text-gray-600">{row.creditType}</td>
                    <td className="px-4 py-3 text-xs text-shell-green-dark">{row.businessNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Market participants + OTC */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">東證市場參與者分類</h2>
              <div className="space-y-3">
                {marketData.participantCategories.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 font-medium">{cat.category}</span>
                      <span className="text-xs text-gray-500">{cat.share}% · {cat.count} 家</span>
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
              <h2 className="text-sm font-semibold text-gray-700 mb-4">場外交易情報 (OTC)</h2>
              <div className="space-y-3">
                {marketData.otcData.map((row) => (
                  <div key={row.type} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{row.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.demand === '高' ? 'bg-red-100 text-red-600' :
                        row.demand === '中' ? 'bg-amber-100 text-amber-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>需求 {row.demand}</span>
                    </div>
                    <div className="text-xs text-gray-500">OTC 參考：¥{row.otcPrice} / t-CO₂</div>
                    <div className="text-xs text-gray-400 mt-0.5">{row.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Opportunity Map */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Business Opportunity Map</h2>
            <div className="grid grid-cols-5 gap-3">
              {[
                { title: '商社合作', desc: '透過主要商社進入日本碳市場', icon: '🏢', color: 'bg-green-50 border-green-200' },
                { title: '製造業供應鏈', desc: '作為供應商提供碳中和文件', icon: '🏭', color: 'bg-blue-50 border-blue-200' },
                { title: '金融/顧問合作', desc: '與顧問公司共同服務企業客戶', icon: '💼', color: 'bg-purple-50 border-purple-200' },
                { title: '場外交易需求', desc: '大宗定制化碳信用採購機會', icon: '📈', color: 'bg-amber-50 border-amber-200' },
                { title: 'ESG 敲門磚', desc: '以 J-Credit 打開日本 ESG 合作', icon: '🌱', color: 'bg-emerald-50 border-emerald-200' },
              ].map((opp) => (
                <div key={opp.title} className={`p-4 rounded-xl border text-center ${opp.color}`}>
                  <div className="text-2xl mb-2">{opp.icon}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{opp.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{opp.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-shell-dark text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">預約 ShellCarbon 專案窗口諮詢</div>
              <div className="text-sm text-gray-400 mt-0.5">進一步評估日本企業接觸與合作可能，由顧問團隊提供個別化建議。</div>
            </div>
            <button className="flex items-center gap-2 bg-shell-green text-white px-5 py-2.5 rounded-lg hover:bg-shell-green-dark transition-colors whitespace-nowrap">
              <Phone size={14} /> 預約諮詢
            </button>
          </div>
        </div>
      ) : (
        /* Professional: teaser for enterprise features */
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <Lock size={32} className="text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-600 mb-1">Enterprise 進階功能</h3>
          <p className="text-sm text-gray-400 mb-4">
            升級 Enterprise 可查看企業交易排行、場外情報、Business Opportunity Map 與專案窗口支援。
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPlan('enterprise')}
              className="px-5 py-2 bg-shell-green text-white rounded-lg text-sm hover:bg-shell-green-dark"
            >
              查看 Enterprise 預覽
            </button>
            <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-white">
              聯繫升級
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
