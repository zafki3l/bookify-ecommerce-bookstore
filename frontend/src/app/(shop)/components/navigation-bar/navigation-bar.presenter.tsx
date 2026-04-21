import NavLinks from './partials/nav-links';
import NavLogo from './partials/nav-logo';
import NavSearch from './partials/nav-search';
import NavUserMenu from './partials/nav-user-menu';

type NavLink = {
  label: string;
  path: string;
};

type Props = {
  navLinks: NavLink[];
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  appName: string;
  onToggleDropDown: () => void;
  onCloseDropdown: () => void;
};

export default function NavigationBarPresenter({
  navLinks,
  isDropdownOpen,
  dropdownRef,
  appName,
  onToggleDropDown,
  onCloseDropdown,
}: Props) {
  return (
    <header className="top-0 z-40 w-full px-6 py-3.5">
      <nav
        className="mx-auto flex h-[52px] w-full max-w-8xl items-center justify-between rounded-full px-7"
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0px 20px 40px rgba(43, 53, 47, 0.06)',
        }}
      >
        <NavLogo appName={appName} />

        <NavLinks navLinks={navLinks} />

        <NavSearch />

        <NavUserMenu
          isDropdownOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          onToggleDropDown={onToggleDropDown}
          onCloseDropdown={onCloseDropdown}
        />
      </nav>
    </header>
  );
}
