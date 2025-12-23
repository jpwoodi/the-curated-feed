import { useState } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { SaveCard } from '@/components/SaveCard';
import { mockSaves, mockTags, mockUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Tab = 'tags' | 'people';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('tags');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagSaves = selectedTag 
    ? mockSaves.filter(save => save.tags.includes(selectedTag))
    : [];

  return (
    <div className="min-h-screen pb-24">
      <Header title="Explore" showNotifications={false} />
      
      <main className="feed-container py-4 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tags or people..."
            className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary rounded-xl">
          {(['tags', 'people'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedTag(null);
              }}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize",
                activeTab === tab
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'tags' && !selectedTag && (
          <div className="space-y-2">
            {mockTags.map((tag, index) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.name)}
                className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-accent transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="font-medium text-foreground">{tag.name}</span>
                <span className="text-sm text-muted-foreground">{tag.saveCount} saves</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'tags' && selectedTag && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedTag(null)}
              className="text-sm text-primary font-medium"
            >
              ← Back to tags
            </button>
            <h2 className="font-serif text-xl font-semibold">{selectedTag}</h2>
            {tagSaves.map((save, index) => (
              <div 
                key={save.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SaveCard save={save} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="space-y-3">
            {mockUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 bg-card rounded-xl animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-medium text-secondary-foreground shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
                </div>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground press-effect">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
