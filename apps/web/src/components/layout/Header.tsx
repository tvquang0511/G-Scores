import { NavLink } from 'react-router-dom';
import { GraduationCap, Search, BarChart3, Trophy } from 'lucide-react';

const navItems = [
  { path: '/lookup', label: 'Tra cứu', icon: Search },
  { path: '/statistics', label: 'Thống kê', icon: BarChart3 },
  { path: '/ranking', label: 'Xếp hạng', icon: Trophy },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <NavLink to="/lookup" className="flex items-center space-x-2.5 group">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm group-hover:bg-blue-700 transition-colors">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">G-Scores</span>
        </NavLink>

        {/* Navigation Links (Responsive) */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
