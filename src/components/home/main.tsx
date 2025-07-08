import { tasks } from "@/data/data";
import { Task } from "./task";
import { TaskList } from "./task-list";

const categories = [
    "To Do",
    "In Progress",
    "Done"
]

export const Main = () => {
    const todoTasks = tasks.filter((task) => task.status === "To Do");
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
    const doneTasks = tasks.filter((task) => task.status === "Done");
    
    return (
        <main className="w-full h-full flex flex-col gap-y-10 flex-1 overflow-hidden relative">
            <header className={`font-semibold text-4xl`}>
                <h1>My Tasks</h1>
            </header>
            <section className="task-container h-full overflow-hidden">
                {categories.map((category) => (
                    <TaskList key={category} category={category} tasks={
                        category === "To Do" ? todoTasks : category === "In Progress" ? inProgressTasks : doneTasks
                    }/>
                ))}
            </section>
            <div className="bg-blur-circle"></div>
        </main>
    );
}