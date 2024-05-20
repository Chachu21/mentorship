import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface UserState {
  user: UserType | null; // Update to single user instead of array of users
  isClicked: boolean;
  isLogin: boolean;
  roleBeforLogin: string;
}

// Function to retrieve user data from localStorage
const getUserData = (): UserType | null => {
  if (typeof window !== "undefined") {
    const userDataString = localStorage.getItem("user");
    return userDataString ? JSON.parse(userDataString) : null;
  } else {
    return null;
  }
};

const initialState: UserState = {
  user: getUserData(), // Initialize with user data fetched from localStorage
  isLogin: false,
  isClicked: false,
  roleBeforLogin: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    menuBar: (state) => {
      state.isClicked = !state.isClicked;
    },
    closeMenuBar: (state) => {
      state.isClicked = false;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLogin = false;
      state.isClicked = false;
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
    setRoleBeforeLogin: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.roleBeforLogin = action.payload;
    },
  },
});

export const {
  menuBar,
  loginSuccess,
  logoutSuccess,
  closeMenuBar,
  setRoleBeforeLogin,
} = userSlice.actions;
export default userSlice.reducer;
