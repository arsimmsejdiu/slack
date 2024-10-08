import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceTexts } from "@/models/WorkspaceText";

const LoadingState = () => (
  <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
    <Loader className="size-5 animate-spin text-white" />
  </div>
);

const ErrorState = () => (
  <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
    <AlertTriangle className="size-5 text-white" />
    <p className="text-white text-sm">{WorkspaceTexts.workspaceNotFound}</p>
  </div>
);

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId });

  if (workspaceLoading || memberLoading) {
    return <LoadingState />;
  }

  if (!workspace || !member) {
    return <ErrorState />;
  }

  return (
    <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
    </div>
  );
};
