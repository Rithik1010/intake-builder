import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    onCreate: () => void;
}

export default function EmptyState({ onCreate }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                No Request Types Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                It looks like you have not created any request types yet.
            </p>
            <Button
                variant="default"
                onClick={onCreate}
                className="bg-black text-gray-200 border border-gray-300 hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
            >
                Create Your First Request Type
            </Button>
        </div>
    );
}
