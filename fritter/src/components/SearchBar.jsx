import { useSelector, useDispatch } from "react-redux";
import { setSearchVal } from "../features/user/userSlice";
import { SearchedUsersModal } from "../components/SearchedUserModal";

export const SearchBar = () => {
  const { searchVal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const debounce = (fn, delay) => {
    let timer = 0;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  return (
    <div className="sticky top-0.5 z-30">
      <div className="relative m-2 w-[80%] mx-auto rounded-full border border-darkGrey focus-within:border-primary bg-darkSecondary">
        <input
          type="text"
          onChange={debounce(
            (e) => dispatch(setSearchVal(e.target.value)),
            400
          )}
          placeholder="Search users..."
          className="bg-inherit py-2 px-3 w-[80%] outline-none rounded-full"
        />
        <i class="fa-solid fa-magnifying-glass ml-2 absolute right-4 top-3"></i>
      </div>

      {searchVal.length ? (
        <div className="absolute top-15 w-9/10 mx-2 ">
          <SearchedUsersModal />
        </div>
      ) : null}
    </div>
  );
};
