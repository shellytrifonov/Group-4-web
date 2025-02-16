/**
 * Logo component that displays the Plan & Plate brand image.
 * Supports both light and dark mode versions of the logo.
 * Responsive sizing for different screen sizes.
 * Links to the home page when clicked.
 */

import Link from "next/link";
import useLogoState from "@/hooks/header/useLogoState";

const Logo = () => {
  const isDarkMode = useLogoState();

  return (
    <div className="flex items-center">
      <Link href="/" legacyBehavior>
        <a className="block">
          <img
            src={isDarkMode ? "/images/logo_dark.png" : "/images/logo.png"}
            alt="Plan & Plate Logo"
            width={80}
            height={90}
            className="h-10 sm:h-12 md:h-16 w-auto object-contain transition-all duration-300"
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;