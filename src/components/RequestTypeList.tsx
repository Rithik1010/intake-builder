import { RequestType } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import RequestTypeItem from "./RequestTypeItem";

interface RequestTypeListProps {
    requestTypes: RequestType[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function RequestTypeList({
    requestTypes,
    onEdit,
    onDelete,
}: RequestTypeListProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {requestTypes.map((requestType, index) => (
                <RequestTypeItem
                    key={index}
                    requestType={requestType}
                    onEdit={() => onEdit(index)}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </div>
    );
}
