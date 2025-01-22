'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Package,
  LayoutGrid,
  PlusCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import Logout from './Logout';

export function Sidebar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <ShadcnSidebar className="w-64 h-screen flex flex-col">
      <SidebarHeader>
        <h2 className="text-xl font-bold p-4">TokoPaBimo Dashboard</h2>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span>Products</span>
                  {isProductsOpen ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </SidebarMenuButton>
                {isProductsOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <Link href="/dashboard" passHref legacyBehavior>
                        <SidebarMenuButton asChild>
                          <a>
                            <span>All Products</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link
                        href="/dashboard/create-product"
                        passHref
                        legacyBehavior
                      >
                        <SidebarMenuButton asChild>
                          <a>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Create Product</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>Categories</span>
                  {isCategoriesOpen ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </SidebarMenuButton>
                {isCategoriesOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <Link href="/dashboard/category" passHref legacyBehavior>
                        <SidebarMenuButton asChild>
                          <a>
                            <span>All Categories</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link
                        href="/dashboard/create-category"
                        passHref
                        legacyBehavior
                      >
                        <SidebarMenuButton asChild>
                          <a>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Create Category</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 flex justify-start items-start">
        <Logout />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
