import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useWorkspaceId } from "@/hooks/UseWorkspaceId";
import { UserItemProps } from "@/models/interfaces/UserItemInterface";
import { userItemVariants } from "@/models/Variants";
import { cn } from "@/lib/utils";

export const UserItem = ({ id, label = "Member", image, variant }: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback = label.charAt(0).toUpperCase();

    return (
        <Button
            className={cn(userItemVariants({ variant: variant }))}
            variant="transparent"
            asChild
            size="sm"
        >
            <Link href={`/workspace/${workspaceId}/member/${id}`}>
                <Avatar className="size-5 rounded-md mr-1">
                    <AvatarImage src={image} className="rounded-md"/>
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    );
};