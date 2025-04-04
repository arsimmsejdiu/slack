"use client"

import { useEffect, useState } from "react"
import { CreateWorkspaceModal } from "@/features/workspaces/components/CreateWorkspaceModal"
import { UseCreateChannelModal } from "@/features/channels/components/CreateChannelModal"

export const Modals = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <CreateWorkspaceModal />
            <UseCreateChannelModal />
        </>
    )
}