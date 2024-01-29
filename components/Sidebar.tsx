import { SIDENAV_ITEMS } from "@/types/SIDEBAR_CONSTANTS.";
import Image from "next/image";
import { SideBarMenuItem } from "./SidebarMenuItem";
import classNames from "classnames";

interface SidebarProps {
  toggleCollapse: boolean;
}

export default function Sidebar({ toggleCollapse }: SidebarProps) {
  // SIDEBAR COLLAPSE VARIABLE

  const sidebarContainerStyle = classNames(
    "fixed bg-[#31353d] text-gray-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[20rem]",
    {
      "w-[5rem]": toggleCollapse,
      "w-[20rem]": !toggleCollapse,
    }
  );
  return (
    // SIDEBAR CONTAINER
    <aside className={sidebarContainerStyle}>
      {/* APP LOGO */}

      {!toggleCollapse && (
        <div className="flex relative items-center p-4 min-h min-h-fit py-5 px-3.5">
          <Image alt="" src="/D_D-logo.svg" width={500} height={200}></Image>
        </div>
      )}

      {toggleCollapse && (
        <div className="flex relative items-center p-4 min-h min-h-fit py-5 px-3.5">
          <Image alt="" src="/D_D-circle.svg" width={500} height={500}></Image>
        </div>
      )}

      {/* APP TITLE */}

      {!toggleCollapse && (
        <div>
          <h3 className="pl-2 font-bold text-2xl text-[#e6e9ee] min-w-max">
            D_D RPC Dashboard
          </h3>
        </div>
      )}

      {/* NAVIGATION */}

      <nav className="flex flex-col gap-2 transition duration-300 pt-5">
        <div className="flex flex-col gap-2 px-4">
          {SIDENAV_ITEMS.map((item, index) => {
            return (
              <SideBarMenuItem
                item={item}
                toggleCollapse={toggleCollapse}
              ></SideBarMenuItem>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
