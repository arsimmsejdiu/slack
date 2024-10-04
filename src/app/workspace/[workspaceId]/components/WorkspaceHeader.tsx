import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const WorkspaceHeader = () => {
  return (
    <div className="flex justify-between items-center px-4 h-[49px] gap-0.5">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    Workspace Name
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};
