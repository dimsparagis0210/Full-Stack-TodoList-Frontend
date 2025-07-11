import type { User } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  credentialsNonExpired: false,
  enabled: false,
  accountNonExpired: false,
  accountNonLocked: false,
  authorities: [],
  email: "",
  id: 0,
  name: "",
  username: "",
  password: "",
  board: {
    id: 0,
    tasks: [],
  },
  assignedTasks: [],
  createdTasks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
