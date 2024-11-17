"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ExamineeDashboard = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user?.unsafeMetadata?.role;
      if (userRole === "examinee") {
        setRole(userRole);
        fetchAvailableTests();
      } else {
        router.push(`/dashboard/${userRole}`);
      }
    } else {
      router.push("/sign-in");
    }
  }, [isSignedIn, user, router]);

  const fetchAvailableTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/tests/available");
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = (testId) => {
    router.push(`/examinee/test/${testId}`);
  };

  if (role !== "examinee" || loading) {
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
      <h1 className="text-2xl font-bold mb-6">Examinee Dashboard</h1>

      {/* Available Tests */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
        {tests.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Test ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Duration</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.testID}>
                  <td className="border px-4 py-2">{test.testID}</td>
                  <td className="border px-4 py-2">{test.title}</td>
                  <td className="border px-4 py-2">{test.duration} mins</td>
                  <td className="border px-4 py-2">
                    <Button onClick={() => handleStartTest(test.testID)}>
                      Start Test
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tests available at the moment.</p>
        )}
      </section>

      {/* Additional Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="space-x-4">
          <Button onClick={() => router.push("/examinee/results")}>
            View Results
          </Button>
          <Button onClick={() => router.push("/examinee/feedback")}>
            Submit Feedback
          </Button>
          <Button onClick={() => router.push("/examinee/query")}>
            Send Query
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ExamineeDashboard;
