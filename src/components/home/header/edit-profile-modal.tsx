/**
 * Edit profile modal component
 * 
 * This component is used to edit the user's profile.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/home/use-update-user";

interface EditProfileModalProps {
  user: {
    name: string;
    email: string;
    id: number;
  };
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export const EditProfileModal = ({ user, trigger, onSuccess }: EditProfileModalProps) => {
  // Hooks and States
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null); // Ref for the close button
  const updateUserMutation = useUpdateUser(user.id); // Mutation to update the user

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserMutation.mutate(form, {
      onSuccess: () => {
        closeButtonRef.current?.click();
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Error updating user profile:", error);
      }
    });
  };

  // Reset form when user prop changes
  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  return (
    <Dialog>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email"
              value={form.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="my-button" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Updating..." : "Update Profile"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="my-button" ref={closeButtonRef}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 