'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin' },
        // Add more items here as needed
    ];

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
            >
                <div className="p-6 flex items-center justify-between">
                    <h1
                        className={`font-bold text-xl text-indigo-500 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                    >
                        GameHub
                    </h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    >
                        {isSidebarOpen ? '←' : '→'}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            <span className="font-medium">{isSidebarOpen ? item.name : item.name[0]}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                        <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
                        <span className={`${isSidebarOpen ? 'hidden' : 'block'}`}>⏻</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
