"use client";

import { Profile } from "@/features/profile/types";
import { useEffect, useState } from "react";
import { fetchUpdateUsers,fetchUsers } from "@/features/profile/services";
import Image from "next/image";

export default function EditProfilePage() {
  const [form, setForm] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    userAvatar: "",
  });
  
  

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUsers();
        setForm(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

    // 📌 Gửi cập nhật hồ sơ
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const updated = await fetchUpdateUsers(form, file || undefined);
        setForm(updated);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile!");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* <div className="flex justify-center items-center">
          <Image 
            src={form?.userAvatar || "/images/profile/default-avatar.jpg"}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full border-2 border-primary"
          />
          
          <label
            htmlFor="avatar"
            className="block mt-3 cursor-pointer text-primary hover:underline"
          >
            Change Avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName || ""}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form?.phone || ""}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-700 transition font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
