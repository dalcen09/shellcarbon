import { useState } from 'react';
import { ShoppingCart, TrendingDown, ArrowRightLeft, Stamp, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { applications, progressSteps } from '../data/mockData';

const operations = [
  {
    id: 'buy',
    label: '申請購入 J-Credit',
    sub: '建立購入申請',
    icon: ShoppingCart,
    color: 'bg-green-50 border-green-200 text-green-700',
    iconColor: 'text-green-600',
    desc: '增加持有量，用於 ESG、供應鏈聲明、年度配置或日本市場準備。',
  },
  {
    id: 'sell',
    label: '申請賣出 J-Credit',
    sub: '建立賣出申請',
    icon: TrendingDown,
    color: 'bg-red-50 border-red-200 text-red-700',
    iconColor: 'text-red-500',
    desc: '釋出部分持有碳權，進行市場交易或資產調整。',
  },
  {
    id: 'transfer',
    label: '申請轉讓 J-Credit',
    sub: '建立轉讓申請',
    icon: ArrowRightLeft,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    iconColor: 'text-amber-500',
    desc: '轉讓給關係企業、供應鏈客戶或指定合作方。',
  },
  {
    id: 'declare',
    label: '申請宣告/註銷使用',
    sub: '建立宣告申請',
    icon: Stamp,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconColor: 'text-blue-500',
    desc: '用於 ESG 報告、供應鏈揭露、董事會報告或年度聲明。',
  },
];

function ProgressBar({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                {i > 0 && (
                  <div className={`absolute left-0 right-1/2 h-0.5 -translate-y-1/2 top-4 ${done ? 'bg-shell-green' : 'bg-gray-200'}`} />
                )}
                {i < steps.length - 1 && (
                  <div className={`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-4 ${(done || active) && i < currentStep ? 'bg-shell-green' : 'bg-gray-200'}`} />
                )}
                <div className="relative z-10 mx-auto">
                  {done ? (
                    <CheckCircle2 size={20} className="text-shell-green" />
                  ) : active ? (
                    <div className="w-5 h-5 rounded-full bg-shell-green border-2 border-white shadow-md ring-2 ring-shell-green/30" />
                  ) : (
                    <Circle size={20} className="text-gray-300" />
                  )}
                </div>
              </div>
              <div className={`mt-2 text-xs text-center leading-tight max-w-[80px] ${active ? 'text-shell-green font-semibold' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page2Operations() {
  const [showModal, setShowModal] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">企業操作</h1>
        <p className="text-sm text-gray-500 mt-1">申請購入、賣出、轉讓或宣告 J-Credit</p>
      </div>

      {/* Top: 4 operation icons */}
      <div className="grid grid-cols-2 gap-5">
        {operations.map(({ id, label, sub, icon: Icon, color, iconColor, desc }) => (
          <button
            key={id}
            onClick={() => setShowModal(id)}
            className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${color}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-white/60 ${iconColor}`}>
                <Icon size={28} />
              </div>
              <div>
                <div className="font-semibold text-base">{label}</div>
                <div className="text-xs opacity-70 mt-0.5">{sub}</div>
                <div className="text-xs mt-2 opacity-80 leading-relaxed">{desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom: Application progress */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">申請進度追蹤</h2>
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-400">{app.id}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    app.type === '購入' ? 'bg-green-100 text-green-700' :
                    app.type === '宣告' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{app.type}</span>
                </div>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {app.creditType} · {app.quantity.toLocaleString()} t-CO₂
                </div>
                <div className="text-xs text-gray-400 mt-0.5">提交日期：{app.submittedAt}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">目前狀態</div>
                <div className="text-sm font-semibold text-shell-green">{app.status}</div>
              </div>
            </div>
            <ProgressBar steps={progressSteps} currentStep={app.stepIndex} />
          </div>
        ))}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            若有問題，請聯繫 ShellCarbon 客服或專案窗口。實際交易條件依市場、合作窗口與企業內部審核確認，本平台不構成任何交易保證。
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {operations.find((o) => o.id === showModal)?.label}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {operations.find((o) => o.id === showModal)?.desc}
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">碳權類型</label>
                <select className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-shell-green/30">
                  <option>再生能源</option>
                  <option>節能設備</option>
                  <option>森林吸收</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">數量 (t-CO₂)</label>
                <input type="number" placeholder="例：500" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shell-green/30" />
              </div>
              <div>
                <label className="text-xs text-gray-500">備註說明</label>
                <textarea rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-shell-green/30" placeholder="用途說明..." />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">取消</button>
              <button onClick={() => setShowModal(null)} className="flex-1 py-2 bg-shell-green text-white rounded-lg text-sm hover:bg-shell-green-dark">提交申請</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
