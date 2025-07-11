/**
 * Form handlers hook
 *
 * This hook is used to handle the form inputs.
 */
interface UseFormHandlersProps {
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
}

export const useFormHandlers = ({ updateForm }: UseFormHandlersProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value: string) => {
    updateForm({ priority: value });
  };

  const handleAssigneeSelect = (name: string) => {
    updateForm({ assignedTo: name });
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    updateForm({ startDate: date });
  };

  const handleDueDateSelect = (date: Date | undefined) => {
    updateForm({ dueDate: date });
  };

  return {
    handleInputChange,
    handlePriorityChange,
    handleAssigneeSelect,
    handleStartDateSelect,
    handleDueDateSelect,
  };
};
