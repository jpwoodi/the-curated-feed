import { Settings, Share2 } from 'lucide-react';
import { currentUser, mockSaves } from '@/data/mockData';
import { SaveCard } from '@/components/SaveCard';
import { TagPill } from '@/components/TagPill';

export default function Profile() {
  const userSaves = mockSaves.slice(0, 4);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="feed-container !py-4 flex items-center justify-between">
          <h1 className="font-serif text-lg font-medium">Profile</h1>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="feed-container py-6 space-y-6">
        {/* Profile info */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center text-2xl font-serif font-medium text-secondary-foreground">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold text-foreground">
              {currentUser.name}
            </h2>
            <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
          </div>
          {currentUser.bio && (
            <p className="text-sm text-foreground max-w-xs mx-auto leading-relaxed">
              {currentUser.bio}
            </p>
          )}
        </div>

        {/* Stats - subtle, not emphasized */}
        <div className="flex justify-center gap-8 py-4 border-y border-border">
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">{currentUser.followerCount}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">{currentUser.followingCount}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">{userSaves.length}</p>
            <p className="text-xs text-muted-foreground">Saves</p>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.interests.map(interest => (
              <TagPill key={interest} tag={interest} size="sm" />
            ))}
          </div>
        </div>

        {/* Saved articles */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Recent Saves
          </h3>
          {userSaves.map((save, index) => (
            <div 
              key={save.id}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SaveCard save={save} showUser={false} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
