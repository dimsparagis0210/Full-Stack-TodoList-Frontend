import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
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
import type { UseMutationResult } from "@tanstack/react-query";

interface EditProfileModalProps {
  user: {
    name: string;
    email: string;
    id: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updateUserMutation: UseMutationResult<any, Error, any, unknown>;
}

export const EditProfileModal = ({ user, open, onOpenChange, updateUserMutation }: EditProfileModalProps) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Submitting user data:", form);
    
    updateUserMutation.mutate(form, {
      onSuccess: () => {
        console.log("User profile updated successfully");
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Error updating user profile:", error);
        // Keep modal open on error so user can see what happened
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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