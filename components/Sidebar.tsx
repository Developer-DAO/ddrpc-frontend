import Image from "next/image";

export default function Sidebar() {
  return (
    // SIDEBAR CONTAINER
    <aside className="fixed bg-[#31353d] text-gray-500 z-50 h-full shadow-lg shaodw-gray-900/20 transition duration-300 ease-in-out w-[20rem]">
      {/* APP LOGO */}

      <div className="flex relative items-center p-4 min-h min-h-fit py-5 px-3.5">
        <Image alt="" src="/D_D-logo.png" width={500} height={200}></Image>
      </div>

      {/* APP TITLE */}

      <div>
        <h3 className="pl-2 font-bold text-2xl text-[#e6e9ee] min-w-max">
          D_D RPC Dashboard
        </h3>
      </div>

      {/* NAVIGATION */}

      <nav></nav>
    </aside>
  );
}
