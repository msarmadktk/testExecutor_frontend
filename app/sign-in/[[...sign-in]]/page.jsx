'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function Page() {
<<<<<<< HEAD

  return (
    <div className='flex justify-center items-center mt-8'>
      <SignIn fallbackRedirectUrl={'/welcome'} />
=======
  const { user, isSignedIn } = useUser();
  const [redirectUrl, setRedirectUrl] = useState('/dashboard');
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      // Check the user's role in the metadata and set the redirect URL accordingly
      const role = user?.unsafeMetadata?.role;
      if (role) {
        setRedirectUrl(`/dashboard/${role}`); // Constructing URL string using template literals
      } else {
        setRedirectUrl('/select-role'); // Fallback if no role is set
      }
    }

  }, [isSignedIn, user, redirectUrl]); // Added `redirectUrl` as a dependency to log updates

  return (
    <div className='flex justify-center items-center mt-8'>
      <SignIn fallbackRedirectUrl={redirectUrl} />
>>>>>>> 45616613b094560e165abff8832d47fd85b9c2b7
    </div>
  );
}