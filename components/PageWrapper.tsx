import { ReactNode } from "react";
import classNames from "classnames";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { toggleCollapse } = useSidebarToggle();
  const pageStyle = classNames("bg-slate-50 flex-grow text-black p-2 mt-16", {
    ["sm:pl-[5.6rem]"]: toggleCollapse,
    ["sm:pl-[20rem]"]: !toggleCollapse,
  });
  return <div className={pageStyle}>{children}</div>;
}
