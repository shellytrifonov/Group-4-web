/**
 * Mobile menu toggle button component.
 * Displays a hamburger icon that toggles the mobile navigation menu.
 * Only visible on mobile and tablet views (up to 1023px).
 */
const MobileMenuButton = ({ isOpen, setIsOpen }) => (
  <button 
    className="lg:hidden flex items-center justify-center"
    onClick={() => setIsOpen(prevState => !prevState)}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export default MobileMenuButton;