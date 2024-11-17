"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ExaminerDashboard = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user?.unsafeMetadata?.role;
      if (userRole === "examiner") {
        setRole(userRole);
        fetchExaminersTests();
      } else {
        router.push(`/dashboard/${userRole}`);
      }
    } else {
      router.push("/sign-in");
    }
  }, [isSignedIn, user, router]);

  const fetchExaminersTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/tests/examiner/${user.id}`
      );
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = () => {
    router.push("/examiner/create-test");
  };

  const handleViewAnalytics = (testId) => {
    router.push(`/examiner/analytics/${testId}`);
  };

  const handleMakePayment = () => {
    router.push("/examiner/payments");
  };

  const handleResolveQuery = () => {
    router.push("/examiner/queries");
  };

  if (role !== "examiner" || loading) {
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
      <h1 className="text-2xl font-bold mb-6">Examiner Dashboard</h1>

      {/* Actions */}
      <div className="mb-8 space-x-4">
        <Button onClick={handleCreateTest}>Create New Test</Button>
        <Button onClick={handleMakePayment}>Make Payment</Button>
        <Button onClick={handleResolveQuery}>Resolve Queries</Button>
      </div>

      {/* Tests Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Tests</h2>
        {tests.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Test ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.testID}>
                  <td className="border px-4 py-2">{test.testID}</td>
                  <td className="border px-4 py-2">{test.title}</td>
                  <td className="border px-4 py-2">{test.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button
                      onClick={() =>
                        router.push(`/examiner/edit-test/${test.testID}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleViewAnalytics(test.testID)}
                    >
                      View Analytics
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not created any tests yet.</p>
        )}
      </section>
    </div>
  );
};

export default ExaminerDashboard;
