import { useState } from "react";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ActionTooltip";

import { WorkspaceTexts } from "@/models/WorkspaceText";
import { WorkspaceHeaderProps } from "@/models/interfaces/WorkspaceInterface";

import { PreferencesModal } from "./PreferencesModal";
import { InviteModal } from "./InviteModal";

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  return (
    <>
    <InviteModal 
      open={inviteOpen}
      setOpen={setInviteOpen}
      name={workspace?.name}
      joinCode={workspace?.joinCode}
    />
    <PreferencesModal 
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
    />
      <div className="flex justify-between items-center px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64 truncate">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  {WorkspaceTexts.workspaceActive}
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setInviteOpen(true)}
                >
                  {WorkspaceTexts.invitePeople} {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setPreferencesOpen(true)}
                >
                  {WorkspaceTexts.preferences}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <ActionTooltip align="center" side="bottom" label="Filter">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </ActionTooltip>
          <ActionTooltip align="center" side="bottom" label="New Message">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </ActionTooltip>
        </div>
      </div>
    </>
  );
};
