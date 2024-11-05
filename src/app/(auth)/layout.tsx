"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//?  Define props for the AuthLayout component, which expects "children" as a prop to render nested content
interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: AuthLayoutProps) {
  //? Get the current route path using usePath for conditional rendering between login or signup
  const pathname = usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          {/* Logo img */}
          <Image src="logo.svg" height={56} width={152} alt="logo" />
          <Button>
            {/* If user is on login route, show signup button and vice versa */}
            <Link href={pathname === "/login" ? "/signup" : "/login"}>
              {pathname === "/login" ? "Signup" : "Login"}
            </Link>
          </Button>
        </nav>
        {/* Render child components within the layout. Specifically, login or signup card */}
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
