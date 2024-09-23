"use client";

import dynamic from 'next/dynamic';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const Toolbar = dynamic(() => import("./components").then((mod) => mod.Toolbar)); //lazy loading
const Sidebar = dynamic(() => import("./components").then((mod) => mod.Sidebar)); //lazy loading
const WorkspaceSidebar = dynamic(() => import("./components").then((mod) => mod.WorkspaceSidebar)); //Lazy Loading

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar /> 
        <ResizablePanelGroup direction="horizontal" autoSaveId="as-workspace-layout">
          <ResizablePanel
            defaultSize={20} // Set the initial size of the panel
            minSize={11} // Set the minimum size of the panel
            maxSize={30} // Set the maximum size of the panel
            className="bg-[#5e2c5f]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
        </div>
    </div>
  );
};
export default WorkspaceIdLayout;
