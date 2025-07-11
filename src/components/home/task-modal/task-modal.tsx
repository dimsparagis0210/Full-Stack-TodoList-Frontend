/**
 * Task modal component
 * 
 * This component handles both creating and editing tasks.
 * It automatically detects mode based on whether a task prop is provided.
 */
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTaskForm } from "@/hooks/home/use-task-form";
import { useAddTask } from "@/hooks/home/use-add-task";
import { useEditTask } from "@/hooks/home/use-edit-task";
import type { Task } from "@/types/types";
import { Form } from "./form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface TaskModalProps {
  trigger?: React.ReactNode;
  task?: Task; // If provided, it's edit mode; if not, it's create mode
  assignedToName?: string; // Used for edit mode
  status?: string; // Used for create mode
  onSuccess?: () => void; // Callback for edit mode
}

export const TaskModal = ({
  trigger,
  task,
  assignedToName = "",
  status = "To Do",
  onSuccess
}: TaskModalProps) => {
  // Get the user from the Redux store
  const user = useSelector((state: RootState) => state.user);

  // Ref for the close button
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Hook for managing the task form
  const {
    form,
    dateError,
    priorityError,
    assigneeError,
    isEditMode,
    updateForm: originalUpdateForm,
    resetForm,
    validateDates,
    validatePriority,
    validateAssignee,
    getTaskData
  } = useTaskForm({ task, assignedToName, status });

  // Wrapper to clear assignee error when assignee changes
  const updateForm = (updates: Parameters<typeof originalUpdateForm>[0]) => {
    console.log("updates", updates);
    if (updates.assignedTo !== undefined) {
      validateAssignee();
    } else if (updates.priority !== undefined) {
      validatePriority();
    } else if (updates.startDate !== undefined || updates.dueDate !== undefined) {
      validateDates();
    }
    originalUpdateForm(updates);
  };

  // Mutation hooks
  const addTaskMutation = useAddTask();
  const editTaskMutation = useEditTask(task?.id || 0);

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate priority, assignee, and dates
    if (!validatePriority()) return;
    if (!validateAssignee()) return;
    if (!validateDates()) return;

    // Submit
    const taskData = getTaskData();

    if (isEditMode && task) {
      // Edit existing task
      editTaskMutation.mutate(
        { task: taskData, taskId: task.id },
        {
          onSuccess: () => {
            closeButtonRef.current?.click();
            onSuccess?.();
          },
          onError: (error) => console.error("Error updating task:", error)
        }
      );
    } else {
      // Create new task
      addTaskMutation.mutate(
        { task: taskData, creatorId: user.id },
        {
          onSuccess: () => {
            resetForm();
            closeButtonRef.current?.click();
          },
          onError: (error) => console.error("Error adding task:", error)
        }
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Task" : "Create a New Task"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the task details below."
              : "Fill in the details below to add a new task."
            }
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <Form 
          updateForm={updateForm} 
          assignedToName={assignedToName} 
          status={status} 
          onSubmit={handleSubmit} 
          form={form} 
          dateError={dateError} 
          assigneeError={assigneeError}
          priorityError={priorityError}
          isEditMode={isEditMode} 
          closeButtonRef={closeButtonRef} 
        />
      </DialogContent>
    </Dialog>
  );
}; 