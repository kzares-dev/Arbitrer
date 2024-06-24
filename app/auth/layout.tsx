import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { BackgroundStatic } from "@/components/ui/BackgroundStatic";
import images from "@/constants/images";
import Image from "next/image";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-[100vh] bg-white-100">
            <BackgroundStatic/>
            {children}
        </div >
    );
}
