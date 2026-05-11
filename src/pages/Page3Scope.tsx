import { CheckCircle2, Clock, AlertCircle, FileCheck, ChevronRight } from 'lucide-react';
import { scopeData } from '../data/mockData';

function DocStatusBadge({ status }: { status: string }) {
  if (status === '完成') return (
    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
      <CheckCircle2 size={12} /> {status}
    </span>
  );
  if (status === '審核中') return (
    <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
      <Clock size={12} /> {status}
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
      <AlertCircle size={12} /> {status}
    </span>
  );
}

export default function Page3Scope() {
  const completeness = scopeData.completeness;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Scope 1 / Scope 2 資料頁</h1>
        <p className="text-sm text-gray-500 mt-1">碳盤查結果 → J-Credit 導入狀態</p>
      </div>

      {/* Top half: Emissions data */}
      <div className="grid grid-cols-3 gap-5">
        {/* Key emissions numbers */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Scope 1 排放量', value: `${scopeData.scope1.toLocaleString()} t-CO₂`, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Scope 2 排放量', value: `${scopeData.scope2.toLocaleString()} t-CO₂`, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: '合計排放量', value: `${scopeData.total.toLocaleString()} t-CO₂`, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((card) => (
              <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-white`}>
                <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs text-gray-400 mt-1">盤查年度：{scopeData.year}</div>
              </div>
            ))}
          </div>

          {/* Scope bar chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-semibold text-gray-600 mb-3">排放比例</div>
            <div className="space-y-3">
              {[
                { label: 'Scope 1', value: scopeData.scope1, total: scopeData.total, color: 'bg-orange-400' },
                { label: 'Scope 2', value: scopeData.scope2, total: scopeData.total, color: 'bg-yellow-400' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{s.label}</span>
                    <span className="font-mono">{((s.value / s.total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${(s.value / s.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document status */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck size={16} className="text-shell-green" />
            <span className="text-sm font-semibold text-gray-700">文件狀態</span>
          </div>
          <div className="space-y-3">
            {scopeData.documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between">
                <span className="text-xs text-gray-700">{doc.name}</span>
                <DocStatusBadge status={doc.status} />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">資料完整度</span>
              <span className="text-xs font-semibold text-gray-700">{completeness}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-shell-green rounded-full" style={{ width: `${completeness}%` }} />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400 leading-relaxed">
            查證狀態：{scopeData.verificationStatus}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-shell-green/5 border border-shell-green/20 rounded-lg p-4 text-xs text-gray-600 leading-relaxed">
        💡 ShellCarbon 不重新計算碳盤查，而是把既有盤查資料轉成 J-Credit 購買、持有、宣告與 ESG 文件基礎。
      </div>

      {/* Bottom half: J-Credit status */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-5">J-Credit 導入準備狀態</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            {[
              { label: '資料完整性', value: scopeData.jcredit.dataCompleteness },
              { label: '可規劃配置量', value: `${scopeData.jcredit.plannableAmount.toLocaleString()} t-CO₂` },
              { label: '建議用途', value: scopeData.jcredit.recommendedUse },
              { label: '建議信用類型', value: scopeData.jcredit.recommendedType },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="text-xs text-gray-400 w-32 shrink-0">{item.label}</div>
                <div className="text-sm font-medium text-gray-800">{item.value}</div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400 w-32">可進入申請流程</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scopeData.jcredit.canProceed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {scopeData.jcredit.canProceed ? '✓ 是' : '✗ 否'}
              </span>
            </div>
          </div>

          {/* Application progress steps */}
          <div>
            <div className="text-xs text-gray-500 mb-3 font-medium">申請進度</div>
            <div className="space-y-2">
              {scopeData.jcredit.steps.map((step, i) => {
                const done = i < scopeData.jcredit.currentStep;
                const active = i === scopeData.jcredit.currentStep;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {done ? (
                        <CheckCircle2 size={16} className="text-shell-green" />
                      ) : active ? (
                        <div className="w-4 h-4 rounded-full bg-shell-green ring-2 ring-shell-green/30" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                      )}
                    </div>
                    <span className={`text-xs ${active ? 'text-shell-green font-semibold' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step}
                    </span>
                    {active && <ChevronRight size={12} className="text-shell-green" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
          <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            配置建議僅供參考；實際購入、宣告、註銷與揭露需由企業自行依顧問、法務、會計與制度要求確認。
          </p>
        </div>
      </div>
    </div>
  );
}
