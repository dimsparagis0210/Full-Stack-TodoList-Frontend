import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSearchUsers } from "@/hooks/home/use-search-users";
import { useAddTask } from "@/hooks/home/use-add-task";

interface CreateTaskModalProps {
  trigger?: React.ReactNode;
  status: string;
}

export const CreateTaskModal = ({ trigger, status }: CreateTaskModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    assignedTo: "",
    startDate: undefined as Date | undefined,
    dueDate: undefined as Date | undefined,
  });

  const [open, setOpen] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [dateError, setDateError] = useState("");
  const addTaskMutation = useAddTask();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use the debounced search query for API calls
  const { data: users = [], isLoading, error } = useSearchUsers(debouncedSearchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssigneeSelect = (id: number, name: string) => {
    setForm({ ...form, assignedTo: name });
    setOpen(false);
    // Clear search when selection is made
    setSearchQuery("");
    setDebouncedSearchQuery("");
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setForm({ ...form, startDate: date });
    setStartDateOpen(false);
    // Clear date error when user changes dates
    if (dateError) setDateError("");
  };

  const handleDueDateSelect = (date: Date | undefined) => {
    setForm({ ...form, dueDate: date });
    setDueDateOpen(false);
    // Clear date error when user changes dates
    if (dateError) setDateError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setDateError("");
    // Validate dates
    if (form.startDate && form.dueDate && form.startDate > form.dueDate) {
      setDateError("Start date cannot be after due date");
      return;
    }
    
    // Convert dates to ISO string format for API
    const taskData = {
      ...form,
      status: status || "To Do",
      startDate: form.startDate ? format(form.startDate, "yyyy-MM-dd") : "",
      dueDate: form.dueDate ? format(form.dueDate, "yyyy-MM-dd") : "",
    };

    console.log("TaskData in handleSubmit: ", taskData);
    
    addTaskMutation.mutate(
      { task: taskData, creatorId: 4 },
      {
        onSuccess: () => {
          console.log("Task added successfully");
          // Reset form
          setForm({
            title: "",
            description: "",
            category: "",
            priority: "",
            assignedTo: "",
            startDate: undefined,
            dueDate: undefined,
          });
          // Clear any errors
          setDateError("");
          // Close modal using the close button ref
          closeButtonRef.current?.click();
        },
        onError: (error) => {
          console.error("Error adding task:", error);
        }
      }
    );
  };

  // Find selected user from the current search results or previous searches
  const selectedUser = users.find((user: any) => user.name === form.assignedTo) || 
                    (form.assignedTo ? { name: form.assignedTo } : null);

  // Determine if we should show loading (when typing but not yet searched)
  const isTyping = searchQuery !== debouncedSearchQuery;
  const showLoading = isLoading || isTyping;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>Fill in the details below to add a new task.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={form.priority} onValueChange={(value) => setForm({ ...form, priority: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedUser ? selectedUser.name : "Select assignee..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search assignee..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
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
                    {!showLoading && !error && users.length === 0 && debouncedSearchQuery && (
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
                            onSelect={() => handleAssigneeSelect(user.id, user.name)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                form.assignedTo === user.id ? "opacity-100" : "opacity-0"
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
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !form.startDate && "text-muted-foreground",
                      dateError && "border-red-500 focus:ring-red-500"
                    )}
                  >
                    {form.startDate ? format(form.startDate, "PPP") : <span>Pick a start date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.startDate}
                    onSelect={handleStartDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !form.dueDate && "text-muted-foreground",
                      dateError && "border-red-500 focus:ring-red-500"
                    )}
                  >
                    {form.dueDate ? format(form.dueDate, "PPP") : <span>Pick a due date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.dueDate}
                    onSelect={handleDueDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {dateError && (
            <div className="text-red-500 text-sm mt-1 flex items-center gap-2">
              {dateError}
            </div>
          )}
          <DialogFooter>
            <Button type="submit" className="my-button">Create</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="my-button" ref={closeButtonRef}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 