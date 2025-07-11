import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/api/board";

export const useCreateBoard = (id: number) => {
  // Mutation hook
  return useMutation({
    mutationFn: () => createBoard(id),
    onSuccess: () => {
      console.log("Board created");
    },
    onError: () => {
      console.log("Error creating board");
    },
  });
};
