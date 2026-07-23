import React from "react";
import { Muted, Text } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

type CoachProfileCardProps = {
    name?: string;
    email?: string;
    initials?: string;
    onLogout?: () => void;
};

export default function CoachProfileCard({
    name = "John Doe",
    email = "coach@example.com",
    initials = "JD",
    onLogout,
}: CoachProfileCardProps) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {isCollapsed ? (
                            <SidebarMenuButton aria-haspopup="menu" aria-label={name} title={name} className="w-full flex items-center justify-center cursor-pointer">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton aria-haspopup="menu" aria-label={`Open profile menu for ${name}`}>
                                <div className="flex items-center gap-3 w-full cursor-pointer">
                                    <Avatar>
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-left">
                                        <Text className="text-sm">{name}</Text>
                                        <Muted className="text-xs truncate">{email}</Muted>
                                    </div>
                                    <ChevronsUpDown className="ml-auto h-4 w-4" aria-hidden />
                                </div>
                            </SidebarMenuButton>
                        )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" sideOffset={8} role="menu" aria-label="Profile menu">
                        <div className="w-full px-2 py-2">
                            <LogoutButton />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
