import { Loader } from "lucide-react";

export const LoadingState = () => (
    <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
      <Loader className="size-5 animate-spin text-white" />
    </div>
  );