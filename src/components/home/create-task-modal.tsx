import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CloseIcon from '@mui/icons-material/Close';

interface CreateTaskModalProps {
  trigger?: React.ReactNode;
}

export const CreateTaskModal = ({ trigger }: CreateTaskModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    assignee: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle task creation logic
    // Reset form or close modal as needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>Fill in the details below to add a new task.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input id="assignee" name="assignee" value={form.assignee} onChange={handleChange} required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="my-button">Create</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="my-button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 