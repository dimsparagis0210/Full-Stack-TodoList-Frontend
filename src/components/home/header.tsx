import { Button } from "@/components/ui/button";
import { CreateTaskModal } from "./create-task-modal";
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

export const Header = () => {
  const handleEditProfile = () => {
    // TODO: Add edit profile functionality
    console.log("Edit Profile clicked");
  };

  const handleLogOut = () => {
    // TODO: Add logout functionality
    console.log("Log Out clicked");
  };

  return (
    <header className="w-full h-16 flex justify-between items-center">
      <section className="flex items-center gap-x-4">
        <img src="logo.png" alt="logo" width={50} height={50} />
        <h1 className="text-2xl font-bold text-primary-blue">BitTask</h1>
      </section>
      <section className="flex items-center gap-x-10">
        <CreateTaskModal 
          trigger={
            <Button variant="outline" size="lg" className="bg-primary-blue text-white text-md my-button">
              + Create Task
            </Button>
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-12 w-12 ">
              <AvatarFallback className="bg-primaryGray text-white text-lg font-semibold">
                DS
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  )
}