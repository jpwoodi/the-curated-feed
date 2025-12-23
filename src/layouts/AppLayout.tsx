import { Outlet } from 'react-router-dom';
import { MobileNav } from '@/components/MobileNav';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <MobileNav />
    </div>
  );
}
