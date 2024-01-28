import {
  BsGear,
  BsHouseDoor,
  BsPerson,
  BsQuestionCircle,
} from "react-icons/bs";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <BsHouseDoor size={20} />,
  },
  {
    title: "Account",
    path: "/account",
    icon: <BsPerson size={20} />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <BsGear size={20} />,
  },
  {
    title: "Help",
    path: "/help",
    icon: <BsQuestionCircle size={20} />,
  },
];
