import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function useConfirm(title: string, message: string): [() => ReactNode, () => Promise<unknown>] {
    const [promise, setPromise] = useState<{ resolve: ( value: boolean ) => void} | null>(null);
    
    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });
    
    function handleClose() {
        setPromise(null);
    }
    
    function handleConfirm() {
        promise?.resolve(true);
        handleClose();
    }

    function handleCancel() {
        promise?.resolve(false);
        handleClose();
    }
    
    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="pt-2">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
    
    return [ConfirmationDialog, confirm];
}