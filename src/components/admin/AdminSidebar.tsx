import { FileText, Settings, FolderKanban, BarChart3, Image, HelpCircle, Home, Info } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Reports", url: "/admin/dashboard", icon: FileText },
  { title: "Statistics", url: "/admin/dashboard/statistics", icon: BarChart3 },
  { title: "Infographics", url: "/admin/dashboard/infographics", icon: Image },
  { title: "Content Type", url: "/admin/dashboard/content", icon: FolderKanban },
  { title: "FAQ", url: "/admin/dashboard/faq", icon: HelpCircle },
  { title: "Home Page", url: "/admin/dashboard/home", icon: Home },
  { title: "About Us Page", url: "/admin/dashboard/about", icon: Info },
  { title: "Settings", url: "/admin/dashboard/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        <item.icon className="h-4 w-4" />
                        {state === "expanded" && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
