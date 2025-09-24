"use client";

import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
    const { user } = useUser();
    return (
        <div className="container mx-auto px-4 py-8">
            <Navbar/>
            <main className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Welcome back,  {user?.firstName || user?.username}! 
                    </h1>
                    <p className="text-gray-600">
                        Here's what's happening with your admin panel today.
                    </p>
                </div>
            </main>
        </div>
    );
}