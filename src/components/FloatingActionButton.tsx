import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

interface FABProps {
    onClick: () => void;
    label?: string;
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FABProps>(
    ({ onClick, label = "New" }, ref) => {
        return (
            <Button
                variant="default"
                onClick={onClick}
                className="fixed bottom-10 right-10 rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-black text-white dark:bg-gray-700 dark:text-white"
                aria-label={label}
                ref={ref} // Use the forwarded ref here
            >
                <Plus className="w-6 h-6" />
            </Button>
        );
    }
);

FloatingActionButton.displayName = "FloatingActionButton"; // This is optional but recommended

export default FloatingActionButton;
