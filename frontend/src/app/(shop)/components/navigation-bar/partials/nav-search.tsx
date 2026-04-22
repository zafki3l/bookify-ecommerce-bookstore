import { Search } from 'lucide-react';

type NavSearchProps = {};

export default function NavSearch({}: NavSearchProps) {
  return (
    <div className="flex items-center gap-2 bg-[#eff5ef] rounded-full px-4 h-9 w-[clamp(50px,50%,600px)] min-w-0">
      <Search
        size={14}
        strokeWidth={2.2}
        className="text-[#047857B3] shrink-0"
      />
      <input
        type="text"
        placeholder="Search books..."
        className="bg-transparent border-none outline-none text-[13px] text-[#2b352f] placeholder:text-[#aab4ad] w-full"
      />
    </div>
  );
}
