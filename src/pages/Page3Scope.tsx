import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock, AlertCircle, FileCheck, ChevronRight, Info, PlayCircle, ShoppingCart } from 'lucide-react';
import { scopeData } from '../data/mockData';

function DocStatusBadge({ status, t }: { status: string; t: (k: string) => string }) {
  if (status === '完成') return (
    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
      <CheckCircle2 size={12} /> {t('common.status.completed')}
    </span>
  );
  if (status === '審核中') return (
    <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
      <Clock size={12} /> {t('common.status.reviewing')}
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
      <AlertCircle size={12} /> {status}
    </span>
  );
}

export default function Page3Scope() {
  const { t } = useTranslation();
  const completeness = scopeData.completeness;

  const docNames = [
    t('p3.docs.scope1Detail'),
    t('p3.docs.scope2Power'),
    t('p3.docs.iso14064'),
    t('p3.docs.thirdParty'),
    t('p3.docs.internalApproval'),
  ];

  const jcStepKeys = [
    t('p3.jcSteps.dataImport'),
    t('p3.jcSteps.docVerify'),
    t('p3.jcSteps.purposeConfirm'),
    t('p3.jcSteps.japanWindow'),
    t('p3.jcSteps.flowCreate'),
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('p3.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('p3.subtitle')}</p>
      </div>

      {/* Positioning note banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">{t('p3.positioningNote')}</p>
      </div>

      {/* Top half: Emissions data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Key emissions numbers */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: t('p3.scope1'), value: `${scopeData.scope1.toLocaleString()} t-CO₂`, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: t('p3.scope2'), value: `${scopeData.scope2.toLocaleString()} t-CO₂`, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: t('p3.total'), value: `${scopeData.total.toLocaleString()} t-CO₂`, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((card) => (
              <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-white`}>
                <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs text-gray-400 mt-1">{t('p3.year')}：{scopeData.year}</div>
              </div>
            ))}
          </div>

          {/* Scope bar chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-semibold text-gray-600 mb-3">{t('p3.chartTitle')}</div>
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
            <span className="text-sm font-semibold text-gray-700">{t('p3.docTitle')}</span>
          </div>
          <div className="space-y-3">
            {scopeData.documents.map((doc, i) => (
              <div key={doc.name} className="flex items-center justify-between">
                <span className="text-xs text-gray-700">{docNames[i]}</span>
                <DocStatusBadge status={doc.status} t={t} />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{t('p3.completeness')}</span>
              <span className="text-xs font-semibold text-gray-700">{completeness}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-shell-green rounded-full" style={{ width: `${completeness}%` }} />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400 leading-relaxed">
            {t('p3.verificationStatus')}：{scopeData.verificationStatus}
          </div>
        </div>
      </div>

      {/* Onboarding Readiness Indicators */}
      <div className="bg-gradient-to-br from-shell-green/5 to-shell-teal/5 border border-shell-green/20 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-shell-green-dark mb-4">{t('p3.readinessTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: t('p3.readinessCompleteness'), value: '92%' },
            { label: t('p3.readinessLevel'),        value: t('p3.readinessLevelVal') },
            { label: t('p3.readinessPlannable'),     value: '3,200 t-CO₂' },
            { label: t('p3.readinessUse'),           value: t('p3.readinessUseVal') },
          ].map((item) => (
            <div key={item.label} className="bg-white/70 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="text-sm font-semibold text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark self-start">
            <PlayCircle size={13} /> {t('p3.ctaGenerate')}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-shell-green text-shell-green text-sm font-semibold rounded-lg hover:bg-shell-green/5 self-start">
            <ShoppingCart size={15} /> {t('p3.ctaBuy')}
          </button>
        </div>
      </div>

      {/* Bottom half: J-Credit status */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-5">{t('p3.jcreditTitle')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            {[
              { label: t('p3.jcDataCompleteness'), value: scopeData.jcredit.dataCompleteness },
              { label: t('p3.jcPlannable'), value: `${scopeData.jcredit.plannableAmount.toLocaleString()} t-CO₂` },
              { label: t('p3.jcRecommendedUse'), value: scopeData.jcredit.recommendedUse },
              { label: t('p3.jcRecommendedType'), value: scopeData.jcredit.recommendedType },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="text-xs text-gray-400 w-32 shrink-0">{item.label}</div>
                <div className="text-sm font-medium text-gray-800">{item.value}</div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400 w-32">{t('p3.jcCanProceed')}</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scopeData.jcredit.canProceed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {scopeData.jcredit.canProceed ? t('p3.jcYes') : t('p3.jcNo')}
              </span>
            </div>
          </div>

          {/* Application progress steps */}
          <div>
            <div className="text-xs text-gray-500 mb-3 font-medium">{t('p3.progressTitle')}</div>
            <div className="space-y-2">
              {jcStepKeys.map((step, i) => {
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
          <p className="text-xs text-amber-700 leading-relaxed">{t('p3.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
