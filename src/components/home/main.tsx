import { TaskList } from "./task-list";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const statuses = [
    "To Do",
    "In Progress",
    "Done"
]

export const Main = () => {
    const user = useSelector((state: RootState) => state.user);

    const todoTasks = user.board?.tasks.filter((task) => task.status === "To Do");
    const inProgressTasks = user.board?.tasks.filter((task) => task.status === "In Progress");
    const doneTasks = user.board?.tasks.filter((task) => task.status === "Done");

    return (
        <main className="w-full h-full flex flex-col gap-y-10 flex-1 overflow-hidden relative">
            <header className={`font-semibold text-4xl`}>
                <h1>My Tasks</h1>
            </header>
            <section className="task-container h-full overflow-hidden">
                {statuses.map((status) => (
                    <TaskList key={status} status={status} tasks={
                        status === "To Do" ? todoTasks : status === "In Progress" ? inProgressTasks : doneTasks
                    }/>
                ))}
            </section>
            <div className="bg-blur-circle"></div>
        </main>
    );
}