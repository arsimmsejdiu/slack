import Link from "next/link";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { SidebarItemProps } from "@/models/interfaces/WorkspaceInterface";
import { cn } from "@/lib/utils";
import { sidebarItemVariants } from "@/models/Variants";

export const SidebarItem = ({ label, Icon, id, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      size="sm"
      className={cn(sidebarItemVariants({ variant: variant }))}
      asChild
      variant="transparent"
      onClick={() => {}} // TODO: function when clicked opensup the channel messages
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0"/>
        <span className="text-s, truncate">{label}</span>
      </Link>
    </Button>
  );
};
