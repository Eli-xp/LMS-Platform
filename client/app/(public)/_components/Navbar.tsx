import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import NavbarAuthCheck from "./NavbarAuthCheck";

// sample data
const nvaigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-backgroud/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <span className="font-bold">MarshalLms.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex flex-row items-center space-x-2">
            {nvaigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <ThemeToggle />
            <NavbarAuthCheck />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
