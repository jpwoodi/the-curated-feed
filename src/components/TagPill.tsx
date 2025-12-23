import { cn } from '@/lib/utils';

interface TagPillProps {
  tag: string;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function TagPill({ tag, isSelected, onClick, size = 'md' }: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all press-effect",
        size === 'sm' ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm",
        isSelected
          ? "bg-primary text-primary-foreground shadow-soft"
          : "bg-secondary text-secondary-foreground hover:bg-accent"
      )}
    >
      {tag}
    </button>
  );
}
