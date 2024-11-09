'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
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

  // Handle form submission to update metadata
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
