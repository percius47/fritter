import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAvatar } from "../components/UserAvatar";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { PostModal } from "../features/post/components/PostModal";
const activeStyle = {
  backgroundColor: "#001e39",
  borderRadius: "9999px",
  padding: "0.75rem",
  width: "max-content",
  fontWeight: "bold",
};

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const currentUser = users.find((dbUser) => dbUser.username === user.username);

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  return (
   
    <aside className="sm:sticky bg-dark  flex sm:flex-col sm:justify-between sm:h-screen sm:top-0 sm:overflow-y-auto overflow-x-hidden fixed bottom-0 left-0 w-full items-center  sm:border-0 border-t-2 border-darkGrey sm:z-0 z-40">
      <ul className="flex items-center sm:items-start justify-start px-3 py-4 sm:flex-col gap-3 sm:gap-6 tracking-wide grow">
        <li className="sm:pb-3 sm:px-3 hidden sm:block">
          <Link to="/" className="flex items-center">
         
                   <RestaurantMenuIcon className="h-6 w-6 mr-2 text-primary" />
             <span className="font-extrabold text-center text-grey hidden lg:inline">Frittr</span>
          </Link>
        </li>

        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-darkSecondary hover:rounded-full"
          >
              <span className=" px-1 lg:hidden">
            <HomeIcon/>
            </span>
           
            <span className="hidden lg:inline">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/explore"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-hoverBlue hover:rounded-full"
          >
            <span className=" px-1 lg:hidden">
            <ExploreIcon />
            </span>
           
            <span className="hidden lg:inline">Explore</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bookmarks"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-hoverBlue hover:rounded-full"
          >
              <span className=" px-1 lg:hidden">
          <BookmarkIcon/>
            </span>
           
            <span className="hidden lg:inline">Bookmarks</span>
          </NavLink>
        </li>

        <li className="px-1 lg:p-0 w-max lg:w-full lg:hidden">
          <button
        
            className="bg-primary rounded-full w-max lg:w-full py-2 px-2.5 lg:px-3 bottom-20 right-4 fixed sm:static"
            onClick={() => 
              setShowNewPostModal(true)
            }
          >
            <AddIcon className=" lg:pr-1"/>
            
          </button>
        </li>
      </ul>

      <ul className="tracking-wide pr-2">
        <li>
          <NavLink
            to={`/profile/${currentUser?.username}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="px-2 py-2 flex items-center justify-center gap-2 hover:bg-hoverBlue hover:rounded-full"
          >
            <UserAvatar user={currentUser} />

            <div className="text-xs hidden lg:inline">
              <p className="font-bold lg:w-9/10">{currentUser?.fullName}</p>
              <p className="text-lightGrey font-normal">
                @{currentUser?.username}
              </p>
            </div>  
          </NavLink>
        </li>
      </ul>

      {showNewPostModal ? (
        <div
          className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <PostModal setShowNewPostModal={setShowNewPostModal} />
        </div>
      ) : null}
    </aside>
  );
};
