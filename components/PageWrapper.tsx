import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50 flex-grow text-black p-2 mt-16 pl-[20.4rem]">
      {children}
    </div>
  );
}
