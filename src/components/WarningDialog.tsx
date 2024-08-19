"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WarningDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    requestTypeName: string;
}

export default function WarningDialog({
    isOpen,
    onClose,
    onConfirm,
    requestTypeName,
}: WarningDialogProps) {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = () => {
        if (inputValue === requestTypeName) {
            setError(null);
            onConfirm();
        } else {
            setError("The name you entered does not match.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="space-y-4">
                <h3 className="font-semibold dark:text-gray-100">
                    Are you sure you want to delete the request type{" "}
                    <span className="text-red-600">{requestTypeName}</span>?
                </h3>
                <p className="dark:text-gray-300">
                    Please type the request type name to confirm:
                </p>
                <Label htmlFor="confirm-name" className="dark:text-gray-100">
                    Request Type Name
                </Label>
                <Input
                    id="confirm-name"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="flex justify-end space-x-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="dark:border-gray-500 dark:text-gray-200"
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
