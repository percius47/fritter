import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../postSlice";
import { NewPost } from "./NewPost";
import { followUser, unfollowUser } from "../../user/userSlice";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PostModal } from "./PostModal";
export const PostOptionsModal = ({ post, setShowOptions }) => {
  const { _id, username } = post;
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userToFollow = users.find((dbUser) => dbUser.username === username);

  const userAlreadyFollowing = userToFollow.followers.find(
    (follower) => follower.username === user.username
  );

  return (
    <div className="flex flex-col  bg-dark absolute right-1.5 w-max rounded shadow-dark shadow-lg border border-darkGrey">
      {username === user.username ? (
        <>
          <button
            className="py-2 px-4 text-left cursor-pointer hover:bg-[#001e396b]"
            onClick={(e) => {
              e.stopPropagation();
              setShowNewPostModal(true);
            }}
          >
           <EditIcon/> Edit
          </button>
          <button
            className="py-2 px-4 text-left cursor-pointer text-red hover:bg-[#001e396b]"
            onClick={(e) => {
              e.stopPropagation();
              if (pathname !== "/") navigate("/");
              dispatch(deletePost({ token, _id }));
            }}
          >
            <DeleteIcon/> Delete
          </button>
        </>
      ) : (
        <button
          className="py-2 px-4 text-left cursor-pointer hover:bg-[#001e396b]"
          onClick={(e) => {
            e.stopPropagation();
            userAlreadyFollowing
              ? dispatch(
                  unfollowUser({ token, followUserId: userToFollow._id })
                )
              : dispatch(followUser({ token, followUserId: userToFollow._id }));
            setShowOptions(false);
          }}
        >
         {userAlreadyFollowing ? <RemoveIcon/>:<AddIcon/>}
          {userAlreadyFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      {showNewPostModal ? (
        <div
          className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-30 flex justify-center items-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
           <PostModal
            post={post}
            setShowOptions={setShowOptions}
            setShowNewPostModal={setShowNewPostModal}
          />
        </div>
      ) : null}
    </div>
  );
};
