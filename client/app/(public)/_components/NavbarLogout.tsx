"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { clearUser } from "@/redux/slices/auth.slice";
import { logout } from "@/services/auth/logout";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const NavbarLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutCall = async () => {
    console.log("NavbarLogout Ran");

    try {
      const logoutCallRes = await logout();
      console.log(logoutCallRes);
      dispatch(clearUser());
      toast.success("Successfully loged out");
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem
    className="flex w-full justify-start items-center cursor-pointer hover:bg-red-500/20"
      render={
        <Button
          type="button"
          onClick={logoutCall}
        />
      }
    >
      <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
      <span className="opacity-90">Logout</span>
    </DropdownMenuItem>
  );
};

export default NavbarLogout;
