import { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { Header } from '@/components/Header';
import { SaveCard } from '@/components/SaveCard';
import { TagPill } from '@/components/TagPill';
import { mockSaves, mockTags } from '@/data/mockData';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'grid';
type FilterMode = 'all' | 'public' | 'private';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const mySaves = mockSaves.filter(save => save.isSavedToLibrary);

  const filteredSaves = mySaves.filter(save => {
    if (selectedTag && !save.tags.includes(selectedTag)) return false;
    if (searchQuery && !save.articleTitle.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterMode === 'public' && !save.isPublic) return false;
    if (filterMode === 'private' && save.isPublic) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-24">
      <Header title="Library" showNotifications={false} />
      
      <main className="feed-container py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'public', 'private'] as FilterMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize",
                  filterMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                viewMode === 'list' ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                viewMode === 'grid' ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <TagPill
            tag="All"
            isSelected={!selectedTag}
            onClick={() => setSelectedTag(null)}
            size="sm"
          />
          {mockTags.slice(0, 6).map(tag => (
            <TagPill
              key={tag.id}
              tag={tag.name}
              isSelected={selectedTag === tag.name}
              onClick={() => setSelectedTag(tag.name === selectedTag ? null : tag.name)}
              size="sm"
            />
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredSaves.length} article{filteredSaves.length !== 1 ? 's' : ''}
        </p>

        {/* Saves */}
        <div className="space-y-4">
          {filteredSaves.length > 0 ? (
            filteredSaves.map((save, index) => (
              <div 
                key={save.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SaveCard save={save} showUser={false} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
