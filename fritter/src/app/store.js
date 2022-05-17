import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postSlice,
    user: userSlice,
  },
});
