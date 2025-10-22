import React from "react";
import Link from "next/link";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BarChart2, FileText, Edit3, Award } from "lucide-react";

// Client component inside same file
const HeaderActions = () => {
  "use client";

  return (
    <div className="flex items-center w-full">
      <SignedIn>
        <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
          <Link href="/dashboard">
            <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
              <BarChart2 className="h-4 w-4" /> Industry Insights
            </Button>
          </Link>
          <Link href="/resume">
            <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Build Resume
            </Button>
          </Link>
          <Link href="/ai-cover-letter">
            <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
              <Edit3 className="h-4 w-4" /> Cover Letter
            </Button>
          </Link>
          <Link href="/interview">
            <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
              <Award className="h-4 w-4" /> Interview Prep
            </Button>
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <Button variant="outline" className="ml-auto">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

// Server component
const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="CAREER IQ Logo"
            width={1200}
            height={400}
            className="h-56 w-auto object-contain py-2"
          />
        </Link>

        {/* Render client component */}
        <HeaderActions />
      </nav>
    </header>
  );
};

export default Header;
