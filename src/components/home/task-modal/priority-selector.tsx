/**
 * Priority selector component
 *
 * This component is used to select a priority from a list of priorities.
 */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectorProps {
  value: string;
  onSelect: (value: string) => void;
}

export const PrioritySelector = ({
  value,
  onSelect,
}: PrioritySelectorProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="priority">Priority</Label>
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
