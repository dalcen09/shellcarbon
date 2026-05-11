import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, MapPin, Building, Activity, Database, ExternalLink } from 'lucide-react';
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
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ShellCarbon 主引擎</h1>
        <p className="text-sm text-gray-500 mt-1">硬體補碳數據累計與未來國際碳市場連動</p>
      </div>

      {/* Top: Cumulative metrics */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="累計 CO₂ 捕捉量" value={engineData.totalCO2Captured} unit="t-CO₂" icon={Activity} color="bg-shell-green" />
        <MetricCard label="累計海洋礦物基殼量" value={engineData.totalMineralMaterial} unit="公噸 (牡蠣殼等)" icon={Database} color="bg-shell-teal" />
        <MetricCard label="平均捕捉效率" value={`${engineData.avgEfficiency}%`} unit="跨場域平均" icon={Cpu} color="bg-blue-500" />
        <MetricCard label="已連接場域數" value={engineData.connectedSites} unit="個建築/工廠/場域" icon={Building} color="bg-purple-500" />
        <MetricCard label="數據完整率" value={`${engineData.dataCompleteness}%`} unit="硬體+文件+驗證" icon={Database} color="bg-amber-500" />
      </div>

      {/* Data completeness bar */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">數據完整率</span>
          <span className="text-sm font-bold text-gray-800">{engineData.dataCompleteness}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-shell-green to-shell-teal"
            style={{ width: `${engineData.dataCompleteness}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">涵蓋：硬體感測數據、現場檢測文件、第三方驗證資料</p>
      </div>

      {/* Bottom: Regional + Building rankings */}
      <div className="grid grid-cols-2 gap-5">
        {/* Region rankings */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-shell-green" />
            <h2 className="text-sm font-semibold text-gray-700">地區排名</h2>
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
                  <div className="text-xs text-gray-400 mt-0.5">{r.sites} 場域 · 效率 {r.efficiency}%</div>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={engineData.regions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={60} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t-CO₂`, '捕捉量']} />
              <Bar dataKey="captured" fill="#1a7f5a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Building rankings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Building size={15} className="text-shell-green" />
            <h2 className="text-sm font-semibold text-gray-700">Building / Site 排名</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="text-left px-4 py-2.5 font-medium">#</th>
                <th className="text-left px-4 py-2.5 font-medium">場域名稱</th>
                <th className="text-left px-4 py-2.5 font-medium">地區</th>
                <th className="text-right px-4 py-2.5 font-medium">捕捉量 (t)</th>
                <th className="text-right px-4 py-2.5 font-medium">效率</th>
                <th className="text-center px-4 py-2.5 font-medium">狀態</th>
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
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market linkage explanation */}
      <div className="bg-shell-dark text-white rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-shell-green/20 rounded-xl">
            <ExternalLink size={20} className="text-shell-green" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">國際碳市場連動說明</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              J-Credit 是 ShellCarbon 的第一個市場入口。主引擎持續累積的<strong className="text-white">硬體補碳數據</strong>與<strong className="text-white">海洋礦物基材料使用量</strong>，
              未來可作為 <span className="text-shell-green font-semibold">Puro.earth</span>、<span className="text-shell-green font-semibold">Verra</span> 等國際主流碳市場的驗證對接基礎，
              為持有企業創造更高的碳資產長期價值。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
