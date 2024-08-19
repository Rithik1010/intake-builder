import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FABProps {
    onClick: () => void;
    label?: string;
}

export default function FloatingActionButton({
    onClick,
    label = "New",
}: FABProps) {
    return (
        <Button
            variant="default"
            onClick={onClick}
            className="fixed bottom-10 right-10 rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            aria-label={label}
        >
            <Plus className="w-6 h-6" />
        </Button>
    );
}
