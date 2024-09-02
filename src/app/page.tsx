"use client";

import { UserButton } from "@/features/auth/_components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // window.location.href = `/workspace/${workspaceId}`;
      console.log("REdirect to workspace");
    } else {
      console.log("Open Create Workspace modal");
    }
  }, [workspaceId, isLoading]);

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
