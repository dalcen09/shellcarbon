import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, TrendingDown, ArrowRightLeft, Stamp, CheckCircle2, Circle, AlertCircle, Users, Package, PlayCircle, ClipboardList, HelpCircle } from 'lucide-react';
import { applications } from '../data/mockData';

function ProgressBar({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className={`flex flex-col items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
            <div className="flex items-center w-full">
              {i > 0 && <div className={`flex-1 h-0.5 ${i <= currentStep ? 'bg-shell-green' : 'bg-gray-200'}`} />}
              <div className="flex-shrink-0">
                {done ? <CheckCircle2 size={20} className="text-shell-green" /> :
                 active ? <div className="w-5 h-5 rounded-full bg-shell-green ring-2 ring-shell-green/30" /> :
                 <Circle size={20} className="text-gray-300" />}
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStep ? 'bg-shell-green' : 'bg-gray-200'}`} />}
            </div>
            <div className={`mt-2 text-xs text-center leading-tight max-w-[80px] ${active ? 'text-shell-green font-semibold' : done ? 'text-gray-600' : 'text-gray-400'}`}>{step}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page2Operations() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<string | null>(null);

  const operations = [
    { id: 'buy', label: t('p2.buyLabel'), sub: t('p2.buySub'), icon: ShoppingCart, color: 'bg-green-50 border-green-200 text-green-700', iconColor: 'text-green-600', desc: t('p2.buyDesc'), suitable: t('p2.buySuitable'), output: t('p2.buyOutput') },
    { id: 'sell', label: t('p2.sellLabel'), sub: t('p2.sellSub'), icon: TrendingDown, color: 'bg-red-50 border-red-200 text-red-700', iconColor: 'text-red-500', desc: t('p2.sellDesc'), suitable: t('p2.sellSuitable'), output: t('p2.sellOutput') },
    { id: 'transfer', label: t('p2.transferLabel'), sub: t('p2.transferSub'), icon: ArrowRightLeft, color: 'bg-amber-50 border-amber-200 text-amber-700', iconColor: 'text-amber-500', desc: t('p2.transferDesc'), suitable: t('p2.transferSuitable'), output: t('p2.transferOutput') },
    { id: 'declare', label: t('p2.declareLabel'), sub: t('p2.declareSub'), icon: Stamp, color: 'bg-blue-50 border-blue-200 text-blue-700', iconColor: 'text-blue-500', desc: t('p2.declareDesc'), suitable: t('p2.declareSuitable'), output: t('p2.declareOutput') },
  ];

  const progressSteps = [t('p2.step0'), t('p2.step1'), t('p2.step2'), t('p2.step3'), t('p2.step4'), t('p2.step5')];

  function appTypeLabel(type: string) {
    const map: Record<string, string> = { '購入': t('common.txTypes.buy'), '賣出': t('common.txTypes.sell'), '轉讓': t('common.txTypes.transfer'), '宣告': t('common.txTypes.declare') };
    return map[type] ?? type;
  }
  function creditTypeLabel(type: string) {
    const map: Record<string, string> = { '再生能源': t('common.creditTypes.renewable'), '節能設備': t('common.creditTypes.efficiency'), '森林吸收': t('common.creditTypes.forest'), '其他': t('common.creditTypes.other') };
    return map[type] ?? type;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('p2.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('p2.subtitle')}</p>
      </div>

      {/* 4 operation cards with business context */}
      <div className="grid grid-cols-2 gap-5">
        {operations.map(({ id, label, sub, icon: Icon, color, iconColor, desc, suitable, output }) => (
          <button key={id} onClick={() => setShowModal(id)} className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${color}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2.5 rounded-lg bg-white/60 flex-shrink-0 ${iconColor}`}><Icon size={24} /></div>
              <div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs opacity-70 mt-0.5">{sub}</div>
              </div>
            </div>
            <p className="text-xs opacity-80 leading-relaxed mb-3">{desc}</p>
            <div className="space-y-1.5 border-t border-current/10 pt-3">
              <div className="flex gap-2 text-xs">
                <Users size={11} className="flex-shrink-0 mt-0.5 opacity-60" />
                <span className="opacity-75"><span className="font-medium">{t('p2.labelSuitable')}：</span>{suitable}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <Package size={11} className="flex-shrink-0 mt-0.5 opacity-60" />
                <span className="opacity-75"><span className="font-medium">{t('p2.labelOutput')}：</span>{output}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA bar */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark">
          <PlayCircle size={13} /> {t('p2.ctaStart')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <ClipboardList size={13} /> {t('p2.ctaChecklist')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <HelpCircle size={13} /> {t('p2.ctaGuide')}
        </button>
      </div>

      {/* Application progress */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">{t('p2.progressTitle')}</h2>
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-400">{app.id}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${app.type === '購入' ? 'bg-green-100 text-green-700' : app.type === '宣告' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{appTypeLabel(app.type)}</span>
                </div>
                <div className="text-sm font-semibold text-gray-800 mt-1">{creditTypeLabel(app.creditType)} · {app.quantity.toLocaleString()} t-CO₂</div>
                <div className="text-xs text-gray-400 mt-0.5">{t('p2.appSubmitted')}：{app.submittedAt}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">{t('p2.appStatus')}</div>
                <div className="text-sm font-semibold text-shell-green">{app.status}</div>
              </div>
            </div>
            <ProgressBar steps={progressSteps} currentStep={app.stepIndex} />
          </div>
        ))}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">{t('p2.disclaimer')}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{operations.find((o) => o.id === showModal)?.label}</h3>
            <p className="text-sm text-gray-500 mb-4">{operations.find((o) => o.id === showModal)?.desc}</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">{t('p2.modalCreditType')}</label>
                <select className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-shell-green/30">
                  {[t('common.creditTypes.renewable'), t('common.creditTypes.efficiency'), t('common.creditTypes.forest')].map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">{t('p2.modalQty')}</label>
                <input type="number" placeholder={t('p2.modalQtyPlaceholder')} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shell-green/30" />
              </div>
              <div>
                <label className="text-xs text-gray-500">{t('p2.modalNote')}</label>
                <textarea rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-shell-green/30" placeholder={t('p2.modalNotePlaceholder')} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">{t('common.buttons.cancel')}</button>
              <button onClick={() => setShowModal(null)} className="flex-1 py-2 bg-shell-green text-white rounded-lg text-sm hover:bg-shell-green-dark">{t('common.buttons.submit')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
