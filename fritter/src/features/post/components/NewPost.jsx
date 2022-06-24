import "../styles.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../../components/UserAvatar";
import { updateProfile, setLoading } from "../../user/userSlice";
import { focusInput } from "../../../utils/focusInput";
import { createPost  } from "../postSlice";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils/uploadImage";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';





export const NewPost = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const newPostRef = useRef();

  const currentUser = users?.find(
    (dbUser) => dbUser.username === user.username
  );

  const submitPost = async (e) => {
    e.preventDefault();

;

    if (image) {
      const resp = await uploadImage(image);
      dispatch(
        createPost({
          input,
          postImage: resp.url,
     
          token,
          user,
        })
      );
    } else
      dispatch(createPost({ input, postImage:"", token, user }));

    setInput("");
    setImage(null);
    newPostRef.current.innerText = "";
  };

  return (
    <div
      className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-darkSecondary text-sm  border-b border-darkGrey px-4 py-3 cursor-text"
      onClick={(e) => {
        e.stopPropagation();
        focusInput(newPostRef);
      }}
    >
      <UserAvatar user={currentUser} />

      <form className="flex flex-col gap-4" onSubmit={submitPost}>
        <div
          role="textbox"
          ref={newPostRef}
          contentEditable="true"
          placeholder="What's happening?"
          className="w-full break-all bg-inherit outline-none mt-1.5"
          onInput={(e) => setInput(e.currentTarget.textContent)}
        />

        {image ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-auto rounded-md"
              alt="demo"
            />
            <button
              type="button"
              className="absolute top-1 left-2 text-lg"
              onClick={() => setImage(null)}
            >
          <CloseRoundedIcon/>
            </button>
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-4">
          <label className="cursor-pointer text-lg">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                Math.round(e.target.files[0].size / 1024000) > 1
                  ? toast.error("File size should not be more than 1Mb")
                  : setImage(e.target.files[0])
              }
            />
        <InsertPhotoIcon/>
          </label>

          <button
            type="submit"
            className="bg-primary rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() && !image}
          >
            Post
          </button>
        </div>
      </form>

    </div>
  );
};

