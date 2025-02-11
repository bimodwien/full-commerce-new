'use client';

import React from 'react';
import CategoryList from '@/components/CategoryList';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/Sidebar';

const Category = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto w-full">
          <header className="flex items-center h-16 px-2 border-b bg-white">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-bold ml-4">Categories</h1>
          </header>
          <main className="p-6">
            <CategoryList />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Category;
