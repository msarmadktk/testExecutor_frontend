'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user, isSignedIn } = useUser();
  const [redirectUrl, setRedirectUrl] = useState('/welcome');
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
    </div>
  );
}
