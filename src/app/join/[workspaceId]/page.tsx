"use client";

import { useMemo, useEffect } from "react";
import Image from "next/image";
import VerificationInput from "react-verification-input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { ChannelText } from "@/models/ChannelText";

import { useWorkspaceId } from "@/hooks/UseWorkspaceId";

import { useGetWorkspaceInfo } from "@/features/workspaces/api/UseGetWorkspaceInfo";
import { useJoin } from "@/features/workspaces/api/UseJoin";
import { cn } from "@/lib/utils";

const JoinPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });
  const { mutate, isPending } = useJoin();

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if (isMember) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  const handleComplete = async (code: string) => {
    await mutate({ workspaceId, joinCode: code }, {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
            toast.success(ChannelText.joinSuccess);
        },
        onError: () => {
            toast.error(ChannelText.joinError);
        }
    });
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src="/hashtag.svg" alt="Logo" width={60} height={60} />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">
            {ChannelText.join} {data?.name}
          </h1>
          <p className="text-gray-500">
            Enter the code from the workspace owner
          </p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
            character:
              "rounded-md uppercase h-auto border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button disabled={isPending} onClick={() => {}} size="lg" variant="outline">
          <Link href="/">{ChannelText.backHome}</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
