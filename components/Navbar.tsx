import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { BsArrowBarRight, BsArrowLeft } from "react-icons/bs";

export default function Navbar({
  toggleCollapse,
  setToggleCollapse,
}: {
  toggleCollapse: boolean;
  setToggleCollapse: Dispatch<SetStateAction<boolean>>;
}) {
  const sidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const navbarContainerStyle = classNames(
    "fixed bg-[#31353d] w-full z-0 px-4 shadow-sm shadow-slate-500/40 pl-[20rem]",
    {
      "pl-[5rem]": toggleCollapse,
      "pl-[20rem]": !toggleCollapse,
    }
  );

  return (
    // NAVBAR CONTAINER
    <header className={navbarContainerStyle}>
      <div className="flex items-center justify-between h-16">
        {/* MENU BUTTON */}

        <button
          onClick={sidebarToggle}
          className="bg-[#3a3f48] text-[#6e768e] hover:bg-white ml-3 p-1.5 rounded-md w-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {toggleCollapse && <BsArrowBarRight />}
          {!toggleCollapse && <BsArrowLeft />}
        </button>

        {/* PROFILE ICON */}

        <div className="h-10 w-10 rounded-full bg-[#3a3f48] flex items-center justify-center text-center">
          <span className="font-semibold text-sm">PS</span>
        </div>
      </div>
    </header>
  );
}
