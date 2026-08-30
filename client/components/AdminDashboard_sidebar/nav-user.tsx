"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  EllipsisVerticalIcon,
  LogOutIcon,
  HomeIcon,
  LayoutDashboardIcon,
  Tv2,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export function NavUser() {
  const { isMobile } = useSidebar();

  // Get user data from redux
  const { user: userInfo, loading } = useSelector((state) => state.auth);
  console.log(userInfo, loading);

  // sample data

  const user = userInfo
    ? {
        name: userInfo.name,
        phoneNum: userInfo.phone,
        avatar: userInfo.avatar,
      }
    : {
        name: "Unknown",
        phoneNum: "09000000000",
        avatar: null,
      };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar className="size-8 rounded-lg grayscale">
              <AvatarImage
                src={user.avatar || "/user-profile-default.svg"}
                alt={user.name}
              />
              <AvatarFallback className="rounded-lg">US</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-foreground/70">
                {user.phoneNum}
              </span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={user.avatar || "/user-profile-default.svg"}
                      alt={user.name || "defaultName"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.phoneNum}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link
                    href="/"
                    className="cursor-pointer hover:text-muted-foreground"
                  />
                }
              >
                <HomeIcon />
                Homepage
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/admin"
                    className="cursor-pointer hover:text-muted-foreground"
                  />
                }
              >
                <LayoutDashboardIcon />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/admin/courses/page/1"
                    className="cursor-pointer hover:text-muted-foreground"
                  />
                }
              >
                <Tv2 />
                Courses
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <Link
                  href="/"
                  className="cursor-pointer hover:text-destructive"
                />
              }
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
