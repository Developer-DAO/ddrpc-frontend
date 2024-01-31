import { ReactNode } from "react";
import classNames from "classnames";

export default function PageWrapper({
  children,
  toggleCollapse,
}: {
  children: ReactNode;
  toggleCollapse: boolean;
}) {
  const pageStyle = classNames("bg-slate-50 flex-grow text-black p-2 mt-16", {
    ["sm:pl-[5.6rem]"]: toggleCollapse,
    ["sm:pl-[20rem]"]: !toggleCollapse,
  });
  return <div className={pageStyle}>{children}</div>;
}
