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

export const useTaskForm = ({
  task,
  assignedToName = "",
  status = "To Do",
}: UseTaskFormProps) => {
  // States
  const isEditMode = Boolean(task);

  // Form state
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "",
    priority: task?.priority || "",
    assignedTo: assignedToName || "",
    startDate: task?.startDate
      ? new Date(task.startDate)
      : (undefined as Date | undefined),
    dueDate: task?.dueDate
      ? new Date(task.dueDate)
      : (undefined as Date | undefined),
  });

  // Error state
  const [dateError, setDateError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [assigneeError, setAssigneeError] = useState("");

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
    setForm((prev) => ({ ...prev, ...updates }));
    // Clear date error when dates change and both are present and valid
    if (updates.startDate !== undefined || updates.dueDate !== undefined) {
      const newStartDate =
        updates.startDate !== undefined ? updates.startDate : form.startDate;
      const newDueDate =
        updates.dueDate !== undefined ? updates.dueDate : form.dueDate;

      if (
        newStartDate &&
        newDueDate &&
        !isNaN(newStartDate.getDate()) &&
        !isNaN(newDueDate.getDate())
      ) {
        setDateError("");
      }
    }
    if (updates.priority !== undefined) {
      setPriorityError("");
    }
    if (updates.assignedTo !== undefined) {
      setAssigneeError("");
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
    setPriorityError("");
    setAssigneeError("");
  };

  const validatePriority = () => {
    setPriorityError("");
    if (form.priority === "") {
      setPriorityError("Priority is required");
      return false;
    }
    return true;
  };

  const validateAssignee = () => {
    setAssigneeError("");
    if (form.assignedTo === "") {
      setAssigneeError("Assignee is required");
      return false;
    }
    return true;
  };

  const validateDates = () => {
    setDateError("");

    const hasStartDate = form.startDate && !isNaN(form.startDate.getDate());
    const hasDueDate = form.dueDate && !isNaN(form.dueDate.getDate());

    // Check if both dates are missing
    if (!hasStartDate && !hasDueDate) {
      setDateError("Both start date and due date are required");
      return false;
    }

    // Check if only start date is missing
    if (!hasStartDate) {
      setDateError("Start date is required");
      return false;
    }

    // Check if only due date is missing
    if (!hasDueDate) {
      setDateError("Due date is required");
      return false;
    }

    // Check if start date is after due date
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
    status: isEditMode ? task?.status || "To Do" : status,
  });

  return {
    form,
    dateError,
    priorityError,
    assigneeError,
    isEditMode,
    updateForm,
    resetForm,
    validateDates,
    validatePriority,
    validateAssignee,
    getTaskData,
  };
};
