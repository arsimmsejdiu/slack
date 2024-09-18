"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Toolbar = dynamic(() => import("./components").then((mod) => mod.Toolbar)); //lazy loading
const Sidebar = dynamic(() => import("./components").then((mod) => mod.Sidebar)); //lazy loading

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar /> 
        {children}</div>
    </div>
  );
};
export default WorkspaceIdLayout;
