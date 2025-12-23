import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
}

export function Header({ title = 'Marginalia', showNotifications = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="feed-container !py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl font-semibold text-foreground">
          {title}
        </h1>
        {showNotifications && (
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors press-effect">
            <Bell className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}
