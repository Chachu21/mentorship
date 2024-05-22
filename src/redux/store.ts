import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/userSlice";
import formReducer from "./features/formReducer";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    form: formReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
