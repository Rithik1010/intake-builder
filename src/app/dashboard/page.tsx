"use client";

import DialogForm from "@/components/DialogForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import RequestTypeList from "@/components/RequestTypeList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRequestTypeStore } from "@/store/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const {
        requestTypes,
        fetchRequestTypes,
        addRequestType,
        updateRequestType,
        deleteRequestType,
    } = useRequestTypeStore();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check if the user is logged in
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            router.push("/"); // Redirect to landing page if not logged in
        }
    }, [router]);

    useEffect(() => {
        fetchRequestTypes();
    }, [fetchRequestTypes]);

    const handleAddOrUpdateRequestType = async (data: any) => {
        setLoading(true);
        const requestType = {
            ...data,
            time_of_creation:
                selectedIndex === null
                    ? new Date().toISOString()
                    : requestTypes[selectedIndex].time_of_creation,
            time_of_update:
                selectedIndex !== null ? new Date().toISOString() : undefined,
        };

        try {
            if (selectedIndex === null) {
                await addRequestType(requestType);
            } else {
                await updateRequestType(selectedIndex, requestType);
            }
        } finally {
            setLoading(false);
            await fetchRequestTypes();
            setIsDialogOpen(false);
            setSelectedIndex(null);
        }
    };

    const handleEdit = (index: number) => {
        setSelectedIndex(index);
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setSelectedIndex(null);
        setIsDialogOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail"); // Remove the user email from local storage
        router.push("/"); // Redirect to landing page
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Request Type Dashboard</h1>
                <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                </Button>
            </div>

            <RequestTypeList
                requestTypes={requestTypes}
                onEdit={handleEdit}
                onDelete={deleteRequestType}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="mt-6">
                        Create New Request Type
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogForm
                        initialData={
                            selectedIndex !== null
                                ? requestTypes[selectedIndex]
                                : undefined
                        }
                        onSubmit={handleAddOrUpdateRequestType}
                        onClose={resetForm}
                    />
                    {loading && (
                        <div className="flex justify-center mt-4">
                            <LoadingSpinner
                                size={24}
                                className="text-blue-500"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
