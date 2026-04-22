import { BookOpen } from 'lucide-react';
import Link from 'next/link';

type AuthHeaderPresenterProps = {
  appName: string;
};

export default function AuthHeaderPresenter({
  appName,
}: AuthHeaderPresenterProps) {
  return (
    <header className="flex items-center justify-between px-8 py-5">
      <Link
        href="/"
        className="flex gap-1 text-[15px] font-bold text-[#2d6a4f]"
      >
        <BookOpen /> {appName}
      </Link>
      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#047857B3]">
        The Digital Archivist
      </span>
    </header>
  );
}
