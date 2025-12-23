import { Save } from '@/types';
import { Heart, Bookmark, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SaveCardProps {
  save: Save;
  showUser?: boolean;
}

export function SaveCard({ save, showUser = true }: SaveCardProps) {
  const [isLiked, setIsLiked] = useState(save.isLiked);
  const [isSaved, setIsSaved] = useState(save.isSavedToLibrary);
  const [likeCount, setLikeCount] = useState(save.likeCount);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleOpen = () => {
    window.open(save.url, '_blank');
  };

  return (
    <article className="save-card animate-fade-in">
      {/* User info */}
      {showUser && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
            {save.savedBy.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {save.savedBy.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(save.savedAt, { addSuffix: true })}
            </p>
          </div>
        </div>
      )}

      {/* Article content */}
      <div className="space-y-3">
        {/* Source */}
        <p className="source-badge">{save.source}</p>

        {/* Title */}
        <h2 
          className="article-title text-lg cursor-pointer hover:text-primary transition-colors text-balance"
          onClick={handleOpen}
        >
          {save.articleTitle}
        </h2>

        {/* Annotation */}
        {save.annotation && (
          <p className="annotation">"{save.annotation}"</p>
        )}

        {/* Tags */}
        {save.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {save.tags.map(tag => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 mt-5 pt-4 border-t border-border">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors press-effect",
            isLiked 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          <span>{likeCount}</span>
        </button>

        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors press-effect",
            isSaved 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
          <span>Save</span>
        </button>

        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors press-effect ml-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Read</span>
        </button>
      </div>
    </article>
  );
}
