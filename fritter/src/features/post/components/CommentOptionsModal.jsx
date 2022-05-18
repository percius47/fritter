import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentModal } from "./CommentModal";
import { deleteComment } from "../postSlice";

export const CommentOptionsModal = ({ comment, setShowOptions, postId }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col  bg-dark absolute right-1.5 w-max rounded shadow-dark shadow-lg border border-darkGrey">
      <button
        className="py-2 px-4 text-left cursor-pointer hover:bg-[#001e396b]"
        onClick={(e) => {
          e.stopPropagation();
          setShowCommentModal(true);
        }}
      >
        <i className="fa-solid fa-pen-to-square mr-2"></i>Edit
      </button>
      <button
        className="py-2 px-4 text-left cursor-pointer text-red hover:bg-[#001e396b]"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteComment({ token, commentId: comment._id, postId }));
        }}
      >
        <i className="fa-solid fa-trash mr-2"></i>Delete
      </button>

      {showCommentModal ? (
        <div
          className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-30 flex justify-center items-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <CommentModal
            commentExists={comment}
            postId={postId}
            setShowCommentModal={setShowCommentModal}
          />
        </div>
      ) : null}
    </div>
  );
};
