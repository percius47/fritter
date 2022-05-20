import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSort } from "../features/post/postSlice";
import { useClickOutside } from "../customHooks/useClickOutside";
import TuneIcon from '@mui/icons-material/Tune';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export const SortBar = () => {
  const [showSortModal, setShowSortModal] = useState(false);

  const { activeSort } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const modalRef = useRef();

  useClickOutside(modalRef, setShowSortModal);

  return (
    <div className="w-full px-4 py-2 flex justify-between items-center border-b border-darkGrey">
      <div>{activeSort} Posts</div>

      <div className="relative" ref={modalRef}>
        <button
          className=" hover:bg-darkSecondary hover:rounded-full p-1 px-2"
          onClick={() => setShowSortModal((prev) => !prev)}
        >
          <TuneIcon/>
        </button>

        {showSortModal ? (
          <div className="absolute right-0 w-max text-sm flex flex-col gap-1.5 items-start py-2 px-3 bg-dark rounded shadow-dark shadow-lg border border-darkGrey z-30">
            <button
              style={{ color: activeSort === "Trending" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Trending"));
                // setShowSortModal(false);
              }}
            >
              <TrendingUpIcon/>Trending
            </button>
            <button
              style={{ color: activeSort === "Latest" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Latest"));
                // setShowSortModal(false);
              }}
            >
             <ArrowDropUpIcon/> Latest
            </button>
            <button
              style={{ color: activeSort === "Oldest" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Oldest"));
                // setShowSortModal(false);
              }}
            >
              <ArrowDropDownIcon/> Oldest
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
 