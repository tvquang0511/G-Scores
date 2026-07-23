import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
