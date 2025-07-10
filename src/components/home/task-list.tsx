import type { Task as TaskType } from "@/types/types";
import { Task } from "./task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CreateTaskModal } from "./create-task-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/home/use-delete-tasks";

export const TaskList = ({ status, tasks }: { status: string, tasks: TaskType[] }) => {
    const { mutate: deleteTasks } = useDeleteTask();
    const handleDeleteAll = () => {
        const taskIds = tasks.map((task) => task.id);
        deleteTasks(taskIds);
    }
    return (
        <section className="flex flex-col gap-y-10 h-full overflow-hidden min-h-0">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{status} (3)</h1>
                <section className="flex items-center gap-x-2">
                    <CreateTaskModal trigger={
                        <AddIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
                    }
                        status={status}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
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
            <section className="task-list">
                {
                    tasks.length > 0 && tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </section>
        </section>
    );
}