import React from 'react';
import SideNav from '../ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="md:overlfow-y-auto flex-grow p-6 md:p-12">{children}</div>
    </div>
  );
}
