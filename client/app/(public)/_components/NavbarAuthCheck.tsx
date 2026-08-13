"use client";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { buttonVariants } from "@/components/ui/button";
import { useSelector } from "react-redux";

const NavbarAuthCheck = () => {
  const { user: userInfo, loading } = useSelector((state) => state.auth);
  console.log(`loading:${loading}`);
  console.log(userInfo);

  if (loading) {
    return <span>loading...</span>;
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
