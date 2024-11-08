'use client'
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'; 
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/sign-in');
  };

  return (
    <div className='flex justify-between items-center mt-2'>
      <div className='flex items-center'>
        <p className='text-3xl mx-2 font-bold'>Logo</p>
      </div>
      <div className='flex justify-between w-[25%]'>
        <p>Home</p>
        <p>Pricing</p>
        <p>About Us</p>
      </div>
      <div className='flex justify-between items-center mx-2'>
        <SignedOut>
          <Button onClick={handleLogin} >Sign In</Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
