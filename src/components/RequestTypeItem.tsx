import { RequestType } from "@/store/store";
import { Button } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "./ui/card";

interface RequestTypeItemProps {
    requestType: RequestType;
    onEdit: () => void;
    onDelete: () => void;
}

export default function RequestTypeItem({
    requestType,
    onEdit,
    onDelete,
}: RequestTypeItemProps) {
    return (
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        {requestType.type_name}
                    </CardTitle>
                    <CardDescription>{requestType.purpose}</CardDescription>
                </CardHeader>
            </div>
            <CardFooter className="mt-auto flex justify-end space-x-2">
                <Button
                    variant="outline"
                    className="dark:border-gray-500 dark:text-gray-200"
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    className="dark:bg-red-600 dark:text-white"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
