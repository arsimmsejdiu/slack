"use client";

import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/UseCreateWorkspaceModal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open){
      setOpen(true)
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  if (isLoading) {
    return <Loader className="flex flex-col items-center, justify-center space-4 animate-spin text-muted-foreground" />;
  }

  return (
    <div className="flex flex-row h-full items-center justify-center bg-[#5c3B58]" />
  );
}
