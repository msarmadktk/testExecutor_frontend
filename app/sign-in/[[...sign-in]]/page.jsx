'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function Page() {
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

    // Print the redirect URL for debugging
    console.log('Redirect URL:', redirectUrl);

    // Add a short delay before rendering the <SignIn> component
    const timer = setTimeout(() => {
      setIsReadyToRender(true);
    }, 1000); // Adjust the delay as needed (e.g., 1000ms for 1 second)

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, [isSignedIn, user, redirectUrl]); // Added `redirectUrl` as a dependency to log updates

  return (
    <div className='flex justify-center items-center mt-8'>
      {isReadyToRender && <SignIn fallbackRedirectUrl={redirectUrl} />}
    </div>
  );
}
