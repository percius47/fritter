import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
 
  likePost,
  dislikePost,
  getSinglePost,
  resetSinglePost,

  addComment,
} from "../postSlice";
import {
  addBookmark,
  removeBookmark, 
  getAllUsers,
} from "../../user/userSlice";
import { postInBookmarks } from "../../../utils/postInBookmarks";
import { likedByLoggedUser } from "../../../utils/likedByLoggedUser";
import { getPostDate } from "../../../utils/getPostDate";
import { focusInput } from "../../../utils/focusInput";
import { CommentCard } from "./CommentCard";
import { useClickOutside } from "../../../customHooks/useClickOutside";
import {Sidebar} from "../../../components/Sidebar"
import {Loader} from "../../../components/Loader"
import { UserAvatar } from "../../../components/UserAvatar";
import {PostOptionsModal} from "./PostOptionsModal"
import { FollowListModal } from "../../user/components/FollowListModal";
import {SearchBar} from "../../../components/SearchBar"
import {SuggestedUsers} from "../../../components/SuggestedUsers"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { Helmet } from "react-helmet";

export const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const {
    posts,
    singlePost: currentPost,
  
    isLoading,
  } = useSelector((state) => state.post);
  const { users, bookmarks } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showOptions, setShowOptions] = useState(false);
  const [comment, setComment] = useState("");
  const [showLikesModal, setShowLikesModal] = useState(false);

  const postRef = useRef();
  const newCommentRef = useRef();

  const currentUser = users?.find(
    (dbUser) => dbUser.username === currentPost?.username
  );

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getAllUsers());

    return () => dispatch(resetSinglePost());
  }, [posts, postId, dispatch]);

  useClickOutside(postRef, setShowOptions);

  return (
    <div className="grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
   
     <Helmet>
     <title>
       Posts | frittr 
     </title>
   </Helmet>
   
      <Sidebar />

      <div className="sm:border-x border-darkGrey">
        <h1 className="text-bold p-4 sticky top-0 bg-[#001527d8] backdrop-blur-sm z-10">
          <ArrowBackIcon
            className="fa-solid fa-arrow-left mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          Post
        </h1>

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="flex flex-col gap-2 bg-darkSecondary text-sm border-b border-darkGrey px-4 py-3 break-all"
              ref={postRef}
            >
              <div className="grid grid-cols-[2rem_1fr] gap-2 ">
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${currentPost?.username}`);
                  }}
                >
                  <UserAvatar user={currentUser} />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div
                      className="flex gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${currentPost?.username}`);
                      }}
                    >
                      <div className="flex flex-col cursor-pointer">
                        <span className="font-bold tracking-wide">
                          {currentPost?.fullName}
                        </span>
                        <span className="text-lightGrey -mt-1">
                          @{currentPost?.username}
                        </span>
                      </div>
                      <span className="text-lightGrey">·</span>
                      <div className="text-lightGrey">
                        {getPostDate(currentPost?.createdAt)}
                      </div>
                    </div>

                    <div className="relative">
                      <MoreHorizIcon
                        className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bg-dark hover:rounded-full"
                        onClick={(e) => {
                          setShowOptions((prev) => !prev);
                          e.stopPropagation();
                        }}
                      />

                      {showOptions ? (
                        <PostOptionsModal
                          post={currentPost}
                          setShowOptions={setShowOptions}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="break-normal">{currentPost?.content}</div>
                  { 
         (currentPost?.postImage)?(
          
              <img src={currentPost?.postImage} alt="post " className=" w-8/10 mx-auto rounded my-1" />
          
          ):null
          }
                </div>
              </div>
                <div className="border-t border-darkGrey text-left pt-2 mt-2 ">
              {currentPost?.likes.likeCount > 0 ? (
                <button
                  className="cursor-pointer hover:underline mx-1"
                  onClick={() => setShowLikesModal(true)}
                >
                  <span className="text-bold">
                    {currentPost?.likes.likeCount}
                  </span>{" "}
                  <span className="text-grey ">Likes</span>
                </button>
              ) : null}
                {currentPost?.comments.length > 0 ? (
                <button
                  className="cursor-pointer hover:underline mx-1"
               
                >
                  <span className="text-bold">
                    {currentPost?.comments.length}
                  </span>{" "}
                  <span className="text-grey ">Comments</span>
                </button>
              ) : null}
              </div>

              <div className="flex  gap-6 pt-1 mt-1 -mb-1 border-t border-darkGrey">
                <div className="mx-1">
                  <button
                    className="cursor-pointer hover:bg-dark hover:rounded-full"
                    onClick={() => {
                      likedByLoggedUser(currentPost, user)
                        ? dispatch(dislikePost({ token, _id: currentPost._id }))
                        : dispatch(likePost({ token, _id: currentPost._id }));
                    }}
                  >
                  {
                        likedByLoggedUser(currentPost, user)
                          ? <FavoriteIcon className="text-primary"/>
                          : <FavoriteBorderIcon className="text-primary"/>
                      }
                  </button>
                  {currentPost?.likes.likeCount > 0 && (
                    <span className="ml-1">{currentPost?.likes.likeCount}</span>
                  )}
                </div>

                <div className="mx-1">
                  <button
                    className="cursor-pointer hover:bg-dark hover:rounded-full"
                    onClick={() => focusInput(newCommentRef)}
                  >
                  <ModeCommentOutlinedIcon />
                  </button>
                  {currentPost?.comments.length > 0 && (
                    <span className="ml-1">{currentPost?.comments.length}</span>
                  )}
                </div>

                <div className="mx-1">
                  <button
                    className="cursor-pointer hover:bg-dark hover:rounded-full"
                    onClick={() => {
                      postInBookmarks(bookmarks, currentPost?._id)
                        ? dispatch(
                            removeBookmark({ token, _id: currentPost?._id })
                          )
                        : dispatch(
                            addBookmark({ token, _id: currentPost?._id })
                          );
                    }}
                  >
                   {
                        postInBookmarks(bookmarks, currentPost?._id)
                          ? <BookmarkOutlinedIcon className="text-green"/>
                          : <BookmarkBorderOutlinedIcon className="text-green"/>
                      }
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-[2rem_1fr] gap-2 pt-3 border-t border-darkGrey">
                <UserAvatar user={loggedInUser} />

                <form
                  className="flex justify-between"
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                      addComment({
                        token,
                        commentData: { comment },
                        postId: currentPost._id,
                      })
                    );
                    setComment("");
                  }}
                >
                  <input
                    type="text"
                    required
                    ref={newCommentRef}
                    placeholder="Post your reply"
                    className="outline-none bg-inherit w-full"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    className="bg-primary rounded-full py-1 px-3 ml-4 disabled:opacity-50 disabled:cursor-not-allowed w-[5.2rem]"
                    disabled={!comment.trim()}
                    type="submit"
                  >
                    Reply
                  </button>
                </form>
              </div>
              
              {currentPost?.comments.length > 0
                ? [...currentPost?.comments]
                    ?.reverse()
                    .map((comment) => (
                      <CommentCard
                        comment={comment}
                        key={comment._id}
                        postId={currentPost._id}
                      />
                    ))
                : null}
            </div>
          )}
        </div>

        {showLikesModal ? (
          <div className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center">
            <FollowListModal
              followModal={{
                title: "Liked By",
                list: currentPost?.likes.likedBy,
              }}
              setFollowModal={setShowLikesModal}
            />
          </div>
        ) : null}
      </div>

      <div className="hidden xl:block">
        <SearchBar />
        <SuggestedUsers />
      </div>
    </div>
  );
};
