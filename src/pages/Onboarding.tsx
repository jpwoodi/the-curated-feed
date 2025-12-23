import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, BookOpen, Bookmark } from 'lucide-react';
import { TagPill } from '@/components/TagPill';
import { mockTags, mockUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'interests' | 'people' | 'complete';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const toggleInterest = (tag: string) => {
    setSelectedInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const togglePerson = (id: string) => {
    setSelectedPeople(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 'welcome') setStep('interests');
    else if (step === 'interests') setStep('people');
    else if (step === 'people') setStep('complete');
    else navigate('/');
  };

  const canProceed = 
    step === 'welcome' ||
    (step === 'interests' && selectedInterests.length >= 3) ||
    (step === 'people' && selectedPeople.length >= 2) ||
    step === 'complete';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ 
            width: step === 'welcome' ? '0%' 
              : step === 'interests' ? '33%' 
              : step === 'people' ? '66%' 
              : '100%' 
          }}
        />
      </div>

      <main className="flex-1 feed-container py-12 flex flex-col">
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="flex-1 flex flex-col justify-center text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Welcome to Marginalia
              </h1>
              <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Discover the articles that smart people are reading. Curate your own collection.
              </p>
            </div>
          </div>
        )}

        {/* Interests */}
        {step === 'interests' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="space-y-2 mb-8">
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                What do you read about?
              </h1>
              <p className="text-muted-foreground">
                Select at least 3 topics you're interested in.
              </p>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3">
                {mockTags.map(tag => (
                  <TagPill
                    key={tag.id}
                    tag={tag.name}
                    isSelected={selectedInterests.includes(tag.name)}
                    onClick={() => toggleInterest(tag.name)}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {selectedInterests.length} of 3 minimum selected
            </p>
          </div>
        )}

        {/* People */}
        {step === 'people' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="space-y-2 mb-6">
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                Follow curators
              </h1>
              <p className="text-muted-foreground">
                Follow at least 2 people to build your feed.
              </p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {mockUsers.map(user => {
                const isSelected = selectedPeople.includes(user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => togglePerson(user.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                      isSelected ? "bg-accent border-2 border-primary" : "bg-card border-2 border-transparent"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-medium text-secondary-foreground shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "bg-primary" : "border-2 border-border"
                    )}>
                      {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {selectedPeople.length} of 2 minimum selected
            </p>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div className="flex-1 flex flex-col justify-center text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                You're all set
              </h1>
              <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Your personalized feed is ready. Start discovering what your people are reading.
              </p>
            </div>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={cn(
            "w-full mt-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all press-effect",
            canProceed
              ? "bg-primary text-primary-foreground shadow-medium"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {step === 'complete' ? 'Start Reading' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </main>
    </div>
  );
}
