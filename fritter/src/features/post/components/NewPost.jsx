import "../styles.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../../components/UserAvatar";
import { updateProfile, setLoading } from "../../user/userSlice";
import { focusInput } from "../../../utils/focusInput";
import { createPost, editPost } from "../postSlice";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import toast from "react-hot-toast";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwebygldw/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ru8cort4";
export const NewPost = ({ post, setShowOptions }) => {
  const [input, setInput] = useState("");

  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const newPostRef = useRef();

  const currentUser = users?.find(
    (dbUser) => dbUser.username === user.username
  );
  const [editInput, setEditInput] = useState(currentUser);
  const [image, setImage] = useState(null);



  const submitPost = (e) => {
    e.preventDefault();

    if (post) {
      const file = image;
      const formData = new FormData();
  
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "frittr");
  
      fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          return dispatch(createPost({ input,postImage:data.url, token, user }));
        })
        .catch((err) => console.error(err));
      
      
      setShowOptions(false);
    }
    
    else {
     
      
      const file = image;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "frittr");

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch(createPost({ input,postImage:data.url, token, user }));
      })
      .catch((err) => console.error(err));
    }
     setInput("");
    newPostRef.current.innerText = "";
  };

  useEffect(() => {
    if (post) newPostRef.current.innerText = post.content;
  }, [post]);

  return (
    <div
      className={`grid grid-cols-[2rem_1fr] gap-2 items-start bg-darkSecondary text-sm  border-darkGrey px-4 py-3 cursor-text ${
        post ? "w-5/6 shadow-dark shadow-lg rounded border" : "border-b"
      }`}
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
          placeholder="What are we eating today?"
          className="w-full break-normal bg-inherit outline-none mt-1.5"
          onInput={(e) => setInput(e.currentTarget.textContent)}
        />

        <div className="justify-between flex gap-2">
        <label className="edit-profile cursor-pointer ml-1  my-2">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              Math.round(e.target.files[0].size / 1024000) > 1
                ? toast.error("File size should not be more than 1Mb")
                : setImage(e.target.files[0]);
            }}
          />
    <InsertPhotoIcon className="ml-0"/>
          {/* <CameraAltIcon className=" absolute text-md bottom-0 right-0"/> */}
        </label>

            <div className="flex gap-3">
        
          {post ? (
    
            <button
              type="reset"
              className="border border-primary rounded-full py-1 px-3"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </button>
          ) : null}

          <button
            type="submit"
            className="bg-primary rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || (post && input.trim() === post.content)}
          >
            {post ? "Save" : "Post"}
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};
