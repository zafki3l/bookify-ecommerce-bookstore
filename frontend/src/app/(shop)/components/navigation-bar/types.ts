type NavLink = {
  label: string;
  path: string;
};

type NavigationBarPresenterProps = {
  navLinks: NavLink[];
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  appName: string;
  onToggleDropDown: () => void;
  onCloseDropdown: () => void;
};

type NavUserMenuProps = {
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onToggleDropDown: () => void;
  onCloseDropdown: () => void;
};

type NavLinksProps = {
  navLinks: NavLink[];
};
