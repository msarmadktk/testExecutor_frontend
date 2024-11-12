'use client';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/nextjs'; // Import useUser to get user data
import axios from 'axios'; // Import axios
import Image from "next/image";

export default function Home() {
  const { user } = useUser(); // Get user details
  const handleAddUser = async () => {
    if (user) {
      try {
        // Send a POST request to add user details to your backend
        const response = await axios.post('http://localhost:8080/api/users', {
          username: user.username , // Use a fallback if username is not available
          email: user.primaryEmailAddress?.emailAddress,
          role: user.unsafeMetadata.role , // Replace with actual role metadata key
          password: 'default_password', // Replace with your password logic if needed
        });

        if (response.status === 201 || response.status === 200) {
          console.log('User added successfully:', response.data);
          alert('User added successfully!');
        } else {
          console.error('Failed to add user:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding user:', error.response ? error.response.data : error.message);
        alert('Failed to add user.');
      }
    } else {
      console.error('No user data available.');
      alert('User not logged in.');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center w-full h-[60vh]">
        <h1 className="text-3xl font-bold">Welcome to Home page</h1>
      </div>

      <div className="flex justify-center mt-4">
        {/* Button to send user details to the backend */}
        <Button onClick={handleAddUser}>Add User to Database</Button>
      </div>
    </div>
  );
}
