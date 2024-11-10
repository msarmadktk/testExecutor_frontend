import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const page = () => {
    const { user } = useUser();
    const router = useRouter();
  
    useEffect(() => {
      if (user) {
        const addUserToBackend = async () => {
          try {
            // Extract user data including custom metadata
            const response = await axios.post('/api/users', {
              username: user.username , // Adjust as needed
              email: user.primaryEmailAddress?.emailAddress,
              role: user.unsafeMetadata.role , // Replace with actual metadata key
              password: 'default_password', // Replace with actual password logic if applicable
            });
  
            if (response.status === 201 || response.status === 200) {
              console.log('User added successfully');
              router.push('/select-role'); // Redirect as needed
            } else {
              console.error('Failed to add user:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
        addUserToBackend();
      }
    }, [user, router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2">
      <div className="w-full h-full bg-white rounded-full"></div>
    </div>
  </div>
  )
}

export default page