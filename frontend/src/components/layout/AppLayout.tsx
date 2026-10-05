import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Layers, LayoutDashboard, Monitor, Briefcase, FileText,
  BarChart3, Search, Settings, LogOut, ExternalLink,
} from 'lucide-react';

const managementNav = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Hero Section', href: '/hero-section', icon: LayoutDashboard },
];

const configNav = [
  { label: 'Settings', href: '#', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavLink = ({ item }: { item: typeof managementNav[0] }) => {
    const active = router.pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
          active
            ? 'bg-indigo-500/[0.08] text-indigo-600 font-medium'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="h-screen overflow-hidden flex font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 w-64 h-screen flex flex-col border-r glass-border bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Folioku</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-4">Management</div>
          {managementNav.map((item) => <NavLink key={item.label} item={item} />)}

          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-8">Configuration</div>
          {configNav.map((item) => <NavLink key={item.label} item={item} />)}
        </nav>

        <div className="p-4 border-t glass-border bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl border glass-border shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">Julian Design</p>
              <p className="text-[10px] text-slate-500 truncate">Pro Account</p>
            </div>
            <button type="button" className="text-slate-400 hover:text-slate-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#fcfdfe]">
        <header className="h-16 bg-white border-b glass-border px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden mr-2 text-slate-600" onClick={() => setSidebarOpen(true)}>
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-slate-900">Portfolio Overview</h1>
            <span className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium">Site Live</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg border glass-border transition-all">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Site
            </button>
            <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium shadow-sm shadow-indigo-200 transition-all">
              Deploy Changes
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}