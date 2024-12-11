import {Navigation} from "@/components/navigation/navigation";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider className={"flex flex-row w-screen h-screen"}>
            <Navigation/>
            <main className={"h-screen w-full py-4 px-4"}>
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    );
}