'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, CheckSquare, Search, LogOut, Upload, Wand2, Database } from 'lucide-react';

import { signOut } from 'next-auth/react';

const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/rfp/upload', label: 'Upload RFP', icon: Upload },
    { href: '/rft/create', label: 'Create RFT', icon: FileText },
    { href: '/rft/generate', label: 'Generate RFT', icon: Wand2 },
    { href: '/rfps', label: 'RFP Discovery', icon: Search },
    { href: '/proposals', label: 'Proposals', icon: FileText },
    { href: '/approvals', label: 'Approvals', icon: CheckSquare },
    { href: '/memory', label: 'Memory', icon: Database },
];

export function Sidebar() {
    const pathname = usePathname();

    if (pathname === '/login' || pathname === '/signup') return null;

    return (
        <div className="flex flex-col w-64 h-full bg-slate-900 text-white min-h-screen">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <span className="text-xl font-bold tracking-wider">ProcureAI</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    <Icon size={20} className="mr-3" />
                                    <span className="font-medium">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex items-center w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
