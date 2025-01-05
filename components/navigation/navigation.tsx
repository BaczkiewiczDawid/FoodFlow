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
} from "../../components/ui/sidebar"
import Link from "next/link";

export const Navigation = () => {
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
                        <SidebarMenuButton asChild>
                            <Link href={"/logout"}>
                                <ArrowLeftEndOnRectangleIcon className={"h-6 w-6 text-red-500"}/>
                                <span className={"text-red-500"}>Log out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}