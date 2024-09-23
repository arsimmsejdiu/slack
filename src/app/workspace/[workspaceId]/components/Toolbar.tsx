import { ActionTooltip } from "@/components/ActionTooltip";
import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { Info, Search } from "lucide-react";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspace({ workspaceId });

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <ActionTooltip label="Click to Search" align="center" side="bottom">
          <Button
            className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
            size="sm"
          >
            <Search className="size-4 text-white mr-2" />
            <span className="text-white text-xs">Search {data?.name}</span>
          </Button>
        </ActionTooltip>
      </div>
      <div className="flex-1 ml-auto flex items-center justify-end">
        <ActionTooltip label="Info" align="center" side="bottom">
          <Button variant="transparent" size="iconSm">
            <Info className="size-5 text-white" />
          </Button>
        </ActionTooltip>
      </div>
    </nav>
  );
};
