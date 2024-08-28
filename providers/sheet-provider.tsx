"use client";

import { NewAccountSheet } from "@/features/components/new-account-sheet";
import { useMountedState } from "react-use";
import { EditAccountSheet } from "@/features/components/edit-account-sheet";

export function SheetProvider() {
    const isMounted = useMountedState();
    
    if (!isMounted) {
        return null;
    }
    
    return (
        <>
            <NewAccountSheet/>
            <EditAccountSheet/>
        </>
    );
}