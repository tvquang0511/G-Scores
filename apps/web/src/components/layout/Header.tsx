import { NavLink } from 'react-router-dom';
import { GraduationCap, Search, BarChart3, Trophy } from 'lucide-react';

const navItems = [
  { path: '/lookup', label: 'Lookup', icon: Search },
  { path: '/statistics', label: 'Statistics', icon: BarChart3 },
  { path: '/ranking', label: 'Ranking', icon: Trophy },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <NavLink to="/lookup" className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">G-Scores</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
