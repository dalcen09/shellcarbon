import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, MapPin, Building, Activity, Database, Calendar, Globe, ArrowRight } from 'lucide-react';
import { engineData } from '../data/mockData';

function MetricCard({ label, value, unit, icon: Icon, color }: { label: string; value: string | number; unit: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs text-gray-400">{label}</div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={14} className="text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{unit}</div>
    </div>
  );
}

export default function Page6Engine() {
  const { t } = useTranslation();

  function siteStatusLabel(s: string) {
    if (s === '運行中') return t('common.status.active');
    if (s === '測試中') return t('common.status.testing');
    return s;
  }

  const phases = [
    {
      num: t('p6.phase1'),
      market: t('p6.phase1Market'),
      desc: t('p6.phase1Desc'),
      color: 'bg-shell-green',
      textColor: 'text-shell-green',
      bgColor: 'bg-shell-green/5 border-shell-green/20',
      active: true,
    },
    {
      num: t('p6.phase2'),
      market: t('p6.phase2Market'),
      desc: t('p6.phase2Desc'),
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      active: false,
    },
    {
      num: t('p6.phase3'),
      market: t('p6.phase3Market'),
      desc: t('p6.phase3Desc'),
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      active: false,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('p6.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('p6.subtitle')}</p>
      </div>

      {/* Top: Cumulative metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard label={t('p6.metricCO2')} value={engineData.totalCO2Captured} unit="t-CO₂" icon={Activity} color="bg-shell-green" />
        <MetricCard label={t('p6.metricMineral')} value={engineData.totalMineralMaterial} unit={t('p6.metricMineralSub')} icon={Database} color="bg-shell-teal" />
        <MetricCard label={t('p6.metricEfficiency')} value={`${engineData.avgEfficiency}%`} unit={t('p6.metricEfficiencySub')} icon={Cpu} color="bg-blue-500" />
        <MetricCard label={t('p6.metricSites')} value={engineData.connectedSites} unit={t('p6.metricSitesSub')} icon={Building} color="bg-purple-500" />
        <MetricCard label={t('p6.metricCompleteness')} value={`${engineData.dataCompleteness}%`} unit={t('p6.metricCompletenessSub')} icon={Database} color="bg-amber-500" />
      </div>

      {/* Data completeness bar */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">{t('p6.metricCompleteness')}</span>
          <span className="text-sm font-bold text-gray-800">{engineData.dataCompleteness}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-shell-green to-shell-teal"
            style={{ width: `${engineData.dataCompleteness}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{t('p6.completenessNote')}</p>
      </div>

      {/* Bottom: Regional + Building rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Region rankings */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-shell-green" />
            <h2 className="text-sm font-semibold text-gray-700">{t('p6.regionTitle')}</h2>
          </div>
          <div className="space-y-3 mb-5">
            {engineData.regions.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-yellow-100 text-yellow-700' :
                  i === 1 ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-50 text-orange-600'
                }`}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-gray-800">{r.name}</span>
                    <span className="text-xs text-gray-500 font-mono">{r.captured.toLocaleString()} t</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-shell-green rounded-full"
                      style={{ width: `${(r.captured / engineData.regions[0].captured) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.sites} sites · {r.efficiency}%</div>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={engineData.regions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={60} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t-CO₂`, t('p6.colCaptured')]} />
              <Bar dataKey="captured" fill="#1a7f5a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Building rankings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Building size={15} className="text-shell-green" />
            <h2 className="text-sm font-semibold text-gray-700">{t('p6.buildingTitle')}</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="text-left px-4 py-2.5 font-medium">#</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p6.colSite')}</th>
                <th className="text-left px-4 py-2.5 font-medium">{t('p6.colRegion')}</th>
                <th className="text-right px-4 py-2.5 font-medium">{t('p6.colCaptured')}</th>
                <th className="text-right px-4 py-2.5 font-medium">{t('p6.colEfficiency')}</th>
                <th className="text-center px-4 py-2.5 font-medium">{t('p6.colStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {engineData.buildings.map((b, i) => (
                <tr key={b.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-400 text-xs font-mono">{i + 1}</td>
                  <td className="px-4 py-2.5 text-gray-800 text-xs font-medium">{b.name}</td>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">{b.region}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-gray-700 text-xs">{b.captured.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-gray-700">{b.efficiency}%</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.status === '運行中' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-600'
                    }`}>{siteStatusLabel(b.status)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Expansion Roadmap */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={16} className="text-shell-green" />
          <h2 className="text-sm font-semibold text-gray-700">{t('p6.roadmapTitle')}</h2>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-5">{t('p6.roadmapDesc')}</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {phases.map((phase, i) => (
            <div key={phase.num} className="flex items-center gap-3 flex-1">
              <div className={`flex-1 rounded-xl border p-4 ${phase.bgColor}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${phase.color}`} />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{phase.num}</span>
                  {phase.active && (
                    <span className="text-xs bg-shell-green text-white px-1.5 py-0.5 rounded-full font-medium">Active</span>
                  )}
                </div>
                <div className={`text-base font-bold mb-1 ${phase.textColor}`}>{phase.market}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{phase.desc}</div>
              </div>
              {i < phases.length - 1 && (
                <ArrowRight size={18} className="text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market linkage explanation */}
      <div className="bg-shell-dark text-white rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-shell-green/20 rounded-xl flex-shrink-0">
            <Globe size={20} className="text-shell-green" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('p6.marketLinkTitle')}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{t('p6.marketLinkDesc')}</p>
          </div>
        </div>
      </div>

      {/* CTA bar */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark">
          <Calendar size={13} /> {t('p6.ctaBook')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <Database size={13} /> {t('p6.ctaArch')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <Globe size={13} /> {t('p6.ctaPuro')}
        </button>
      </div>
    </div>
  );
}
