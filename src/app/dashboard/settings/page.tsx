"use client";
import DashLayout from "@/layout/DashLayout";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { users } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

type Props = {};

const SettingsPage = (props: Props) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>();
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await db.query.users.findFirst({
        where: eq(users.email, user?.emailAddresses[0].emailAddress || ""),
      });
      if (response) {
        setUserData(response);
        console.log(response);
      }
    };
    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    setIsEdited(true);
  };

  const handleSave = async () => {
    const response = await db.update(users).set({
      name: userData?.name,
      email: userData?.email,
      occupation: userData?.occupation,
    }).where(eq(users.id, userData?.id));
    if (response) {
    //   toast.success("User details updated successfully");
        console.log("User details updated successfully");
    } else {
    //   toast.error("Failed to update user details");
        console.log("Failed to update user details");
    }
    setIsEdited(false);
  };

  if (!user) {
    router.push('/login');
  }
  if (!userData) {
    return <div className="flex justify-center items-center h-full w-full text-4xl text-white font-bold">Loading...</div>;
  }

  return (
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-white min-w-4xl mx-auto m-10">
        <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
        <form className="space-y-6">
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-400">
                FullName
              </label>
              <input
                type="text"
                className="mt-2 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                placeholder="Enter your first name"
                value={userData?.name || ""}
                onChange={(e) => {
                    setIsEdited(true);
                    setUserData({ ...userData, name: e.target.value })
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="mt-2 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              placeholder="Enter your email"
              value={userData?.email || ""}
              onChange={(e) => {
                setIsEdited(true);
                setUserData({ ...userData, email: e.target.value })
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Occupation
            </label>
            <select
              value={userData?.occupation || ""}
              onChange={(e) => {
                setIsEdited(true);
                setUserData({ ...userData, occupation: e.target.value })
              }}
              className="mt-2 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            >
              <option value="">Select your occupation</option>
              <option value="student">Student</option>
              <option value="employed">Employed</option>
              <option value="self_employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={!isEdited}
              >
                Save Changes
              </button>
          </div>
      </form>
    </div>
  );
};

export default SettingsPage;
