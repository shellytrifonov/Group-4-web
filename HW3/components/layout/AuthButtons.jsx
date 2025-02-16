/**
 * Authentication buttons component that displays Login and Sign Up links.
 * Used in the header when no user is logged in.
 * Provides navigation to authentication pages using Next.js Link component.
 */

import Link from "next/link";

const AuthButtons = () => (
  <>
    <Link href="/auth/login" legacyBehavior>
      <a className="btn login-btn">Login</a>
    </Link>
    <Link href="/auth/register" legacyBehavior>
      <a className="btn register-btn">Sign Up</a>
    </Link>
  </>
);

export default AuthButtons;