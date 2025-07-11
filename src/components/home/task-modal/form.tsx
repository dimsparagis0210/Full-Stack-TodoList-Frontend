/**
 * Form component
 *
 * This component is used to display the form for the task modal.
 */
import { DatePicker } from "./date-picker";
import { useFormHandlers } from "@/hooks/home/use-form-handlers";
import { FormInput } from "./form-input";
import { PrioritySelector } from "./priority-selector";
import { AssigneeSelector } from "./assignee-selector";
import { Footer } from "./footer";

interface FormProps {
  updateForm: (
    updates: Partial<{
      title: string;
      description: string;
      category: string;
      priority: string;
      assignedTo: string;
      startDate: Date | undefined;
      dueDate: Date | undefined;
    }>
  ) => void;
  assignedToName: string;
  status: string;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    title: string;
    description: string;
    category: string;
    priority: string;
    assignedTo: string;
    startDate: Date | undefined;
    dueDate: Date | undefined;
  };
  dateError: string;
  assigneeError: string;
  priorityError: string;
  isEditMode: boolean;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}
export const Form = ({
  updateForm,
  assignedToName,
  status,
  onSubmit,
  form,
  dateError,
  assigneeError,
  priorityError,
  isEditMode,
  closeButtonRef,
}: FormProps) => {
  // Form handlers
  const {
    handleInputChange,
    handlePriorityChange,
    handleAssigneeSelect,
    handleStartDateSelect,
    handleDueDateSelect,
  } = useFormHandlers({ updateForm, assignedToName, status });
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Basic form fields */}
      <FormInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleInputChange}
      />
      <FormInput
        label="Description"
        name="description"
        value={form.description}
        onChange={handleInputChange}
      />
      <FormInput
        label="Category"
        name="category"
        value={form.category}
        onChange={handleInputChange}
      />

      {/* Priority selector */}
      <PrioritySelector value={form.priority} onSelect={handlePriorityChange} />

      {/* Assignee error message */}
      {priorityError && (
        <div className="text-red-500 text-sm">{priorityError}</div>
      )}

      {/* Assignee selector component */}
      <AssigneeSelector
        value={form.assignedTo}
        onSelect={handleAssigneeSelect}
      />

      {/* Assignee error message */}
      {assigneeError && (
        <div className="text-red-500 text-sm">{assigneeError}</div>
      )}

      {/* Date pickers */}
      <div className="flex gap-2">
        <DatePicker
          label="Start Date"
          value={form.startDate}
          onSelect={handleStartDateSelect}
          placeholder="Pick a start date"
          hasError={!!dateError}
        />
        <DatePicker
          label="Due Date"
          value={form.dueDate}
          onSelect={handleDueDateSelect}
          placeholder="Pick a due date"
          hasError={!!dateError}
        />
      </div>

      {/* Date error message */}
      {dateError && (
        <div className="text-red-500 text-sm mt-1">{dateError}</div>
      )}

      {/* Form actions */}
      <Footer isEditMode={isEditMode} closeButtonRef={closeButtonRef} />
    </form>
  );
};
