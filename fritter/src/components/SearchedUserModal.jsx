import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../components/UserAvatar";
import { setSearchVal } from "../features/user/userSlice";

export const SearchedUsersModal = () => {
  const { searchResult } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 w-full p-4 z-40 bg-dark rounded-md border border-darkGrey sticky top-0">
      {searchResult.length ? (
        searchResult.map((user) => (
          <div
            key={user._id}
            className="flex items-start gap-2 cursor-pointer"
            onClick={() => {
              navigate(`/profile/${user.username}`);
              dispatch(setSearchVal(""));
            }}
          >
            <UserAvatar user={user} />

            <div className="flex flex-col grow -mt-0.5">
              <span className="text-sm">{user.fullName}</span>
              <span className="text-sm text-lightGrey -mt-1">
                @{user.username}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No such user found</div>
      )}
    </div>
  );
};
