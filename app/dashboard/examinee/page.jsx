"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const Admin = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user?.unsafeMetadata?.role;
      if (userRole) {
        setRole(userRole); // Set role state for conditional rendering
        router.push(`/dashboard/${userRole}`);
      } else {
        router.push('/select-role');
      }
    }
  }, [isSignedIn, user, router]);

  if (role === 'examinee') {
    return <div>Examinee</div>
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
      </div>
    );
  }
};

export default Admin;
