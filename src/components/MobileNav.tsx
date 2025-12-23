import { Home, Search, PlusSquare, Bookmark, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: PlusSquare, label: 'Save', path: '/save' },
  { icon: Bookmark, label: 'Library', path: '/library' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isSave = path === '/save';

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors press-effect",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground",
                isSave && "relative"
              )}
            >
              {isSave ? (
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center -mt-4 shadow-medium">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
              ) : (
                <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
              )}
              <span className={cn(
                "text-[10px] font-medium",
                isSave && "mt-1"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
