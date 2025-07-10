/**
 * Task component
 * 
 * This component is the task component of the home page.
 * It renders a task of the home page.
 */
import { useState } from "react";
import type { Task as TaskType } from "@/types/types";
import { getDateRange, getInitials } from "@/lib/utils";
import { useUserById } from "@/hooks/home/use-user-by-id";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskModal } from "../task-modal/task-modal";
import { Edit, Move, Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/home/use-delete.task";
import { useEditTask } from "@/hooks/home/use-edit-task";

type TaskProps = {
    task: TaskType;
}

export const Task = ({ task }: TaskProps) => {
    // Hooks and states
    const user = useUserById(task.assignedTo); // Get the user by id
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
    const assigneeName = getInitials(user.data?.name || ""); // Extract the assignee name initials
    const priorityColor = task.priority === "Low" ? "bg-myGreen/10 text-myGreen" : task.priority === "Medium" ? "bg-myYellow/10 text-myYellow" : "bg-myRed/10 text-myRed"; // Set the priority color

    // Mutations
    const deleteTaskMutation = useDeleteTask(task.id);
    const handleDeleteClick = () => {
        console.log("Deleting task");
        deleteTaskMutation.mutate(task.id, {
            onSuccess: () => {
                setDropdownOpen(false); // Close dropdown after successful delete
            }
        });
    }

    const editTaskMutation = useEditTask(task.id);
    const handleMoveTask = (newStatus: string) => {
        const newTask = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            dueDate: task.dueDate,
            category: task.category,
            assignedTo: user.data?.name,
            status: newStatus,
        }
        editTaskMutation.mutate({task: newTask, taskId: task.id}, {
            onSuccess: () => {
                setDropdownOpen(false); // Close dropdown after successful move
            }
        });
    }

    // Handle successful edit
    const handleEditSuccess = () => {
        setDropdownOpen(false); // Close dropdown after successful edit
    };

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    {/* Task card */}
                    <section className="hover:bg-[#f5f5f5] hover:cursor-pointer transition-all duration-300 flex flex-col gap-y-10 border border-[#E3E3E3] rounded-lg p-5 my-shadow bg-white">
                        <header className="flex flex-col gap-y-2">
                            <section className="flex justify-between">
                                <h1 className="text-2xl font-semibold">{task.title}</h1>
                                <h2 className="text-sm bg-[#27C5C5]/10 text-primary-blue text-white px-2 py-1 rounded-md">{task.category}</h2>
                            </section>
                            <section className="flex w-fit items-center gap-x-2 border border-[#E2E2E2] rounded-sm p-1">
                                <img src="calendar.png" alt="Calendar" width={20} height={20} />
                                <p className="text-sm text-primaryGray">{getDateRange(task.startDate, task.dueDate)}</p>
                            </section>
                        </header>
                        <section className={`flex flex-col gap-y-2`}>
                            <section className={`w-fit ${priorityColor} rounded-sm py-3 px-10 text-lg`}>
                                <p>{task.priority}</p>
                            </section>
                            <section className={`flex justify-between items-end`}>
                                <p className="text-lg text-primaryGray">{task.description}</p>
                                <section className={`w-12 aspect-square flex items-center justify-center text-xl text-primaryGray bg-[#E2E2E2] rounded-full`}>
                                    <p>{assigneeName}</p>
                                </section>
                            </section>
                        </section>
                    </section>
                </DropdownMenuTrigger>
                {/* Dropdown menu content */}
                <DropdownMenuContent className="w-56">
                    {/* Edit Task Modal with dropdown item as trigger */}
                    <TaskModal
                        task={task}
                        assignedToName={user.data?.name || ""}
                        onSuccess={handleEditSuccess}
                        trigger={
                            <DropdownMenuItem 
                                className="cursor-pointer"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        }
                    />
                    {/* Delete task */}
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                    {/* Move task */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Move className="mr-2 h-4 w-4" />
                            Move to
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => handleMoveTask("To Do")}>
                                To Do
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMoveTask("In Progress")}>
                                In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMoveTask("Done")}>
                                Done
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}