"use client";

import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <Button
        className="text-lg font-semibold px-2 overflow-auto w-auto"
        variant="ghost"
        size="sm"
      >
        <span className="truncate"># {title}</span>
        <FaChevronDown className="ml-2 size-2.5" />
      </Button>
    </div>
  );
};

export default Header;
