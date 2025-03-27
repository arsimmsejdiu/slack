"use client";

//@Packages
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

//@Features
import { useCreateChannelModal } from "@/features/channels/store/UseCreateChannelModal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/UseGetChannels";
import { useCurrentMember } from "@/features/members/api/use-current-member";

//@Hooks
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    channelsLoading,
    workspaceLoading,
    workspace,
    router,
    workspaceId,
    open,
    setOpen,
    member,
    memberLoading,
    isAdmin,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <div className="flex flex-1 flex-col gap-2 justify-center items-center h-full">
        <Loader className="aimated-spin size-6 text-muted-foreground" />;
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-1 flex-col gap-2 justify-center items-center h-full">
        <TriangleAlert className="size-6 animate-pulse text-muted-foreground" />
        ;
        <span className="text-muted-foreground text-sm">
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-y-2 justify-center items-center h-full">
      <TriangleAlert className="size-10 animate-bounce text-destructive" />
      <span className="text-muted-foreground text-sm">
        Channel not found
      </span>
    </div>
  );;
};

export default WorkspaceIdPage;
//tqgc12