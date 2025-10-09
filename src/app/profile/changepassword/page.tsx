"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password changed successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
        Change Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary-700 transition font-medium"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
