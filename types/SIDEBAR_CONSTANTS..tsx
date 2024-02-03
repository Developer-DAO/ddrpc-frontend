import {
  BsGear,
  BsHouseDoor,
  BsPerson,
  BsQuestionCircle,
} from "react-icons/bs";
import { SideNavItemGroup } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    menuList: [
      {
        title: "Dashboard",
        path: "/",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
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
    ],
  },
];
