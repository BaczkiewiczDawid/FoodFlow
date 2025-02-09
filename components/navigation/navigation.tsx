"use client"

import {
    ArrowLeftEndOnRectangleIcon,
    BuildingStorefrontIcon,
    CalendarDaysIcon,
    ClipboardDocumentListIcon, Cog6ToothIcon,
    HomeIcon
} from "@heroicons/react/24/outline";

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export const Navigation = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const navigationItems = [
        {
            title: "Dashboard",
            url: "/",
            icon: HomeIcon,
        },
        {
            title: "Meals list",
            url: "meals",
            icon: ClipboardDocumentListIcon,
        },
        {
            title: "Calendar",
            url: "calendar",
            icon: CalendarDaysIcon,
        },
        {
            title: "My ingredients",
            url: "ingredients",
            icon: BuildingStorefrontIcon,
        },
        {
            title: "Settings",
            url: "settings",
            icon: Cog6ToothIcon,
        }
    ]

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error while logging out:", error.message);
        } else {
            router.push("/");
        }
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>FoodFlow</SidebarGroupLabel>
                    <SidebarGroupContent className={"mt-12"}>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={`/protected/${item.url}`}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout}>
                            <ArrowLeftEndOnRectangleIcon className={"h-6 w-6 text-red-500"} />
                            <span className={"text-red-500"}>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}