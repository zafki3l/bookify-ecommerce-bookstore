import { BookOpen } from 'lucide-react';
import Link from 'next/link';

type NavLogoProps = {
  appName: string;
};

export default function NavLogo({ appName }: NavLogoProps) {
  return (
    <Link href="/">
      <span className="flex gap-1 text-sm font-bold tracking-tight shrink-0 text-[#2d6a4f]">
        <BookOpen /> {appName}
      </span>
    </Link>
  );
}
