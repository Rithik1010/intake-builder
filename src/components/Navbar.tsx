import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/");
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex justify-between items-center">
            <div className="text-xl font-bold dark:text-white">
                Intake Builder
            </div>
            <div className="flex items-center space-x-4 ">
                <DarkModeToggle />
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="dark:border-gray-500 dark:text-gray-100"
                >
                    Sign Out
                </Button>
            </div>
        </nav>
    );
}
