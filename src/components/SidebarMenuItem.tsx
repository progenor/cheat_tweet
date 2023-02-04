import Image from "next/image";

import sty from "@/styles/SidebarMenu.module.scss";

type SidebarMenuItemProps = {
  text: string;
  icon: any;
  active?: boolean;
};

const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  return (
    <div className={sty.menuItem_cont}>
      <props.icon className="h-7 w-7" />
      <span className={`${props.active && "font-bold"} hidden xl:inline`}>
        {props.text}
      </span>
    </div>
  );
};

export default SidebarMenuItem;
