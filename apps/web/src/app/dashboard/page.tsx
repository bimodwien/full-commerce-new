'use client';

import React, { Suspense, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/Sidebar';
import { ProductList } from '@/components/ProductList';

const Dashboard = () => {
  useEffect(() => {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    });
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden lg:flex-row w-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto w-full">
          <header className="flex items-center h-16 px-2 border-b bg-white">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-bold ml-4">Dashboard</h1>
          </header>
          <main className="p-6 w-full">
            <Suspense fallback={<div>Loading Product List...</div>}>
              <ProductList />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
