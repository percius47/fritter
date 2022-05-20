import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPosts } from "../features/post/postSlice";
import { getAllUsers } from "../features/user/userSlice";
import { sortByDate } from "../utils/sortByDate";
import { SortBar } from "../components/SortBar";
import { Loader } from "../components/Loader";
import { SuggestedUsers } from "../components/SuggestedUsers";
import { Sidebar } from "../components/Sidebar";
import { SearchBar } from "../components/SearchBar";
import { NewPost } from "../features/post/components/NewPost";
import { PostCard } from "../features/post/components/PostCard";
import {Helmet} from "react-helmet"
export default function Home ()  {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { posts, isLoading, activeSort } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );

  const followingUsers = loggedInUser?.following;

  var postOfFollowingUsers = posts?.filter((post) =>
  followingUsers?.some(
    (followingUser) =>
      followingUser.username === post.username 
  )
  );

  const postsOfUser=posts?.filter((post)=>
  post?.username===loggedInUser?.username
  )


  const timelinePosts=[...postOfFollowingUsers,...postsOfUser];


  const sortedPosts = sortByDate(timelinePosts, activeSort);

  return (
    <div className="grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
     <Helmet>
       <title>
         Home | frittr 
       </title>
     </Helmet>
      <Sidebar />

      <div className="sm:border-x border-darkGrey">
        <h1 className="text-bold p-4 sticky top-0 bg-[#001527d8] backdrop-blur-sm z-20 border-b border-darkGrey flex justify-between">
          Home
          <div className="block xl:hidden">
            <SearchBar />
          </div>
        </h1>

        <div>
          <NewPost />

          <SortBar />

          <div>
            {isLoading ? (
              <Loader />
            ) : sortedPosts?.length ? (
              [...sortedPosts]
                .reverse()
                .map((post) => 
                 <PostCard post={post} key={post._id} /> 
                )
            ) : (
              <div className="p-4 text-center">No posts</div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden xl:block">
        <SearchBar />
        <SuggestedUsers />
      </div>
    </div>

  );
};
