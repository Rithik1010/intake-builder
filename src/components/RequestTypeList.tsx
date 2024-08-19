import RequestTypeItem from "./RequestTypeItem";

interface RequestTypeListProps {
    requestTypes: any[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function RequestTypeList({
    requestTypes,
    onEdit,
    onDelete,
}: RequestTypeListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
