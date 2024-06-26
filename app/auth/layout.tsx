import BackgroundHero from "@/components/ui/BackgroundHero";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-[100vh]">
            <BackgroundHero />
            {children}
        </div >
    );
}
