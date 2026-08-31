"use client";

import * as React from "react";

import { NavMain } from "@/components/AdminDashboard_sidebar/nav-main";
import { NavSecondary } from "@/components/AdminDashboard_sidebar/nav-secondary";
import { NavUser } from "@/components/AdminDashboard_sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  Gauge,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <Gauge />,
      status: true,
    },
    {
      title: "Courses",
      url: "/admin/courses/page/1",
      icon: <ListIcon />,
      status: true,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
      status: false,
    },
    {
      title: "Projects",
      url: "#",
      icon: <FolderIcon />,
      status: false,
    },
    {
      title: "Team",
      url: "#",
      icon: <UsersIcon />,
      status: false,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <CameraIcon />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link
                href="/"
                className="flex flex-row items-center justify-center gap-1"
              >
                <Image src={logo} alt="website-logo" width={20} height={20} />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
