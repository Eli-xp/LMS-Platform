import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  BookOpen,
  ChevronDown,
  Home,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";

interface iAppProps {
  name: string;
  email: string;
  image: string;
}

const UserDropdown = ({ name, email, image }: iAppProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="border px-8 py-5 w-14 h-8 cursor-pointer"
            />
          }
        >
          <Avatar className="flex items-center gap-1">
            <AvatarImage src={image} alt="Profile image"></AvatarImage>
            <AvatarFallback>
              {name[0].toUpperCase()}
              {name[1].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <span className="text-foreground">{name}</span>
              <br />
              <span>{email}</span>
            </DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-300/10"
              asChild
            >
              <Link
                href="/"
                className="flex justify-center items-center gap-1.5"
              >
                <Home size={16} className="opacity-60" aria-hidden="true" />
                <span className="opacity-90">Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-300/10"
              asChild
            >
              <Link
                href="/course"
                className="flex justify-center items-center gap-1.5"
              >
                <BookOpen size={16} className="opacity-60" aria-hidden="true" />
                <span className="opacity-90">Courses</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-300/10"
              asChild
            >
              <Link
                href="/dashboard"
                className="flex justify-center items-center gap-1.5"
              >
                <LayoutDashboardIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span className="opacity-90">Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-red-500/10"
              asChild
            >
              <Link
                href="/course"
                className="flex justify-center items-center gap-1.5"
              >
                <LogOutIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span className="opacity-90">Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;

// ("use client");

// import {
//   BadgeCheckIcon,
//   BellIcon,
//   CreditCardIcon,
//   LogOutIcon,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function DropdownMenuAvatar() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
//               <AvatarFallback>LR</AvatarFallback>
//             </Avatar>
//           </Button>
//         }
//       />
//       <DropdownMenuContent align="end">
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <BadgeCheckIcon />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <CreditCardIcon />
//             Billing
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <BellIcon />
//             Notifications
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           <LogOutIcon />
//           Sign Out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
