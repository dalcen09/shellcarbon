import { useState } from 'react';
import { Copy, Download, Save, Send, FileEdit, AlertCircle, Lock } from 'lucide-react';
import { esgDocuments } from '../data/mockData';

type PlanType = 'professional' | 'enterprise';

export default function Page4ESG() {
  const [plan] = useState<PlanType>('professional');
  const [selectedDoc, setSelectedDoc] = useState<string>('esg-para');
  const [draftContent, setDraftContent] = useState<string>(
    esgDocuments.drafts['esg-para'] || ''
  );
  const [generated, setGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const allDocs = plan === 'enterprise'
    ? [...esgDocuments.professional, ...esgDocuments.enterprise]
    : esgDocuments.professional;

  function handleSelectDoc(id: string, isLocked: boolean) {
    if (isLocked) return;
    setSelectedDoc(id);
    setDraftContent(esgDocuments.drafts[id] || `【${allDocs.find(d => d.id === id)?.label} 草稿】\n\n點擊「產生草稿」以產出此文件的範本內容。`);
    setGenerated(!!esgDocuments.drafts[id]);
  }

  function handleGenerate() {
    const doc = allDocs.find(d => d.id === selectedDoc);
    if (!doc) return;
    setDraftContent(esgDocuments.drafts[selectedDoc] ||
      `【${doc.label} 草稿】\n\n台灣綠能科技股份有限公司已完成 2023 年度碳盤查，\n並透過 ShellCarbon 平台持有 J-Credit 認證碳信用額度。\n\n本文件為系統自動產出草稿，請依需求調整後使用。\n\n⚠️ 系統產出為草稿；企業正式使用前需自行依法務、會計、ESG 顧問與揭露規範確認。`
    );
    setGenerated(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(draftContent).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ESG 文件產出</h1>
          <p className="text-sm text-gray-500 mt-1">產出 ESG 報告段落、供應鏈揭露與核准文件草稿</p>
        </div>
        <div className="flex items-center gap-2 bg-shell-green/10 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-shell-green" />
          <span className="text-xs font-semibold text-shell-green capitalize">{plan} 版</span>
        </div>
      </div>

      {/* Top: Document type icons */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Professional 文件</div>
          <div className="flex flex-wrap gap-3">
            {esgDocuments.professional.map((doc) => {
              const isSelected = selectedDoc === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoc(doc.id, false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? 'bg-shell-green text-white border-shell-green shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-shell-green/40 hover:bg-shell-green/5'
                  }`}
                >
                  <span>{doc.icon}</span>
                  <span>{doc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Enterprise 文件</div>
            {plan !== 'enterprise' && (
              <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">需升級</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {esgDocuments.enterprise.map((doc) => {
              const isLocked = plan !== 'enterprise';
              const isSelected = selectedDoc === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoc(doc.id, isLocked)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    isLocked
                      ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                      : isSelected
                      ? 'bg-shell-green text-white border-shell-green'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-shell-green/40'
                  }`}
                >
                  <span>{doc.icon}</span>
                  <span>{doc.label}</span>
                  {isLocked && <Lock size={12} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Editor */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileEdit size={14} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              {allDocs.find(d => d.id === selectedDoc)?.label || '文件內容'}
            </span>
            {generated && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">草稿已產生</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              className="px-3 py-1.5 text-xs bg-shell-green text-white rounded-lg hover:bg-shell-green-dark transition-colors"
            >
              產生草稿
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <Copy size={12} />
              {copied ? '已複製' : '複製文字'}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Download size={12} /> 匯出 Word
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Download size={12} /> 匯出 PDF
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Save size={12} /> 儲存草稿
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send size={12} /> 送出內部確認
            </button>
          </div>
        </div>

        {/* Text area */}
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          rows={14}
          className="w-full px-5 py-4 text-sm text-gray-800 resize-none focus:outline-none font-mono leading-relaxed"
          placeholder="請先選擇文件類型，再點擊「產生草稿」。"
        />

        {/* Footer disclaimer */}
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex gap-2">
          <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            系統產出為草稿；企業正式使用前需自行依法務、會計、ESG 顧問與揭露規範確認。本平台不對文件內容的合規性提供保證。
          </p>
        </div>
      </div>
    </div>
  );
}
