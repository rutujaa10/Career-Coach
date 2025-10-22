"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  BarChart2,
  FileText,
  Edit3,
  Award,
} from "lucide-react";

const HeaderClient = () => {
  return (
    <div className="flex items-center w-full">
      <SignedIn>
        <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
          {/* Industry Insights */}
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="hidden md:inline-flex items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <BarChart2 className="h-4 w-4" />
              Industry Insights
            </Button>
          </Link>

          {/* Build Resume */}
          <Link href="/resume">
            <Button
              variant="outline"
              className="hidden md:inline-flex items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <FileText className="h-4 w-4" />
              Build Resume
            </Button>
          </Link>

          {/* Cover Letter */}
          <Link href="/ai-cover-letter">
            <Button
              variant="outline"
              className="hidden md:inline-flex items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <Edit3 className="h-4 w-4" />
              Cover Letter
            </Button>
          </Link>

          {/* Interview Prep */}
          <Link href="/interview">
            <Button
              variant="outline"
              className="hidden md:inline-flex items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <Award className="h-4 w-4" />
              Interview Preparation
            </Button>
          </Link>

          {/* User Avatar */}
          <div className="flex-shrink-0">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <Button
            variant="outline"
            className="ml-auto transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default HeaderClient;
