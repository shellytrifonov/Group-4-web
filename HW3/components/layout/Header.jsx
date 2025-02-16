/**
 * Main header component of the application.
 * Manages the responsive layout for both desktop and mobile views.
 * Integrates navigation, user menu, theme toggle, and authentication components.
 * Handles user state and mobile menu visibility.
 */

import React, { useState } from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";
import MobileMenuButton from "./MobileMenuButton";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";
import MobileNavBar from "./MobileNavBar";
import Link from "next/link";
import useUserState from "@/hooks/header/useUserState";

const Header = () => {
  const { isLoggedIn, userName, userPic } = useUserState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="py-4 shadow-md w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Mobile and Tablet View (up to 1023px) */}
        <div className="lg:hidden flex items-center justify-between w-full relative">
          <Link href="/profile">
            <img src={userPic} alt="User" className="w-8 h-8 rounded-full cursor-pointer" />
          </Link>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo className="w-24 h-auto" />
          </div>

          <div className="flex items-center">
            <ThemeToggle className="mr-2" />
            <MobileMenuButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </div>

        {/* Desktop View (1024px and above) */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="w-24 flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Navbar */}
          {isLoggedIn && (
            <div className="flex-1 flex justify-center max-w-[600px] mx-auto px-4">
              <NavBar />
            </div>
          )}

          {/* Right: User menu & Theme Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <ThemeToggle />
            {isLoggedIn ? (
              <UserMenu userName={userName} userPic={userPic} />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>

        {/* Mobile and Tablet Navigation Menu */}
        {isLoggedIn && (
          <MobileNavBar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        )}
      </div>
    </header>
  );
};

export default Header;
