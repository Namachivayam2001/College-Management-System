import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"; // Assuming ui/sidebar is a relative path.
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "../ui/button"; // Assuming ui/button is a relative path.
import { Input } from "../ui/input"; // Assuming ui/input is a relative path.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"; // Assuming ui/dropdown-menu is a relative path.
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice"; // Assuming slices/authSlice is a relative path.

/**
 * Main layout component for the dashboard.
 * It includes a fixed header, a sidebar, and a main content area.
 * @param {object} props
 * @param {React.ReactNode} props.children The content to be rendered within the main area.
 */
export function DashboardLayout({ children }) {
  // Use useSelector to access the user state from the Redux store.
  const { user } = useSelector((state) => state.auth);
  // Get the dispatch function to trigger actions.
  const dispatch = useDispatch();

  /**
   * Handles the logout action by dispatching the logout action.
   */
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        {/* Fixed header section with search, notifications, and user dropdown */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-b z-50 flex items-center px-4 gap-4">
          <SidebarTrigger className="p-2 hover:bg-secondary rounded-lg transition-colors" />

          <div className="flex-1 flex items-center gap-4 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-secondary/50 border-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="hidden md:block">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <div className="flex w-full pt-16">
          <AppSidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
