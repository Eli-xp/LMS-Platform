"use client";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { buttonVariants } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const NavbarAuthCheck = () => {
  const { user: userInfo, loading } = useSelector((state) => state.auth);
  console.log(`loading:${loading}`);
  console.log(userInfo);

  if (loading) {
    return (
      <div className="flex ml-1.5 items-center gap-3">
        <Skeleton className="h-7 w-7 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-5" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {userInfo ? (
        <UserDropdown
          name={userInfo?.name}
          phone={userInfo?.phone}
          image={userInfo?.userImage || "/user-profile-default.svg"}
        />
      ) : (
        <Link href="/login" className={buttonVariants()}>
          Get Started
        </Link>
      )}
    </div>
  );
};

export default NavbarAuthCheck;
