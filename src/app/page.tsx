"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/UseCreateModal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // window.location.href = `/workspace/${workspaceId}`;
      console.log("Redirect to workspace");
    } else if (!open){
      setOpen(true)
    }
  }, [workspaceId, isLoading, open, setOpen]);

  if (isLoading) {
    return <Loader className="space-4 animate-spin text-muted-foreground" />;
  }

  // if (!data) {
  //   return null;
  // }

  return (
    <div className="flex flex-row items-center justify-center">
      <UserButton />
    </div>
  );
}
