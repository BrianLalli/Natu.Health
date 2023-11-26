import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="absolute w-full z-30">
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
                className="w-8 h-8 fill-current text-purple-600"
                src="/images/logo3.png"
                alt="Logo"
              />
              {/* Text for the logo */}
              <span className="ml-2 text-xl font-bold">Natu.Health</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  style={{
                    borderRadius: '25px', // You can adjust the value for the desired roundness
                  }}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                  style={{
                    borderRadius: '25px', // You can adjust the value for the desired roundness
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
