import { SaveCard } from '@/components/SaveCard';
import { Header } from '@/components/Header';
import { mockSaves } from '@/data/mockData';

export default function Feed() {
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="feed-container space-y-4">
        {mockSaves.map((save, index) => (
          <div 
            key={save.id}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <SaveCard save={save} />
          </div>
        ))}
      </main>
    </div>
  );
}
