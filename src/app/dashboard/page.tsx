"use client";

import Navbar from "@/components/Navbar"; // Import the Navbar component
import DialogForm from "@/components/DialogForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import RequestTypeList from "@/components/RequestTypeList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RequestType, useRequestTypeStore } from "@/store/store";
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
        console.log("Fetching request types");
        fetchRequestTypes();
    }, [fetchRequestTypes]);

    const handleAddOrUpdateRequestType = async (requestType: RequestType) => {
        setLoading(true);

        try {
            if (selectedIndex === null) {
                await addRequestType(requestType);
                await fetchRequestTypes(); // Fetch after adding a new request type
            } else {
                await updateRequestType(selectedIndex, requestType);
                await fetchRequestTypes(); // Fetch after updating a request type
            }
        } finally {
            setLoading(false);
            setIsDialogOpen(false);
            setSelectedIndex(null);
        }
    };

    const handleEdit = (index: number) => {
        setSelectedIndex(index);
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        console.log("Closing dialog, form reset");
        setSelectedIndex(null);
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-md">
                <RequestTypeList
                    requestTypes={requestTypes}
                    onEdit={handleEdit}
                    onDelete={deleteRequestType}
                />

                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(isOpen) => {
                        console.log("Dialog open state changed:", isOpen);
                        setIsDialogOpen(isOpen);
                    }}
                >
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
        </div>
    );
}
