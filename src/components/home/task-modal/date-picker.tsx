/**
 * Date picker component
 *
 * This component is used to select a date from a calendar.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DatePickerProps {
  label: string;
  value?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholder: string;
  hasError?: boolean;
}

export const DatePicker = ({
  label,
  value,
  onSelect,
  placeholder,
  hasError,
}: DatePickerProps) => {
  // States
  const [open, setOpen] = useState(false);

  // Handlers
  const handleSelect = (date: Date | undefined) => {
    onSelect(date);
    setOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        {/* The Button that opens the Popover */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal",
              !value && "text-muted-foreground",
              hasError && "border-red-500 focus:ring-red-500"
            )}
          >
            {value ? format(value, "PPP") : <span>{placeholder}</span>}{" "}
            {/* The date format */}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* The Popover content */}
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={value} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
