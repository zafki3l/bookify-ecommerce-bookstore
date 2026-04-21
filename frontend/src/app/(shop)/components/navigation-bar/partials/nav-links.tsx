import Link from 'next/link';

type NavLink = {
  label: string;
  path: string;
};

type NavLinksProps = {
  navLinks: NavLink[];
};

export default function NavLinks({ navLinks }: NavLinksProps) {
  return (
    <ul className="flex items-center gap-7">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            href={link.path}
            className="text-[13.5px] font-medium text-[#047857B3] hover:text-[#2b352f] transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
