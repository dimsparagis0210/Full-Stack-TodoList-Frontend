import React, { useState } from "react";
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
import { EditTaskModal } from "./edit-task-modal";
import { Edit, Move, Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/home/use-delete.task";
import { useEditTask } from "@/hooks/home/use-edit-task";

export const Task = ({ task }: { task: TaskType }) => {
    const user = useUserById(task.assignedTo);
    const assigneeName = getInitials(user.data?.name || "");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const priorityColor = task.priority === "Low" ? "bg-myGreen/10 text-myGreen" : task.priority === "Medium" ? "bg-myYellow/10 text-myYellow" : "bg-myRed/10 text-myRed";

    const deleteTaskMutation = useDeleteTask(task.id);
    const handleDeleteClick = () => {
        deleteTaskMutation.mutate(task.id);
    }

    const handleEditClick = () => {
        setEditModalOpen(true);
        
    };
    
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
        editTaskMutation.mutate({task: newTask, taskId: task.id});
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
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
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={handleEditClick}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
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
            
            <EditTaskModal
                task={task}
                assignedToName={user.data?.name || ""}
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
            />
        </>
    );
}