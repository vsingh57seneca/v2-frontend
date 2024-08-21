import React from "react";
import NavLinks from "@/data/NavLinks.json";
import { MdHome } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useRouter } from "next/router";

const Desktop = () => {
  const router = useRouter();

  const iconMapping = {
    MdHome: MdHome,
    IoCreate: IoCreate,
    FaUser: FaUser,
    IoMdNotifications: IoMdNotifications,
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 border-r-2">
      <h1 className="text-2xl font-bold text-center">Keebgram</h1>
      <ul className="flex flex-col gap-y-8 text-left">
        {NavLinks?.map((link, index) => {
          const IconComponent = iconMapping[link?.icon];
          return (
            <>
              <div
                className={`flex justify-start items-center gap-x-2 cursor-pointer hover:bg-gray-400 px-3 py-2 rounded-full border-r-2 border-b-2 ${
                  router.pathname === link?.path && "bg-gray-300"
                }`}
                onClick={() => router.push(link?.path)}
              >
                <IconComponent size={20} className="flex" />
                <li className="flex justify-start font-semibold text-xl">
                  {link?.name}
                </li>
              </div>
            </>
          );
        })}
      </ul>
      <ul>Sub Nav</ul>
    </div>
  );
};

export default Desktop;
