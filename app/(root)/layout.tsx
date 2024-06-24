import { Sidebar } from "@/components/dashboard";
import Image from "next/image";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" bg-white-100 bg-grid-white/[0.02] flex-row flex">
            <Sidebar />
            <div className="h-screen overflow-scroll scrollbar-hide w-full">
                {children}
            </div>
        </div >
    );
}
