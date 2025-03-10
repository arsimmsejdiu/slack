import { HashIcon, MessageSquareText, SendHorizonal } from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/UseGetChannels";

import { SidebarItem } from "./SidebarItem";
import WorkspaceSection from "./WorkspaceSection";
import { WorkspaceHeader } from "./WorkspaceHeader";

import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { WorkspaceTexts } from "@/models/WorkspaceText";
import { LoadingState } from "@/components/Loading";
import { ErrorState } from "@/components/Error";
import { UserItem } from "./UserItem";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId });
  const { data: channels, isLoading: channelLoading } = useGetChannels({ workspaceId });
  const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId });

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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" Icon={MessageSquareText} id="threads" />
        <SidebarItem label="Draft & Sent" Icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection label="Channels" hint="New Channel" onNew={() => {}}>
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            Icon={HashIcon}
            id={item._id}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages" hint="New direct message" onNew={() => {}}>
        {members?.map((item) => (
        <UserItem 
          key={item._id}
          id={item._id}
          label={item.user.name}
          image={item.user.image}
        />
      ))}
      </WorkspaceSection>
    </div>
  );
};
