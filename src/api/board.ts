/**
 * Board API
 * 
 * This module provides functions to interact with the board API.
 * It includes functions to get the board for a given creatorId,
 * add a task to the board, edit a task, delete a task, and delete multiple tasks.
 */
import type { Board, Task, TaskDTO } from "@/types/types";
import { API_URL } from "@/lib/constants";
import { apiFetch } from "./api-fetch";

/**
 * Get the board for a given creatorId
 * @param creatorId - The id of the creator of the board
 * @returns The board
 */
export const getBoard = async (creatorId: number): Promise<Board> => {
    return await apiFetch(`${API_URL}/board/${creatorId}`);
}

/**
 * Add a task to the board
 * @param task - The task to add
 * @param creatorId - The id of the creator of the board
 * @returns The task
 */
export const addTaskToBoard = async (task: TaskDTO, creatorId: number): Promise<Task> => {
    return await apiFetch(`${API_URL}/board/addTask/${creatorId}`, {
        method: "POST",
        body: JSON.stringify(task),
    });
}

/**
 * Edit a task
 * @param task - The task to edit
 * @param taskId - The id of the task to edit
 * @returns The task
 */
export const editTask = async (task: TaskDTO, taskId: number): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/update/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(task),
    });
}

/**
 * Delete a task
 * @param taskId - The id of the task to delete
 * @returns The task
 */
export const deleteTask = async (taskId: number): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/delete/${taskId}`, {
        method: "DELETE",
    });
}

/**
 * Delete multiple tasks
 * @param taskIds - The ids of the tasks to delete
 * @returns The tasks
 */
export const deleteTasks = async (taskIds: number[]): Promise<Task> => {
    return await apiFetch(`${API_URL}/task/deleteTasks`, {
        method: "DELETE",
        body: JSON.stringify(taskIds),
    });
}

/**
 * Create a board
 * @returns The board
 */
export const createBoard = async (id: number): Promise<Board> => {
    return await apiFetch(`${API_URL}/board/create/${id}`, {
        method: "POST",
    });
}