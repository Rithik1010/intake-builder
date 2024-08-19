import { RequestType } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

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
                <div
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                    <h3 className="text-xl font-semibold mb-2">
                        {requestType.type_name}
                    </h3>
                    <p className="text-gray-700 mb-4 flex-grow">
                        {requestType.purpose}
                    </p>
                    <div className="flex justify-end mt-auto space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => onEdit(index)}
                            className="flex justify-between items-center"
                        >
                            <Pencil className="w-4 h-4" />
                            <span className="ml-2">Edit</span>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => onDelete(index)}
                            className="flex justify-between items-center"
                        >
                            <Trash className="w-4 h-4" />
                            <span className="ml-2">Delete</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
