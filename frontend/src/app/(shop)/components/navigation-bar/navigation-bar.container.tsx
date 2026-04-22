import NavigationBarPresenter from './navigation-bar.presenter';

export default function NavigationBarContainer() {
  const navLinks = [
    { label: 'Best Seller', path: '/best-seller' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'On Sales', path: '/on-sales' },
  ];

  return <NavigationBarPresenter navLinks={navLinks} appName="Bookify" />;
}
