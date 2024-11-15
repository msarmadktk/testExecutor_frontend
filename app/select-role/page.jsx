'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function SelectRole() {
  const { user, isSignedIn } = useUser();
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();

  // Handle select change
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  // Function to add user to the database
  const handleAddUser = async () => {
    if (user) {
      try {
        // Send a POST request to add user details to your backend
        const response = await axios.post('http://localhost:8080/api/users', {
          username: user.username || 'default_username', // Use a fallback if username is not available
          email: user.primaryEmailAddress?.emailAddress,
          role: selectedRole, // Use the selected role here
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

  // Handle form submission to update metadata and add user to database
  const handleSubmit = async () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }

    try {
      // Update the user's unsafe metadata with the selected role
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          role: selectedRole, // Set the selected role in the user's unsafe metadata
        },
      });

      // Call handleAddUser to send data to the backend after setting the role
      await handleAddUser();

      // Redirect after update to the new route based on the selected role
      router.push(`/dashboard/${selectedRole}`); // Redirect dynamically based on selected role
    } catch (error) {
      alert(`There was an error updating your role: ${error.message}`); // Display a more detailed error message
    }
  };

  if (!isSignedIn) {
    return <div>Please sign in first</div>; // Optional: Show a message if not signed in
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>

      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="examiner">Examiner</SelectItem>
          <SelectItem value="examinee">Examinee</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
}
