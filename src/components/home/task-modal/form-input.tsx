/**
 * Form input component
 *
 * This component is used to display a form input.
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({ label, name, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} value={value} onChange={onChange} required />
    </div>
  );
};
