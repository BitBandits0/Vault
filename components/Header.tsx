import Link from "next/link";
import Image from "next/image";
import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex ml-3 items-center space-x-3">
        <div>
          <Image
            src="https://img.icons8.com/?size=100&id=2OaczqXO7Lt4&format=png&color=000000"
            alt="logo"
            // className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-2xl">Vault</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        {/* Theme Toggler */}
        <ThemeToggler />

        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
