import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings2,
  BarChart3,
  FileText,
  Globe,
  Cpu,
} from 'lucide-react';

const navItems = [
  { to: '/', label: '企業總覽', icon: LayoutDashboard, page: 'P1' },
  { to: '/operations', label: '企業操作', icon: Settings2, page: 'P2' },
  { to: '/scope', label: 'Scope 1/2', icon: BarChart3, page: 'P3' },
  { to: '/esg', label: 'ESG 文件', icon: FileText, page: 'P4' },
  { to: '/market', label: 'J-Credit 市場', icon: Globe, page: 'P5' },
  { to: '/engine', label: '主引擎', icon: Cpu, page: 'P6' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-shell-dark text-white flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-shell-green flex items-center justify-center text-white font-bold text-sm">S</div>
            <div>
              <div className="font-semibold text-sm leading-tight">ShellCarbon</div>
              <div className="text-xs text-gray-400 leading-tight">J-Credit Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, page }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
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
              <span className="ml-auto text-xs opacity-40">{page}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 text-xs text-gray-500">
          <div>Demo v1.0</div>
          <div>示範資料僅供參考</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
