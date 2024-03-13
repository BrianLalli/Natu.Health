import React from 'react'; // Import React
import Link from "next/link";
import MobileMenu from "./mobile-menu";

// Extend the component to accept props, including className
export default function Header({ className }: { className?: string }) {
  // Apply the className to the header element
  return (
    <header className={`fixed w-full z-30 ${className}`} style={{ backgroundColor: "#F7F7F7" /* off-white */ }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo and Text */}
            <Link
              href="/"
              className="block flex items-center"
              aria-label="Natu.Health"
            >
              {/* If you want to keep the SVG logo, leave this part as is */}
              <img
                className="w-8 h-8 fill-current"
                src="/images/logo3.png"
                alt="Logo"
                style={{ color: "#949cff" /* lavender for the logo if applicable */ }}
              />
              {/* Text for the logo */}
              <span className="ml-2 text-xl font-bold" style={{ color: "#435373" /* deep-slate */ }}>Natu.Health</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  style={{
                    borderRadius: '25px', // You can adjust the value for the desired roundness
                    color: "#435373" /* deep-slate */,
                    backgroundColor: "transparent", // Clear or any desired color for the background
                    borderStyle: "solid", // Only if you want a border
                  }}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="btn-sm ml-3"
                  style={{
                    borderRadius: '25px', // You can adjust the value for the desired roundness
                    backgroundColor: "#8fcca0" /* flora */,
                    color: "#ffffff" /* white text */,
                    borderColor: "#8fcca0" /* flora for border to match */,
                  }}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
