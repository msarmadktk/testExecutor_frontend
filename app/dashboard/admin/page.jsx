"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const AdminDashboard = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user?.unsafeMetadata?.role;
      if (userRole === 'admin') {
        setRole(userRole);
        fetchData();
      } else {
        router.push(`/dashboard/${userRole}`);
      }
    } else {
      router.push('/sign-in');
    }
  }, [isSignedIn, user, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, queriesResponse] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/queries'),
      ]);
      setUsers(usersResponse.data);
      setQueries(queriesResponse.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveQuery = async (queryId) => {
    try {
      await axios.post(`/api/queries/${queryId}/resolve`);
      fetchData(); // Refresh data after resolving
    } catch (error) {
      console.error('Error resolving query', error);
    }
  };

  const handleManageCredits = (examinerId) => {
    // Implement credit management logic here
    router.push(`/admin/manage-credits/${examinerId}`);
  };

  const handleSendNotification = (userId) => {
    // Implement notification logic here
    router.push(`/admin/send-notification/${userId}`);
  };

  if (role !== 'admin' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem.userID}>
                <td className="border px-4 py-2">{userItem.userID}</td>
                <td className="border px-4 py-2">{userItem.name}</td>
                <td className="border px-4 py-2">{userItem.email}</td>
                <td className="border px-4 py-2 capitalize">{userItem.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  {userItem.role === 'examiner' && (
                    <Button onClick={() => handleManageCredits(userItem.userID)}>
                      Manage Credits
                    </Button>
                  )}
                  <Button onClick={() => handleSendNotification(userItem.userID)}>
                    Send Notification
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Queries Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Queries</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Query ID</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.queryID}>
                <td className="border px-4 py-2">{query.queryID}</td>
                <td className="border px-4 py-2">{query.content}</td>
                <td className="border px-4 py-2">
                  {new Date(query.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{query.status}</td>
                <td className="border px-4 py-2">
                  {query.status !== 'Resolved' && (
                    <Button onClick={() => handleResolveQuery(query.queryID)}>
                      Resolve
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
