// Admin Header Component - Demonstrates PROPS
// Reusable header component for admin pages

import Link from "next/link";

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Iris Perfumes - Admin</h1>
          <p className="text-indigo-200 text-sm">{title}</p>
        </div>
        <Link href="/admin" className="hover:underline">Logout</Link>
      </div>
    </header>
  );
}
