import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboarded = localStorage.getItem('marginalia_onboarded');
    if (onboarded) {
      setHasOnboarded(true);
    } else {
      setHasOnboarded(false);
      navigate('/onboarding');
    }
  }, [navigate]);

  if (hasOnboarded === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Redirect to feed if onboarded
  if (hasOnboarded) {
    navigate('/feed');
    return null;
  }

  return null;
}
