/**
 * Task list component
 * 
 * This component is the task list component of the home page.
 * It renders a task list of the home page.
 */
import type { Task as TaskType } from "@/types/types";
import { Task } from "./task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TaskModal } from "../task-modal/task-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/home/use-delete-tasks";

type TaskListProps = {
    status: string;
    tasks: TaskType[] | undefined;
}

export const TaskList = ({ status, tasks }: TaskListProps) => {
    // Hooks and States
    const { mutate: deleteTasks } = useDeleteTask(); // Mutation to delete tasks

    // Handlers
    const handleDeleteAll = () => {
        const taskIds = tasks?.map((task) => task.id) || [];
        if (taskIds) {
            deleteTasks(taskIds);
        }
    }

    return (
        <section className="flex flex-col gap-y-10 h-full overflow-hidden min-h-0">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{status} (3)</h1>
                <section className="flex items-center gap-x-2">
                    {/* Create task modal */}
                    <TaskModal trigger={
                        <AddIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
                    }
                        status={status}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {/* Show dropdown menu when clicking the more options icon */}
                            <MoreHorizIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                            <DropdownMenuItem 
                                className=" hover:bg-red-50 focus:bg-red-50 cursor-pointer"
                                onClick={handleDeleteAll}
                            >
                                <Trash className="mr-2 h-4 w-4 text-red-500 hover:text-red-500" />
                                <p className="text-red-500 hover:text-red-500">Delete all</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>
            </header>
            {/* Task list */}
            <section className="task-list">
                {
                    tasks && tasks.length > 0 && tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </section>
        </section>
    );
}