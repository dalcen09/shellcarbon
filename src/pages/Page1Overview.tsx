import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, MapPin, Briefcase, User, ChevronDown, ChevronUp } from 'lucide-react';
import { company, carbonAssets, transactions } from '../data/mockData';

function StatCard({ label, value, sub, color = 'text-gray-900' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Page1Overview() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const formatJpy = (v: number) => `¥${(v / 1000000).toFixed(2)}M`;
  const formatTon = (v: number) => `${v.toLocaleString()} t-CO₂`;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">企業總覽</h1>
        <p className="text-sm text-gray-500 mt-1">J-Credit 碳資產帳戶總覽</p>
      </div>

      {/* Top half */}
      <div className="grid grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Building2 size={16} className="text-shell-green" /> 企業資訊
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-400">中文名稱</div>
              <div className="text-sm font-semibold text-gray-900">{company.nameCN}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">English Name</div>
              <div className="text-xs text-gray-700">{company.nameEN}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> 所在地</div>
                <div className="text-xs text-gray-700">{company.city}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><Briefcase size={10} /> 產業</div>
                <div className="text-xs text-gray-700">{company.industry}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Tax ID</div>
                <div className="text-xs text-gray-700 font-mono">{company.taxId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><User size={10} /> 負責人</div>
                <div className="text-xs text-gray-700">{company.contact}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">負責部門</div>
              <div className="text-xs text-gray-700">{company.department}</div>
            </div>
          </div>
        </div>

        {/* Asset Numbers */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="累計持有數量" value={formatTon(carbonAssets.totalHeld)} color="text-shell-green" />
            <StatCard label="目前可用數量" value={formatTon(carbonAssets.available)} color="text-shell-teal" />
            <StatCard label="總帳面金額" value={formatJpy(carbonAssets.totalValue)} sub="JPY" />
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="累計已轉讓" value={formatTon(carbonAssets.transferred)} color="text-amber-600" />
              <StatCard label="累計已宣告" value={formatTon(carbonAssets.declared)} color="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Credit Type Distribution */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">碳權類型分布</h2>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width={200} height={180}>
            <PieChart>
              <Pie
                data={carbonAssets.creditTypes}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="amount"
              >
                {carbonAssets.creditTypes.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t-CO₂`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4">
            {carbonAssets.creditTypes.map((ct) => (
              <div key={ct.type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ct.color }} />
                <div>
                  <div className="text-sm font-medium text-gray-800">{ct.type}</div>
                  <div className="text-xs text-gray-500">{ct.amount.toLocaleString()} t-CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom half: Transaction history */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">過往歷史交易紀錄</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="text-left px-4 py-3 font-medium">日期</th>
                <th className="text-left px-4 py-3 font-medium">類型</th>
                <th className="text-left px-4 py-3 font-medium">碳權類型</th>
                <th className="text-right px-4 py-3 font-medium">數量 (t-CO₂)</th>
                <th className="text-right px-4 py-3 font-medium">金額 (JPY)</th>
                <th className="text-center px-4 py-3 font-medium">狀態</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <>
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}
                  >
                    <td className="px-4 py-3 text-gray-700">{tx.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        tx.type === '購入' ? 'bg-green-100 text-green-700' :
                        tx.type === '賣出' ? 'bg-red-100 text-red-700' :
                        tx.type === '轉讓' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{tx.type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{tx.creditType}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-mono">{tx.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-mono">¥{tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-shell-green/10 text-shell-green">{tx.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {expandedRow === tx.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </td>
                  </tr>
                  {expandedRow === tx.id && (
                    <tr key={`${tx.id}-detail`} className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div><span className="text-gray-400">交易對象：</span><span className="text-gray-700">{tx.counterparty}</span></div>
                          <div><span className="text-gray-400">專案來源：</span><span className="text-gray-700">{tx.projectSource}</span></div>
                          <div><span className="text-gray-400">單價：</span><span className="text-gray-700 font-mono">¥{tx.unitPrice.toLocaleString()}/t</span></div>
                          <div><span className="text-gray-400">文件狀態：</span><span className={tx.docStatus === '齊全' ? 'text-green-600' : 'text-amber-600'}>{tx.docStatus}</span></div>
                          <div><span className="text-gray-400">ESG 可用：</span><span className={tx.esgUsable ? 'text-green-600' : 'text-gray-500'}>{tx.esgUsable ? '是' : '否'}</span></div>
                          <div><span className="text-gray-400">交易 ID：</span><span className="text-gray-700 font-mono">{tx.id}</span></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
