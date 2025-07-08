import type { Task as TaskType } from "@/types/types";

export const Task = ({ task }: { task: TaskType }) => {
    // Extract the first two letters of the assignee's name
    const assigneeName = task.assignedTo
        .split(" ")
        .filter(Boolean)
        .map(name => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();


    
    return (
        <section className="flex flex-col gap-y-10 border border-[#E3E3E3] rounded-lg p-5 my-shadow bg-white">
            <header className="flex flex-col gap-y-2">
                <section className="flex justify-between">
                    <h1 className="text-2xl font-semibold">{task.title}</h1>
                    <h2 className="text-sm bg-[#27C5C5]/10 text-primary-blue text-white px-2 py-1 rounded-md">{task.category}</h2>
                </section>
                <section className="flex w-fit items-center gap-x-2 border border-[#E2E2E2] rounded-sm p-1">
                    <img src="calendar.png" alt="Calendar" width={20} height={20} />
                    <p className="text-sm text-primaryGray">25/01 - 28/01</p> {/*TODO*/}
                </section>
            </header>
            <section className={`flex flex-col gap-y-2`}>
                <section className={`w-fit bg-myRed/10 text-myRed rounded-sm py-3 px-10 text-lg`}>
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
    );
}