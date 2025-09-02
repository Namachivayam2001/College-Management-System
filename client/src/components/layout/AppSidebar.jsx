import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  ClipboardList, 
  Settings,
  GraduationCap,
  BookOpen
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
} from "../ui/sidebar"; // Assuming ui/sidebar is a relative path.

// Define the navigation items for the sidebar.
// Each item has a title, URL, icon component, and roles that can access it.
const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, roles: ['admin', 'hod', 'teacher', 'student'] },
  { title: "Students", url: "/students", icon: GraduationCap, roles: ['admin', 'hod', 'teacher'] },
  { title: "Teachers", url: "/teachers", icon: Users, roles: ['admin', 'hod'] },
  { title: "Attendance", url: "/attendance", icon: UserCheck, roles: ['admin', 'hod', 'teacher'] },
  { title: "Timetable", url: "/timetable", icon: Calendar, roles: ['admin', 'hod', 'teacher', 'student'] },
  { title: "Exam Duties", url: "/exam-duties", icon: ClipboardList, roles: ['admin', 'hod', 'teacher'] },
  { title: "Subjects", url: "/subjects", icon: BookOpen, roles: ['admin', 'hod'] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ['admin', 'hod'] },
];

/**
 * A responsive sidebar component that displays navigation links based on user roles.
 */
export function AppSidebar() {
  // Use the useSidebar hook to get the state (e.g., collapsed) of the sidebar.
  const { state } = useSidebar();
  // Get the current location to determine the active navigation link.
  const location = useLocation();
  const currentPath = location.pathname;
  // Use useSelector to get the user data from the Redux store.
  const { user } = useSelector((state) => state.auth);
  // Check if the sidebar is in a collapsed state.
  const collapsed = state === "collapsed";

  /**
   * Returns a CSS class string for the navigation link based on whether it is active or not.
   * @param {{ isActive: boolean }} param0 An object containing the isActive property from react-router-dom's NavLink.
   * @returns {string} The CSS class string.
   */
  const getNavCls = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium shadow-elegant"
      : "hover:bg-secondary/80 transition-colors";

  // Filter the navigation items based on the user's role.
  const filteredItems = navigationItems.filter(item =>
    user && item.roles.includes(user.role)
  );

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* Header section with the logo and app name */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">College Nexus</h2>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            )}
          </div>
        </div>

        {/* User info section */}
        {user && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-accent-foreground">
                  {user.name.charAt(0)}
                </span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation links section */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
