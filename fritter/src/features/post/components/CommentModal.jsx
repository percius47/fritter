import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, editComment } from "../postSlice";
import { UserAvatar } from "../../../components/UserAvatar";

export const CommentModal = ({
  commentExists,
  setShowCommentModal,
  postId,
}) => {
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );

  const commentRef = useRef();

  const commentId = commentExists?._id;

  const addCommentHandler = (e) => {
    e.preventDefault();
// console.log("comment add",commentExists);
    commentExists
      ? dispatch(
          editComment({ token, commentData: { comment }, postId, commentId })
        )
      : 
        dispatch(addComment({ token, commentData: { comment }, postId }));

    setShowCommentModal(false);
  };

  useEffect(() => {
    if (commentExists) commentRef.current.innerText = commentExists.comment;
  }, [commentExists]);

  return (
    <div className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-darkSecondary text-sm  border-darkGrey px-4 py-3 cursor-text w-1/2 shadow-dark shadow-lg rounded border">
      <UserAvatar user={loggedInUser} />

      <form className="flex flex-col gap-4" onSubmit={addCommentHandler}>
        <div
          role="textbox"
          ref={commentRef}
          contentEditable="true"
          placeholder="Post your reply"
          className="w-full break-all bg-inherit outline-none mt-1.5"
          onInput={(e) => setComment(e.currentTarget.textContent)}
        />

        <div className="ml-auto flex gap-2">
          <button
            type="reset"
            className="border border-primary rounded-full py-1 px-3"
            onClick={() => setShowCommentModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-primary rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !comment.trim() ||
              (commentExists && comment.trim() === commentExists.comment)
            }
          >
            {commentExists ? "Save" : "Reply"}
          </button>
        </div>
      </form>
    </div>
  );
};
