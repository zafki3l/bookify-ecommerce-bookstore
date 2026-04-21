'use client';

import NavigationBarPresenter from './navigation-bar.presenter';
import { useDropdown } from '../../hooks/useDropdown';

export default function NavigationBarContainer() {
  const dropdown = useDropdown();

  const navLinks = [
    { label: 'Best Seller', path: '/best-seller' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'On Sales', path: '/on-sales' },
  ];

  return (
    <NavigationBarPresenter
      navLinks={navLinks}
      isDropdownOpen={dropdown.isOpen}
      dropdownRef={dropdown.ref}
      appName="Bookify"
      onToggleDropDown={dropdown.toggle}
      onCloseDropdown={dropdown.close}
    />
  );
}
