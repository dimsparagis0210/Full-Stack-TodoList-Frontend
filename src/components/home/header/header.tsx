/**
 * Header component
 *
 * This component is the header of the home page.
 * It renders the header, provides the avatar and the create task button.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskModal } from "../task-modal/task-modal";
import { EditProfileModal } from "./edit-profile-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { getInitials } from "@/lib/utils";
import { logout } from "@/api/auth";

export const Header = () => {
  // Hooks and States
  const user = useSelector((state: RootState) => state.user); // User state
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

  // Handle log out
  const handleLogOut = () => {
    logout();
  };

  // Handle successful profile edit
  const handleEditSuccess = () => {
    setDropdownOpen(false); // Close dropdown after successful edit
  };

  return (
    <header>
      <section className="w-full h-16 flex justify-between items-center">
        <section className="flex items-center gap-x-4">
          <img src="logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-2xl font-bold text-primary-blue">BitTask</h1>
        </section>
        <section className="flex items-center gap-x-10">
          {/* Create task button */}
          <TaskModal
            status="To Do"
            trigger={
              <Button
                variant="outline"
                size="lg"
                className="bg-primary-blue text-white text-md my-button"
              >
                + Create Task
              </Button>
            }
          />
          {/* Dropdown menu to edit profile and log out */}
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              {/* Avatar to show the user initials and to trigger the dropdown menu */}
              <Avatar className="cursor-pointer h-12 w-12 ">
                <AvatarFallback className="bg-primaryGray text-white text-lg font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {/* Dropdown menu content */}
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Edit Profile Modal with dropdown item as trigger */}
              <EditProfileModal
                user={user}
                onSuccess={handleEditSuccess}
                trigger={
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </section>
    </header>
  );
};
