import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceTexts } from "@/models/WorkspaceText";
import { LoadingState } from "@/components/Loading";
import { ErrorState } from "@/components/Error";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return <LoadingState />;
  }

  if (!workspace || !member) {
    return <ErrorState message={WorkspaceTexts.workspaceNotFound} />;
  }

  return (
    <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
};
