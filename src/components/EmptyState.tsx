import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    onCreate: () => void;
}

export default function EmptyState({ onCreate }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <h2 className="text-2xl font-semibold">No Request Types Yet</h2>
            <p className="text-gray-600">
                It looks like you haven't created any request types yet.
            </p>
            <Button variant="default" onClick={onCreate}>
                Create Your First Request Type
            </Button>
        </div>
    );
}
