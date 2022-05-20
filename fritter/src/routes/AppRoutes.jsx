import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
// pages
import  Home  from "../pages/Home";
import Explore from "../pages/Explore"
import  Bookmark from "../pages/Bookmark"
import UserProfile from "../pages/UserProfile"
// components

import { PrivateRoute } from "./PrivateRoute";
import  {ScrollTop} from "../components/ScrollTop"
import { Login } from "../features/auth/components/Login";
import { Signup } from "../features/auth/components/Signup";
import {SinglePost} from "../features/post/components/SinglePost";
export const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);
        
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollTop>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post/:postId" element={<SinglePost />} />


            <Route path="/bookmarks" element={<Bookmark />} />
            <Route path="/profile/:username" element={<UserProfile />} />
          </Route>

          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </ScrollTop>
    </div>
  );
};
