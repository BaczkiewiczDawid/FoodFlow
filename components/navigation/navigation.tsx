import {
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

export const Navigation = () => {
    const navigationItems = [
        {
            title: "Dashboard",
            url: "/",
            icon: HomeIcon,
        },
        {
            title: "Meals list",
            url: "/meals",
            icon: ClipboardDocumentListIcon,
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: CalendarDaysIcon,
        },
        {
            title: "My ingredients",
            url: "/ingredients",
            icon: BuildingStorefrontIcon,
        },
        {
            title: "Settings",
            url: "/settings",
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
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
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
                        <SidebarMenuButton>
                            <span className={"text-red-500"}>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}