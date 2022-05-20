import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, signUpService } from "../../services/authServices";
import toast from "react-hot-toast";

export const loginHandler = createAsyncThunk(
  "auth/loginHandler",

  async (arg, { rejectWithValue }) => {
    const { login, setLogin } = arg;

    try {
      const { data, status } = await loginService(login.input);
      console.log("login data",data);
      if (status === 200) {
        localStorage.setItem("SM_token", data.encodedToken);
        localStorage.setItem("SM_user", JSON.stringify(data.foundUser));

        toast.success(
          `Welcome back, ${data.foundUser.fullName.split(" ")[0]}!`,
          {
            icon: "👋",
          }
        );

        return data;
      }
    } catch (err) {
      setLogin({ ...login, error: err.response.statusText });
      return rejectWithValue([], false);
    }
  }
);

export const signUpHandler = createAsyncThunk(
  "auth/signUpHandler",

  async (arg, { rejectWithValue }) => {
    const { signup, setSignup } = arg;

    try {
      const { data, status } = await signUpService(signup.input);

      if (status === 201) {
        localStorage.setItem("SM_token", data.encodedToken);
        localStorage.setItem("SM_user", JSON.stringify(data.createdUser));

        toast.success(`Hi, ${data.createdUser.fullName.split(" ")[0]}!`, {
          icon: "👋",
        });

        return data;
      }
    } catch (err) {
      setSignup({ ...signup, error: err.response.statusText });
      return rejectWithValue([], false);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: localStorage.getItem("SM_token") || null,
    user: JSON.parse(localStorage.getItem("SM_user")) || null,
    isLoading: false,
  },

  reducers: {
    logoutHandler: (state) => {
      state.token = null;
      localStorage.removeItem("SM_token");
      localStorage.removeItem("SM_user");
      toast.success("Logged out");
    },
  },

  extraReducers: {
    // login
    [loginHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [loginHandler.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.encodedToken;
      state.user = payload.foundUser;
    },
    [loginHandler.rejected]: (state, { payload }) => {
      state.isLoading = payload;
    },

    // signup
    [signUpHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpHandler.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.encodedToken;
      state.user = payload.createdUser;
    },
    [signUpHandler.rejected]: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { logoutHandler } = authSlice.actions;
export default authSlice.reducer;
