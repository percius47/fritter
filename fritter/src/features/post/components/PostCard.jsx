import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../../components/UserAvatar";

import { addBookmark, removeBookmark } from "../../user/userSlice";
import { useClickOutside } from "../../../customHooks/useClickOutside";

import { CommentModal } from "../components/CommentModal";
import { dislikePost, likePost } from "../postSlice";
import { PostOptionsModal } from "./PostOptionsModal";
import { getPostDate } from "../../../utils/getPostDate";
import { likedByLoggedUser } from "../../../utils/likedByLoggedUser";
import { postInBookmarks } from "../../../utils/postInBookmarks";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export const PostCard = ({ post }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { users, bookmarks } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const postRef = useRef();

  const [showOptions, setShowOptions] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const currentPost = posts?.find((dbPost) => dbPost._id === post._id);
  const { _id, username, fullName, content,postImage, id, likes, createdAt } =
    currentPost;

  const currentUser = users?.find(
    (dbUser) => dbUser.username === post.username
  );

  useClickOutside(postRef, setShowOptions);

  return (
    <div
      className="grid grid-cols-[2rem_1fr] gap-2 bg-darkSecondary text-sm border-b border-darkGrey px-4 py-3 cursor-pointer"
      onClick={() => navigate(`/post/${id}`)}
      ref={postRef}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${username}`);
        }}
      >
        <UserAvatar user={currentUser} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between ">
          <div
            className="flex  gap-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${username}`);
            }}
          >
            <div className="flex flex-col cursor-pointer">
            <span className="font-bold tracking-wide break-normal ">{fullName}</span>
          
          <span className="text-lightGrey break-normal ">@{username}</span>
            </div>
            <span className="text-lightGrey">·</span>
            <div className="text-lightGrey break-normal">{getPostDate(createdAt)}</div>
            
          </div>


          <div className="relative">
            <MoreHorizIcon
              className=" p-2 cursor-pointer hover:bg-dark hover:rounded-full"
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

        <div className="break-normal">{content}</div>
        { 
         (postImage)?(
          <div className="w-2/3 h-2/3/ mx-auto my-1">
              <img src={postImage} alt="post" className=" w-8/10 mx-auto rounded my-1" />
              </div>
          ):null
          }
        <div className="flex gap-6 -ml-2 mt-1">
          <div>
            <button
              className={`cursor-pointer hover:bg-dark hover:rounded-full `}
              onClick={(e) => {
                e.stopPropagation();
                likedByLoggedUser(currentPost, user)
                  ? dispatch(dislikePost({ token, _id }))
                  : dispatch(likePost({ token, _id }));
              }}
            >
           {
                  likedByLoggedUser(currentPost, user)
                    ? <FavoriteIcon className="text-primary"/>
                    : <FavoriteBorderIcon className="text-primary"/>
                }
              
            </button>
            {likes.likeCount > 0 && (
              <span className="ml-1">{likes.likeCount}</span>
            )}
          </div>

          <div>
            <button
              className="cursor-pointer hover:bg-dark hover:rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentModal(true);
              }}
            >
              <ModeCommentOutlinedIcon className="w-1 h-1"/>
            </button>

           
            {currentPost.comments?.length>0 && (
              <span className="ml-1">{currentPost.comments?.length}</span>
            )}
          </div>

          <button
            className="cursor-pointer hover:bg-dark hover:rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              postInBookmarks(bookmarks, _id)
                ? dispatch(removeBookmark({ token, _id }))
                : dispatch(addBookmark({ token, _id }));
            }}
          >
            {
                postInBookmarks(bookmarks, _id)
                  ? 
                  <BookmarkOutlinedIcon className="text-green"/>:<BookmarkBorderOutlinedIcon className="text-green"/>
              }
          
          </button>
        </div>
      </div>

      {showCommentModal ? (
        <div
          className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-30 flex justify-center items-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <CommentModal
        
            setShowCommentModal={setShowCommentModal}
            postId={currentPost?._id}
          />
        </div>
      ) : null}
    </div>
  );
};
