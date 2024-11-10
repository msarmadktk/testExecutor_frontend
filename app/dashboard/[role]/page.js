'use client'
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage({ params }) {
  const { role } = params;
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const validateAccess = () => {
      if (isAuthLoaded && isUserLoaded && user) {
        const username = user.username;
        const lowerUsername = username.toLowerCase();
        
        // Verify user has access to this dashboard
        const hasAccess = 
          (role === 'admin' && lowerUsername.includes('admin')) ||
          (role === 'examiner' && lowerUsername.includes('examiner')) ||
          (role === 'examinee' && !lowerUsername.includes('admin') && !lowerUsername.includes('examiner'));

        if (!hasAccess) {
          router.push('/'); // Redirect to home if unauthorized
        }
      }
    };

    validateAccess();
  }, [isAuthLoaded, isUserLoaded, user, role, router]);

  if (!isAuthLoaded || !isUserLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard for {role}</h1>
      {/* Add your dashboard content here */}
    </div>
  );
} 