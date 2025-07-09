import React, { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
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
import type { Task } from "@/types/types";
import { useEditTask } from "@/hooks/home/use-edit-task";

interface EditTaskModalProps {
    task: Task;
    assignedToName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const EditTaskModal = ({
    task,
    assignedToName,
    open,
    onOpenChange,
}: EditTaskModalProps) => {
    const [form, setForm] = useState({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        assignedTo: assignedToName,
        startDate: task.startDate
            ? new Date(task.startDate)
            : (undefined as Date | undefined),
        dueDate: task.dueDate
            ? new Date(task.dueDate)
            : (undefined as Date | undefined),
    });

    const [assigneeOpen, setAssigneeOpen] = useState(false);
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [dueDateOpen, setDueDateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const editTaskMutation = useEditTask(task.id);

    // Reset form when task prop changes
    useEffect(() => {
        setForm({
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            assignedTo: assignedToName,
            startDate: task.startDate ? new Date(task.startDate) : undefined,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        });
    }, [task, assignedToName]);

    // Debounce the search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Use the debounced search query for API calls
    const {
        data: users = [],
        isLoading,
        error,
    } = useSearchUsers(debouncedSearchQuery);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAssigneeSelect = (id: number, name: string) => {
        setForm({ ...form, assignedTo: name });
        setAssigneeOpen(false);
        // Clear search when selection is made
        setSearchQuery("");
        setDebouncedSearchQuery("");
    };

    const handleStartDateSelect = (date: Date | undefined) => {
        setForm({ ...form, startDate: date });
        setStartDateOpen(false);
    };

    const handleDueDateSelect = (date: Date | undefined) => {
        setForm({ ...form, dueDate: date });
        setDueDateOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert dates to ISO string format for API
        const taskData = {
            ...form,
            status: task.status,
            startDate: form.startDate ? format(form.startDate, "yyyy-MM-dd") : "",
            dueDate: form.dueDate ? format(form.dueDate, "yyyy-MM-dd") : "",
        };

        editTaskMutation.mutate(
            { task: taskData, taskId: task.id },
            {
                onSuccess: () => {
                    console.log("Task updated successfully");
                    onOpenChange(false);
                },
                onError: (error) => {
                    console.error("Error updating task:", error);
                    // Keep modal open on error so user can see what happened
                },
            }
        );
    };

    // Find selected user from the current search results or previous searches
    const selectedUser =
        users.find((user: any) => user.name === form.assignedTo) ||
        (form.assignedTo ? { name: form.assignedTo } : null);

    // Determine if we should show loading (when typing but not yet searched)
    const isTyping = searchQuery !== debouncedSearchQuery;
    const showLoading = isLoading || isTyping;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Update the task details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={form.priority}
                            onValueChange={(value) =>
                                setForm({ ...form, priority: value })
                            }
                        >
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
                        <Popover open={assigneeOpen} onOpenChange={setAssigneeOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={assigneeOpen}
                                    className="w-full justify-between"
                                >
                                    {selectedUser
                                        ? selectedUser.name
                                        : "Select assignee..."}
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
                                            <div className="p-2 text-sm text-red-500">
                                                Error searching users
                                            </div>
                                        )}
                                        {!showLoading &&
                                            !error &&
                                            users.length === 0 &&
                                            debouncedSearchQuery && (
                                                <CommandEmpty>
                                                    No assignee found.
                                                </CommandEmpty>
                                            )}
                                        {!searchQuery && !showLoading && (
                                            <div className="p-2 text-sm text-muted-foreground">
                                                Start typing to search users...
                                            </div>
                                        )}
                                        {users.length > 0 && !showLoading && (
                                            <CommandGroup>
                                                {users.map((user: any) => (
                                                    <CommandItem
                                                        key={user.id}
                                                        value={user.name}
                                                        onSelect={() =>
                                                            handleAssigneeSelect(
                                                                user.id,
                                                                user.name
                                                            )
                                                        }
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                form.assignedTo === user.name
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
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
                            <Popover
                                open={startDateOpen}
                                onOpenChange={setStartDateOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-between text-left font-normal",
                                            !form.startDate && "text-muted-foreground"
                                        )}
                                    >
                                        {form.startDate ? (
                                            format(form.startDate, "PPP")
                                        ) : (
                                            <span>Pick a start date</span>
                                        )}
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
                                            !form.dueDate && "text-muted-foreground"
                                        )}
                                    >
                                        {form.dueDate ? (
                                            format(form.dueDate, "PPP")
                                        ) : (
                                            <span>Pick a due date</span>
                                        )}
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
                    <DialogFooter>
                        <Button type="submit" className="my-button">
                            Update
                        </Button>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                className="my-button"
                                ref={closeButtonRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
