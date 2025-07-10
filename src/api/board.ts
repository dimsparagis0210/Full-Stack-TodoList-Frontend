import type { Board, Task, TaskDTO } from "@/types/types";
import { API_URL } from "@/lib/constants";
import { apiFetch } from "./apiFetch";

export const getBoard = async (creatorId: number): Promise<Board> => {
    return await apiFetch(`${API_URL}/board/${creatorId}`);
}

export const addTaskToBoard = async (task: TaskDTO, creatorId: number): Promise<Task> => {
    console.log(task);
    return await apiFetch(`${API_URL}/board/addTask/${creatorId}`, {
        method: "POST",
        body: JSON.stringify({
            // title: task.title,
            // description: task.description,
            // category: task.category,
            // priority: task.priority,
            // assignedTo: task.assignedTo,
            // startDate: task.startDate,
            // dueDate: task.dueDate,
            ...task,
        }),
    });
}

export const editTask = async (task: TaskDTO, taskId: number): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/update/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({
            ...task,
        }),
    });
}

export const deleteTask = async (taskId: number): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/delete/${taskId}`, {
        method: "DELETE",
    });
}

export const deleteTasks = async (taskIds: number[]): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/deleteTasks`, {
        method: "DELETE",
        body: JSON.stringify(taskIds),
    });
}