import Image from "next/image";
import logo from "@/assets/images/cheat_tweet_logo.png";
import SidebarMenuItem from "./SidebarMenuItem";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsBookmarksFill, BsThreeDots, BsPerson } from "react-icons/bs";

import sty from "@/styles/SidebarMenu.module.scss";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

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
      {session && (
        <div className={sty.menu_cont}>
          <SidebarMenuItem text="Home" icon={AiOutlineHome} />
          <SidebarMenuItem
            text="Bookmarks"
            icon={BsBookmarksFill}
            active={true}
          />
          <SidebarMenuItem text="Profile" icon={AiOutlineUser} />
        </div>
      )}

      {/* profile */}
      {session ? (
        <div className={sty.profile_cont}>
          <img
            src={String(session?.user?.image || logo)}
            alt="logo"
            className={sty.image}
          />
          <div className="hidden leading-5 xl:inline">
            <h3 className="font-bold text-black text-md">
              {session?.user?.name}
            </h3>
            <p>@{String(session.user?.username)}</p>
          </div>
          <BsThreeDots
            className="hidden w-5 h-5 ml-2 xl:inline"
            onClick={() => signOut()}
          />
        </div>
      ) : (
        <div className={sty.profile_cont} onClick={() => signIn()}>
          <BsPerson className="h-7 w-7" />
          <div className="hidden leading-5 xl:inline">
            <h1 className="font-bold text-black">SIGN IN</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
