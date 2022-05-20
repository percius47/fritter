import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";
import { Sidebar } from "../components/Sidebar";
import { SuggestedUsers } from "../components/SuggestedUsers";

import { PostCard } from "../features/post/components/PostCard";
import { getBookmarks, getAllUsers } from "../features/user/userSlice";

export const Bookmark = () => {
  const { token } = useSelector((state) => state.auth);
  const { bookmarks, isLoading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks(token));
    dispatch(getAllUsers());
  }, [dispatch, token]);

  const bookmarkedPosts = posts.filter((dbPost) =>
    bookmarks.find((bookmark) => bookmark === dbPost._id)
  );

  return (
    <div className="grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
     <Helmet>
       <title>
         Bookmarks | frittr 
       </title>
     </Helmet>
      <Sidebar />

      <div className="sm:border-x border-darkGrey">
        <h1 className="text-bold p-4 sticky top-0 bg-[#001527d8] backdrop-blur-sm z-10 border-b border-darkGrey flex justify-between">
          Bookmarks
          <div className="block xl:hidden">
            <SearchBar />
          </div>
        </h1>

        <div>
          {isLoading ? (
            <Loader />
          ) : bookmarkedPosts.length ? (
            [...bookmarkedPosts]
              .reverse()
              .map((bookmarkedPost) => (
                <PostCard post={bookmarkedPost} key={bookmarkedPost._id} />
              ))
          ) : (
            <div className="p-4 text-center">No bookmarks</div>
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
