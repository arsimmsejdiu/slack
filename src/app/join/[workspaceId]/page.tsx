"use client";

import Image from "next/image";
import VerificationInput from "react-verification-input";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ChannelText } from "@/models/ChannelText";
import { useWorkspaceId } from "@/hooks/UseWorkspaceId";

const JoinPage = () => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src="/hashtag.svg" alt="Logo" width={60} height={60} />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join workspace</h1>
          <p className="text-gray-500">
            Enter the code from the workspace owner
          </p>
        </div>
        <VerificationInput
          length={6}
          classNames={{
            container: "flex gap-x-2",
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
        <Button size="lg" variant="outline">
          <Link href="/">{ChannelText.backHome}</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
