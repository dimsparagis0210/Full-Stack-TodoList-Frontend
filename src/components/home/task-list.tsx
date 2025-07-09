import type { Task as TaskType } from "@/types/types";
import { Task } from "./task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CreateTaskModal } from "./create-task-modal";

export const TaskList = ({ status, tasks }: { status: string, tasks: TaskType[] }) => {
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
                    <MoreHorizIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
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