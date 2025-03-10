import { useToggle } from "react-use";
import { WorkspaceSectionProps } from "@/models/interfaces/WorkspaceInterface";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ActionTooltip";
import { cn } from "@/lib/utils";

const WorkspaceSection = ({
  label,
  hint,
  onNew,
  children,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
          onClick={toggle}
        >
          <FaCaretDown className={cn(
            "size-4 transition-transform",
            on && "-rotate-90"
          )} />
        </Button>
        <Button
          className="group px-1.5 text-sm text-[#F9EDFFCC] h-[28px] justify-start overflow-hidden items-center"
          variant="transparent"
          size="sm"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <ActionTooltip label={hint} side="top" align="center">
            <Button
              variant="transparent"
              size="iconSm"
              onClick={onNew}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
            >
              <PlusIcon className="size-5" />
            </Button>
          </ActionTooltip>
        )}
      </div>
      {on && children}
    </div>
  );
};

export default WorkspaceSection;
