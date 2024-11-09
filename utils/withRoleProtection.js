import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const withRoleProtection = (allowedRoles) => (WrappedComponent) => {
  return (props) => {
    const { user, isSignedIn } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!isSignedIn) {
        // Redirect to login if the user is not signed in
        router.push('/sign-in');
        return;
      }

      const userRole = user?.unsafeMetadata?.role;
      if (!allowedRoles.includes(userRole)) {
        // If the user doesn't have the required role, redirect to an error or forbidden page
        router.push('/forbidden');
        return;
      }

      setIsLoading(false); // Allow the component to render once the user is authenticated and authorized
    }, [isSignedIn, user, router, allowedRoles]);

    // Show a loading state while the role check is happening
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};
