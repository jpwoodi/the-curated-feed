import { useState } from 'react';
import { ArrowLeft, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TagPill } from '@/components/TagPill';
import { mockTags } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function SaveArticle() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [articleData, setArticleData] = useState<{ title: string; source: string } | null>(null);

  const handleUrlPaste = async (value: string) => {
    setUrl(value);
    if (value.startsWith('http')) {
      setIsLoading(true);
      // Simulate fetching article metadata
      await new Promise(resolve => setTimeout(resolve, 800));
      setArticleData({
        title: 'The Future of Intelligence',
        source: 'The Atlantic',
      });
      setIsFetched(true);
      setIsLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    // In real app, would save to backend
    navigate('/');
  };

  const canSave = isFetched && articleData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="feed-container !py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-lg font-medium">Save Article</h1>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all press-effect",
              canSave
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Save
          </button>
        </div>
      </header>

      <main className="feed-container space-y-6 py-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Paste article link
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlPaste(e.target.value)}
              placeholder="https://"
              className="w-full pl-12 pr-12 py-4 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {isLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
            )}
            {isFetched && !isLoading && (
              <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            )}
          </div>
        </div>

        {/* Fetched Article Preview */}
        {articleData && (
          <div className="bg-card rounded-xl p-5 border border-border animate-fade-in">
            <p className="source-badge mb-2">{articleData.source}</p>
            <h2 className="article-title text-lg">{articleData.title}</h2>
          </div>
        )}

        {/* Annotation */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Add a note <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <textarea
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value.slice(0, 140))}
            placeholder="Why is this worth reading?"
            rows={3}
            className="w-full px-4 py-4 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {annotation.length}/140
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Tags <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {mockTags.slice(0, 8).map(tag => (
              <TagPill
                key={tag.id}
                tag={tag.name}
                isSelected={selectedTags.includes(tag.name)}
                onClick={() => toggleTag(tag.name)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div className="flex items-center justify-between py-4 border-t border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Public</p>
            <p className="text-xs text-muted-foreground">Others can see this save</p>
          </div>
          <button className="w-12 h-7 rounded-full bg-primary relative transition-colors">
            <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-primary-foreground shadow-soft transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}
