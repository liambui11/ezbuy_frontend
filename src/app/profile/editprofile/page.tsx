"use client";

import { useState } from "react";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    name: "Nguyen Ngoc Long",
    email: "long.nguyen@example.com",
    phone: "+84 987 654 321",
    address: "123 Nguyen Trai, District 1, Ho Chi Minh City",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
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
