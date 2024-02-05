import React from "react";
import { SIDENAV_ITEMS } from "@/types/SIDEBAR_CONSTANTS.";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SideBarMenuItem } from "./SidebarMenuItem";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import SidebarMenuGroup from "./SidebarMenuGroup";

export default function Sidebar() {
  // SIDEBAR COLLAPSE VARIABLE
  const { toggleCollapse } = useSidebarToggle();
  const sidebarContainerStyle = cn(
    "overflow-y-auto overflow-x-auto fixed bg-[#31353d] text-gray-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[20rem]",
    {
      ["sm:w-[5rem] sm:left-0 left-[-100%]"]: toggleCollapse,
      ["w-[20rem]"]: !toggleCollapse,
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
            return <SidebarMenuGroup key={index} menuGroup={item} />;
          })}
        </div>
      </nav>
    </aside>
  );
}
