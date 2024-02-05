import { cn } from "@/lib/utils";
import { BsArrowBarRight, BsArrowLeft } from "react-icons/bs";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import Link from "next/link";

export default function Navbar() {
  const { toggleCollapse, invokeToggleCollapse } = useSidebarToggle();
  const sidebarToggle = () => {
    invokeToggleCollapse();
  };

  const navbarContainerStyle = cn(
    "fixed bg-[#31353d] w-full z-0 px-4 shadow-sm shadow-slate-500/40",
    {
      ["pl-[5.6rem] sm:pl-[20rem]"]: !toggleCollapse,
      ["sm:pl-[5.6rem]"]: toggleCollapse,
    }
  );

  return (
    // NAVBAR CONTAINER
    <header className={navbarContainerStyle}>
      <div className="flex items-center justify-between h-16">
        {/* MENU BUTTON */}

        <button
          onClick={sidebarToggle}
          className="order-2 sm:order-1 bg-[#3a3f48] text-[#6e768e] hover:bg-white ml-3 p-1.5 rounded-md w-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {toggleCollapse && <BsArrowBarRight />}
          {!toggleCollapse && <BsArrowLeft />}
        </button>

        {/* ADMIN BUTTON */}

        <Link href="/dashboard/admin" passHref>
          <button className="bg-[#3a3f48] text-[#6e768e] hover:bg-white ml-3 p-1.5 rounded-md w-[60px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center">
            Admin
          </button>
        </Link>

        {/* PROFILE ICON */}

        <div className="order-1 sm:order-2 h-10 w-10 rounded-full bg-[#3a3f48] flex items-center justify-center text-center">
          <span className="font-semibold text-sm">PS</span>
        </div>
      </div>
    </header>
  );
}
