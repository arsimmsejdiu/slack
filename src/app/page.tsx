"use client"

import { UserButton } from "@/features/auth/_components/user-button";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center">
      <UserButton />
    </div>
  );
}
