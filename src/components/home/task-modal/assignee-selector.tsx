/**
 * Assignee selector component
 * 
 * This component is used to select an assignee from a list of users.
 * It uses a debounced search to search for users.
 */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebouncedSearch } from "@/hooks/home/use-debounced-search";

interface AssigneeSelectorProps {
  value: string;
  onSelect: (name: string) => void;
}

export const AssigneeSelector = ({ value, onSelect }: AssigneeSelectorProps) => {
  // States
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery, users, showLoading, error, clearSearch, hasQuery } = useDebouncedSearch(); // Debounced search hook

  // Handlers
  const handleSelect = (id: number, name: string) => {
    onSelect(name);
    setOpen(false);
    clearSearch();
  };

  // Selected user
  const selectedUser = users.find((user: any) => user.name === value) || 
                      (value ? { name: value } : null);

  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="assignee">Assignee</Label>
      <Popover open={open} onOpenChange={setOpen}>
        {/* The Button that opens the Popover */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className={selectedUser ? "" : "text-muted-foreground"}>
              {selectedUser ? selectedUser.name : "Select assignee..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* The Popover content */}
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search assignee..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              
              required
            />
            {/* The CommandList */}
            <CommandList>
              {showLoading && searchQuery && (
                <div className="p-2 text-sm text-muted-foreground flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  Searching...
                </div>
              )}
              {error && (
                <div className="p-2 text-sm text-red-500">Error searching users</div>
              )}
              {!showLoading && !error && users.length === 0 && hasQuery && (
                <CommandEmpty>No assignee found.</CommandEmpty>
              )}
              {!searchQuery && !showLoading && (
                <div className="p-2 text-sm text-muted-foreground">Start typing to search users...</div>
              )}
              {users.length > 0 && !showLoading && (
                <CommandGroup>
                  {users.map((user: any) => (
                    <CommandItem
                      key={user.id}
                      value={user.name}
                      onSelect={() => handleSelect(user.id, user.name)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === user.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}; 