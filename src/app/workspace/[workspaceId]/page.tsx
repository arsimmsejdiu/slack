"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { Loader } from "lucide-react";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) {
    return <Loader className="space-4 animate-spin text-muted-foreground" />;
  }

  return (
    <div>
      <h1>Workspace ID: {workspaceId}</h1>
    </div>
  );
};

export default WorkspaceIdPage;
