import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Settings2, BarChart3, FileText, Globe, Cpu, Menu, X,
} from 'lucide-react';

const LANGUAGES = ['zh', 'en', 'ja'] as const;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.page1'), icon: LayoutDashboard },
    { to: '/operations', label: t('nav.page2'), icon: Settings2 },
    { to: '/scope', label: t('nav.page3'), icon: BarChart3 },
    { to: '/esg', label: t('nav.page4'), icon: FileText },
    { to: '/market', label: t('nav.page5'), icon: Globe },
    { to: '/engine', label: t('nav.page6'), icon: Cpu },
  ];

  const sidebarContent = (onNav?: () => void) => (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-shell-green flex items-center justify-center text-white font-bold text-sm">S</div>
          <div>
            <div className="font-semibold text-sm leading-tight">{t('nav.brand')}</div>
            <div className="text-xs text-gray-400 leading-tight">{t('nav.subtitle')}</div>
          </div>
        </div>
        {onNav && (
          <button onClick={onNav} className="md:hidden text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNav}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-shell-green text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Language switcher */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Language</div>
        <div className="flex gap-1">
          {LANGUAGES.map((lng) => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`flex-1 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                i18n.language === lng
                  ? 'bg-shell-green text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {t(`lang.${lng}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/10 text-xs text-gray-500">
        <div>{t('nav.footer')}</div>
        <div>{t('nav.footerSub')}</div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-shell-dark text-white flex items-center justify-between px-4 py-3 border-b border-white/10">
        <button onClick={() => setMobileOpen(true)} className="text-gray-300 hover:text-white">
          <Menu size={20} />
        </button>
        <div className="font-semibold text-sm">{t('nav.brand')}</div>
        <div className="w-5" />
      </div>

      {/* Mobile slide-in overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <aside className="w-64 bg-shell-dark text-white flex flex-col h-full shadow-xl">
            {sidebarContent(() => setMobileOpen(false))}
          </aside>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-shell-dark text-white flex-col">
        {sidebarContent()}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
