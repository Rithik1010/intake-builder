"use client";

import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";
import DialogForm from "@/components/DialogForm";
import RequestTypeList from "@/components/RequestTypeList";
import EmptyState from "@/components/EmptyState";
import Skeleton from "@/components/Skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RequestType, useRequestTypeStore } from "@/store/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

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
    const [loadingData, setLoadingData] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            router.push("/");
        }
    }, [router]);

    useEffect(() => {
        const loadData = async () => {
            await fetchRequestTypes();
            setLoadingData(false);
        };
        loadData();
    }, [fetchRequestTypes]);

    const handleAddOrUpdateRequestType = async (requestType: RequestType) => {
        setLoading(true);

        try {
            if (selectedIndex === null) {
                await addRequestType(requestType);
                toast({
                    title: "Success",
                    description: "Request type added successfully!",
                    className: "bg-green-100 text-green-700",
                    duration: 1500,
                });
            } else {
                await updateRequestType(selectedIndex, requestType);
                toast({
                    title: "Success",
                    description: "Request type updated successfully!",
                    className: "bg-green-100 text-green-700",
                    duration: 1500,
                });
            }
            await fetchRequestTypes();
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
                duration: 1500,
            });
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
        setSelectedIndex(null);
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-md">
                {loadingData ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* Show skeletons while loading */}
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-md"
                            >
                                <Skeleton height="24px" className="mb-2" />
                                <Skeleton
                                    height="16px"
                                    width="80%"
                                    className="mb-4"
                                />
                                <Skeleton height="32px" width="60%" />
                            </div>
                        ))}
                    </div>
                ) : requestTypes.length === 0 ? (
                    <EmptyState onCreate={() => setIsDialogOpen(true)} />
                ) : (
                    <RequestTypeList
                        requestTypes={requestTypes}
                        onEdit={handleEdit}
                        onDelete={(index) => {
                            deleteRequestType(index);
                            toast({
                                title: "Success",
                                description:
                                    "Request type deleted successfully!",
                                className: "bg-green-100 text-green-700",
                                duration: 1500,
                            });
                        }}
                    />
                )}

                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
                >
                    <DialogTrigger asChild>
                        <FloatingActionButton
                            onClick={() => setIsDialogOpen(true)}
                        />
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
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
