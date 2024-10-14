import { LucideIcon } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
 label: string;
 icon: LucideIcon | IconType;
 id: string;   
}

export const SidebarItem = ({label, icon, id}: SidebarItemProps) => {
    return ( 
        <div>SidebarItem</div>
     );
}
