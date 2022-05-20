import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts} from "../features/post/postSlice";
import { PostCard } from "../features/post/components/PostCard";
import { getAllUsers } from "../features/user/userSlice";
import { SearchBar } from "../components/SearchBar";
import { SuggestedUsers } from "../components/SuggestedUsers";
import { Loader } from "../components/Loader";
import { Sidebar } from "../components/Sidebar";
import { Helmet } from "react-helmet";
export const Explore = () => {
  const dispatch = useDispatch();
  let { posts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
     <Helmet>
       <title>
         Explore | frittr 
       </title>
     </Helmet>
      <Sidebar />


      <div className="sm:border-x border-darkGrey">
        <h1 className="text-bold p-4 sticky top-0 bg-[#001527d8] backdrop-blur-sm z-10 border-b border-darkGrey flex justify-between">
          Explore
          <div className="block xl:hidden">
            <SearchBar />
          </div>
        </h1>

        <div>{
          posts.map((post)=>console.log("post",post))
          }
          {isLoading ? (
            <Loader />

          ) : posts.length ? (
            [...posts]
              .reverse()
              .map((post) => <PostCard post={post} key={post._id} />)
          ) : (
            <div className="p-4 text-center">No posts</div>
          )}
        </div>
      </div>

      <div className="hidden xl:block">
        <SearchBar />

        <SuggestedUsers />

      </div>
    </div>
  );
};
