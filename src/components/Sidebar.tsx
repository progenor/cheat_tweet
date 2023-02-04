import Image from "next/image";
import logo from "@/assets/images/cheat_tweet_logo.png";
import SidebarMenuItem from "./SidebarMenuItem";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsBookmarksFill, BsThreeDots } from "react-icons/bs";

import sty from "@/styles/SidebarMenu.module.scss";

const Sidebar = () => {
  return (
    <div className="fixed flex-col hidden h-full p-4 mx-auto sm:flex xl:items-start xl:ml-24">
      {/* logo */}
      <div className={sty.logo_cont}>
        <Image
          src={logo}
          width={50}
          height={50}
          alt="logo"
          className={sty.logo}
        />
      </div>

      {/* menu */}
      <div className={sty.menu_cont}>
        <SidebarMenuItem text="Home" icon={AiOutlineHome} />
        <SidebarMenuItem
          text="Bookmarks"
          icon={BsBookmarksFill}
          active={true}
        />
        <SidebarMenuItem text="Profile" icon={AiOutlineUser} />
      </div>

      {/* profile */}
      <div className={sty.profile_cont}>
        <Image
          src={logo}
          width={10}
          height={10}
          alt="logo"
          className={sty.image}
        />
        <div className="hidden leading-5 xl:inline">
          <h3 className="font-bold text-black">Username</h3>
          <p>@username</p>
        </div>
        <BsThreeDots className="hidden w-5 h-5 ml-2 xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
