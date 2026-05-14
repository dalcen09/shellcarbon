import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, MapPin, Briefcase, User, ChevronDown, ChevronUp, Lightbulb, ArrowRight, Calendar } from 'lucide-react';
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

function CtaBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {children}
    </div>
  );
}

export default function Page1Overview() {
  const { t } = useTranslation();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const formatJpy = (v: number) => `¥${(v / 1000000).toFixed(2)}M`;
  const formatTon = (v: number) => `${v.toLocaleString()} t-CO₂`;

  function txTypeLabel(type: string) {
    const map: Record<string, string> = { '購入': t('common.txTypes.buy'), '賣出': t('common.txTypes.sell'), '轉讓': t('common.txTypes.transfer'), '宣告': t('common.txTypes.declare') };
    return map[type] ?? type;
  }
  function creditTypeLabel(type: string) {
    const map: Record<string, string> = { '再生能源': t('common.creditTypes.renewable'), '節能設備': t('common.creditTypes.efficiency'), '森林吸收': t('common.creditTypes.forest'), '其他': t('common.creditTypes.other') };
    return map[type] ?? type;
  }
  function docStatusLabel(s: string) {
    if (s === '齊全') return t('common.docStatus.complete');
    if (s === '部分缺件') return t('common.docStatus.missing');
    return s;
  }

  const creditTypesLocalized = carbonAssets.creditTypes.map((ct) => ({ ...ct, type: creditTypeLabel(ct.type) }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('p1.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('p1.subtitle')}</p>
      </div>

      {/* Top half: company + assets */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Building2 size={16} className="text-shell-green" /> {t('p1.companyCard')}
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-400">{t('p1.labelCN')}</div>
              <div className="text-sm font-semibold text-gray-900">{company.nameCN}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">{t('p1.labelEN')}</div>
              <div className="text-xs text-gray-700">{company.nameEN}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {t('p1.labelLocation')}</div>
                <div className="text-xs text-gray-700">{company.city}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><Briefcase size={10} /> {t('p1.labelIndustry')}</div>
                <div className="text-xs text-gray-700">{company.industry}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">{t('p1.labelTaxId')}</div>
                <div className="text-xs text-gray-700 font-mono">{company.taxId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><User size={10} /> {t('p1.labelContact')}</div>
                <div className="text-xs text-gray-700">{company.contact}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">{t('p1.labelDept')}</div>
              <div className="text-xs text-gray-700">{company.department}</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label={t('p1.statTotal')} value={formatTon(carbonAssets.totalHeld)} color="text-shell-green" />
            <StatCard label={t('p1.statAvail')} value={formatTon(carbonAssets.available)} color="text-shell-teal" />
            <StatCard label={t('p1.statValue')} value={formatJpy(carbonAssets.totalValue)} sub="JPY" />
            <div className="grid grid-cols-2 gap-4">
              <StatCard label={t('p1.statTransferred')} value={formatTon(carbonAssets.transferred)} color="text-amber-600" />
              <StatCard label={t('p1.statDeclared')} value={formatTon(carbonAssets.declared)} color="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Credit Type Distribution */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('p1.chartTitle')}</h2>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width={200} height={180}>
            <PieChart>
              <Pie data={creditTypesLocalized} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="amount">
                {creditTypesLocalized.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} t-CO₂`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4">
            {creditTypesLocalized.map((ct) => (
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

      {/* Transaction history */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">{t('p1.tableTitle')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="text-left px-4 py-3 font-medium">{t('p1.colDate')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('p1.colType')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('p1.colCreditType')}</th>
                <th className="text-right px-4 py-3 font-medium">{t('p1.colQty')}</th>
                <th className="text-right px-4 py-3 font-medium">{t('p1.colAmount')}</th>
                <th className="text-center px-4 py-3 font-medium">{t('p1.colStatus')}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <>
                  <tr key={tx.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}>
                    <td className="px-4 py-3 text-gray-700">{tx.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tx.type === '購入' ? 'bg-green-100 text-green-700' : tx.type === '賣出' ? 'bg-red-100 text-red-700' : tx.type === '轉讓' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{txTypeLabel(tx.type)}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{creditTypeLabel(tx.creditType)}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-mono">{tx.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-mono">¥{tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-shell-green/10 text-shell-green">{t('common.status.completed')}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{expandedRow === tx.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</td>
                  </tr>
                  {expandedRow === tx.id && (
                    <tr key={`${tx.id}-d`} className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div><span className="text-gray-400">{t('p1.detailCounterparty')}：</span><span className="text-gray-700">{tx.counterparty}</span></div>
                          <div><span className="text-gray-400">{t('p1.detailProject')}：</span><span className="text-gray-700">{tx.projectSource}</span></div>
                          <div><span className="text-gray-400">{t('p1.detailUnit')}：</span><span className="text-gray-700 font-mono">¥{tx.unitPrice.toLocaleString()}/t</span></div>
                          <div><span className="text-gray-400">{t('p1.detailDocStatus')}：</span><span className={tx.docStatus === '齊全' ? 'text-green-600' : 'text-amber-600'}>{docStatusLabel(tx.docStatus)}</span></div>
                          <div><span className="text-gray-400">{t('p1.detailEsg')}：</span><span className={tx.esgUsable ? 'text-green-600' : 'text-gray-500'}>{tx.esgUsable ? t('common.esgUsable.yes') : t('common.esgUsable.no')}</span></div>
                          <div><span className="text-gray-400">{t('p1.detailTxId')}：</span><span className="text-gray-700 font-mono">{tx.id}</span></div>
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

      {/* Recommendation block */}
      <div className="bg-gradient-to-br from-shell-green/5 to-shell-teal/5 border border-shell-green/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-shell-green" />
          <h2 className="text-sm font-semibold text-shell-green-dark">{t('p1.recTitle')}</h2>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">{t('p1.recDesc')}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: t('p1.recPlannable'), value: t('p1.recPlannableVal') },
            { label: t('p1.recUse'),       value: t('p1.recUseVal') },
            { label: t('p1.recAction'),    value: t('p1.recActionVal') },
            { label: t('p1.recNext'),      value: t('p1.recNextVal') },
          ].map((item) => (
            <div key={item.label} className="bg-white/70 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="text-sm font-semibold text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
        <CtaBar>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark transition-colors">
            <Calendar size={12} /> {t('p1.ctaBook')}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-shell-green text-shell-green text-xs font-semibold rounded-lg hover:bg-shell-green/5 transition-colors">
            {t('p1.ctaGenerate')}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            {t('p1.ctaGo')} <ArrowRight size={12} />
          </button>
        </CtaBar>
      </div>
    </div>
  );
}
