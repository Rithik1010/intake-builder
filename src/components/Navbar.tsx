import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/");
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            <div className="text-xl font-bold">Intake Builder</div>
            <Button variant="outline" onClick={handleLogout}>
                Sign Out
            </Button>
        </nav>
    );
}
