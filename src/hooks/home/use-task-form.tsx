/**
 * Task form hook
 * 
 * This hook is used to manage the task form.
 */
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Task } from "@/types/types";

interface UseTaskFormProps {
  task?: Task;
  assignedToName?: string;
  status?: string;
}

export const useTaskForm = ({ task, assignedToName = "", status = "To Do" }: UseTaskFormProps) => {
  // States
  const isEditMode = Boolean(task);
  
  // Form state
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "",
    priority: task?.priority || "",
    assignedTo: assignedToName || "",
    startDate: task?.startDate ? new Date(task.startDate) : (undefined as Date | undefined),
    dueDate: task?.dueDate ? new Date(task.dueDate) : (undefined as Date | undefined),
  });
  
  // Date error state
  const [dateError, setDateError] = useState("");

  // Reset form when task changes (edit mode)
  useEffect(() => {
    if (isEditMode && task) {
      setForm({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        assignedTo: assignedToName,
        startDate: task.startDate ? new Date(task.startDate) : undefined,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      });
    }
  }, [task, assignedToName, isEditMode]);

  const updateForm = (updates: Partial<typeof form>) => {
    setForm(prev => ({ ...prev, ...updates }));
    // Clear date error when dates change
    if (updates.startDate !== undefined || updates.dueDate !== undefined) {
      setDateError("");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      priority: "",
      assignedTo: "",
      startDate: undefined,
      dueDate: undefined,
    });
    setDateError("");
  };

  const validateDates = () => {
    setDateError("");
    if (form.startDate && form.dueDate && form.startDate > form.dueDate) {
      setDateError("Start date cannot be after due date");
      return false;
    }
    return true;
  };

  const getTaskData = () => ({
    ...form,
    startDate: form.startDate ? format(form.startDate, "yyyy-MM-dd") : "",
    dueDate: form.dueDate ? format(form.dueDate, "yyyy-MM-dd") : "",
    status: isEditMode ? (task?.status || "To Do") : status,
  });

  return {
    form,
    dateError,
    isEditMode,
    updateForm,
    resetForm,
    validateDates,
    getTaskData,
  };
}; 