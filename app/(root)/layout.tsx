import { Sidebar } from "@/components/dashboard";
import Image from "next/image";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-[100vh] bg-black-100 bg-grid-white/[0.02] flex-row flex">
            <Sidebar />
            {children}
        </div >
    );
}
