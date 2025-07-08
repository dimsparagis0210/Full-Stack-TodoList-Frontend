import type { Task as TaskType } from "@/types/types";
import { Task } from "./task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const TaskList = ({ category, tasks }: { category: string, tasks: TaskType[] }) => {
    return (
        <section className="flex flex-col gap-y-10 h-full overflow-hidden min-h-0">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{category} (3)</h1>
                <section className="flex items-center gap-x-2">
                    <AddIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
                    <MoreHorizIcon className="text-primaryGray my-button hover:text-primaryDarkGray"/>
                </section>
            </header>
            <section className="task-list">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </section>
        </section>
    );
}