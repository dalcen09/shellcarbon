import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, Save, Send, FileEdit, AlertCircle, Lock, Package, ExternalLink, ArrowUpRight } from 'lucide-react';
import { esgDocuments } from '../data/mockData';

type PlanType = 'professional' | 'enterprise';

const proDocIds = ['esg-para', 'supply-chain', 'credit-summary', 'brief-summary'];
const entDocIds = ['tx-proof', 'cancel-proof', 'credit-source', 'purpose-doc', 'internal-approval', 'esg-chapter', 'advisor-confirm', 'risk-note'];
const docIcons: Record<string, string> = {
  'esg-para': '📄', 'supply-chain': '🔗', 'credit-summary': '📊', 'brief-summary': '📋',
  'tx-proof': '✅', 'cancel-proof': '🔖', 'credit-source': '🗂️', 'purpose-doc': '📝',
  'internal-approval': '🏛️', 'esg-chapter': '📖', 'advisor-confirm': '🤝', 'risk-note': '⚠️',
};

export default function Page4ESG() {
  const { t } = useTranslation();
  const [plan] = useState<PlanType>('professional');
  const [selectedDoc, setSelectedDoc] = useState<string>('esg-para');
  const [draftContent, setDraftContent] = useState<string>(
    esgDocuments.drafts['esg-para'] || ''
  );
  const [generated, setGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const allDocIds = plan === 'enterprise' ? [...proDocIds, ...entDocIds] : proDocIds;

  function handleSelectDoc(id: string, isLocked: boolean) {
    if (isLocked) return;
    setSelectedDoc(id);
    setDraftContent(esgDocuments.drafts[id] || `【${t(`p4.docs.${id}`)}】\n\n${t('p4.placeholder')}`);
    setGenerated(!!esgDocuments.drafts[id]);
  }

  function handleGenerate() {
    const label = t(`p4.docs.${selectedDoc}`);
    setDraftContent(esgDocuments.drafts[selectedDoc] ||
      `【${label}】\n\nTaiwan Green Energy Technology Co., Ltd.\n\n${t('p4.placeholder')}\n\n⚠️ ${t('p4.disclaimer')}`
    );
    setGenerated(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(draftContent).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('p4.title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('p4.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 bg-shell-green/10 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-shell-green" />
          <span className="text-xs font-semibold text-shell-green">{t(`common.plan.${plan}`)} {t('p4.planBadge')}</span>
        </div>
      </div>

      {/* Supply chain client reply pack button */}
      <div className="bg-gradient-to-br from-shell-green/5 to-shell-teal/5 border border-shell-green/20 rounded-xl p-4 flex items-start gap-4">
        <div className="p-2.5 bg-shell-green/10 rounded-lg flex-shrink-0">
          <Package size={18} className="text-shell-green" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800 mb-0.5">{t('p4.supplyChainPackBtn')}</div>
          <p className="text-xs text-gray-500 leading-relaxed">{t('p4.supplyChainPackDesc')}</p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark">
          <ArrowUpRight size={13} /> {t('p4.supplyChainPackBtn')}
        </button>
      </div>

      {/* Top: Document type icons */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t('p4.proSection')}</div>
          <div className="flex flex-wrap gap-3">
            {proDocIds.map((id) => {
              const isSelected = selectedDoc === id;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectDoc(id, false)}
                  className={`flex flex-col items-start px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? 'bg-shell-green text-white border-shell-green shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-shell-green/40 hover:bg-shell-green/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{docIcons[id]}</span>
                    <span>{t(`p4.docs.${id}`)}</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>{t(`p4.docPurposes.${id}`)}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('p4.entSection')}</div>
            {plan !== 'enterprise' && (
              <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">{t('p4.upgradeRequired')}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {entDocIds.map((id) => {
              const isLocked = plan !== 'enterprise';
              const isSelected = selectedDoc === id;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectDoc(id, isLocked)}
                  className={`flex flex-col items-start px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    isLocked
                      ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                      : isSelected
                      ? 'bg-shell-green text-white border-shell-green'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-shell-green/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{docIcons[id]}</span>
                    <span>{t(`p4.docs.${id}`)}</span>
                    {isLocked && <Lock size={12} />}
                  </div>
                  <div className={`text-xs mt-0.5 ${isLocked ? 'text-gray-300' : isSelected ? 'text-white/70' : 'text-gray-400'}`}>{t(`p4.docPurposes.${id}`)}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Editor */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <FileEdit size={14} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              {allDocIds.includes(selectedDoc) ? t(`p4.docs.${selectedDoc}`) : selectedDoc}
            </span>
            {generated && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">{t('p4.draftGenerated')}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button onClick={handleGenerate} className="px-3 py-1.5 text-xs bg-shell-green text-white rounded-lg hover:bg-shell-green-dark transition-colors">
              {t('p4.generateBtn')}
            </button>
            <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Copy size={12} />
              {copied ? t('p4.copiedBtn') : t('p4.copyBtn')}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Download size={12} /> {t('p4.exportWord')}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Download size={12} /> {t('p4.exportPdf')}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Save size={12} /> {t('p4.saveBtn')}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send size={12} /> {t('p4.submitBtn')}
            </button>
          </div>
        </div>

        {/* Text area */}
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          rows={14}
          className="w-full px-5 py-4 text-sm text-gray-800 resize-none focus:outline-none font-mono leading-relaxed"
          placeholder={t('p4.placeholder')}
        />

        {/* Footer disclaimer */}
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex gap-2">
          <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">{t('p4.disclaimer')}</p>
        </div>
      </div>

      {/* CTA bar */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-shell-green text-white text-xs font-semibold rounded-lg hover:bg-shell-green-dark">
          <Package size={13} /> {t('p4.ctaPack')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <Download size={13} /> {t('p4.ctaExport')}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <ExternalLink size={13} /> {t('p4.ctaEnterprise')}
        </button>
      </div>
    </div>
  );
}
