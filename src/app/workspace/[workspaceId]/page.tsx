"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Loader } from "lucide-react";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}
const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  const { data, isLoading } = useGetWorkspaces();

  if (isLoading) {
    return <Loader className="space-4 animate-spin text-muted-foreground" />;
  }

  return (
    <div>
      <h1>Workspace ID: {params.workspaceId}</h1>
      {data?.map((workspace) => (
        <div key={workspace._id}>Workspace Name: {workspace.name}</div>
      ))}
    </div>
  );
};

export default WorkspaceIdPage;
