import { RequestType } from "@/store/store";
import { Button } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
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
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        {requestType.type_name}
                    </CardTitle>
                    <CardDescription>{requestType.purpose}</CardDescription>
                </CardHeader>
            </div>
            <CardFooter className="mt-auto flex justify-end space-x-2">
                <Button variant="outline" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
