import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { followUser } from "../features/user/userSlice";

export const SuggestedUsers = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userData = users?.find((dbUser) => dbUser.username === user.username);

  const filteredUsers = users
    ?.filter((dbUser) => dbUser.username !== userData?.username)
    ?.filter(
      (eachUser) =>
        !userData?.following.find((item) => item.username === eachUser.username)
    );

  return (
    <>
      {filteredUsers.length ? (
        <div className="flex flex-col justify-center gap-4 m-2.5 mt-0 px-4 py-3  rounded-md bg-darkSecondary h-max w-full sticky top-[85px]">
          <div className="text-lg font-bold tracking-wide">Suggested Users</div>

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-start gap-2 cursor-pointer"
              onClick={() => {
                navigate(`/profile/${user.username}`);
              }}
            >
              <UserAvatar user={user} />

              <div className="flex flex-col grow -mt-0.5">
                <span className="text-sm">{user.fullName}</span>
                <span className="text-sm text-lightGrey -mt-1">
                  @{user.username}
                </span>
              </div>

              <button
                className="bg-primary text-sm py-1 px-4 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(followUser({ token, followUserId: user._id }));
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
