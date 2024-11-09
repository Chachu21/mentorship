import cookies from "js-cookie";
import { IUser } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  is_account_full_created: Boolean;
}

interface UserState {
  user: UserType | null; // Update to single user instead of array of users
  isClicked: boolean;
  isLogin: boolean;
  isMenu: boolean;
  roleBeforLogin: string;
  data: IUser;
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
  isMenu: false,
  roleBeforLogin: "",
  data: {
    fullName: "",
    phoneNumber: "",
    email: "",
    _id: "",
    profileImage: {
      public_id: "",
      url: "",
    },
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Profile: (state) => {
      state.isClicked = !state.isClicked;
    },
    closeProfile: (state) => {
      state.isClicked = false;
    },
    menuBar: (state) => {
      state.isMenu = !state.isMenu;
    },
    closeMenuBar: (state) => {
      state.isMenu = false;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLogin = false;
      state.isClicked = false;
      cookies.remove("data");
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
    setRoleBeforeLogin: (state, action: PayloadAction<string>) => {
      state.roleBeforLogin = action.payload;
    },
    setData: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const {
  Profile,
  loginSuccess,
  logoutSuccess,
  closeProfile,
  setRoleBeforeLogin,
  setData,
  menuBar,
  closeMenuBar,
} = userSlice.actions;
export default userSlice.reducer;
