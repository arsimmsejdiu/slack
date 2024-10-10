import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  icon?: React.ReactNode;
  message: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  icon = <AlertTriangle className="size-5 text-white" />,
  message,
  className = "bg-[#5E2C5F]"
}) => (
  <div className={`flex flex-col gap-y-2 h-full items-center justify-center ${className}`}>
    {icon}
    <p className="text-white text-sm">{message}</p>
  </div>
);
