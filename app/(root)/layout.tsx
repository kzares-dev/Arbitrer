import { Sidebar } from "@/components/dashboard";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className=" bg-gray-100 bg-grid-white/[0.02] flex-row flex">
            <Sidebar />
            <div className="h-screen overflow-scroll scrollbar-hide w-full">
                {children}
            </div>
        </div >
);
}
