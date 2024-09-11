import React, { useState } from "react";
import NavLinks from "@/data/NavLinks.json";
import { useRouter } from "next/router";
import { MdHome } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { BsMenuButtonFill } from "react-icons/bs";
import { useModalContext } from "@/contexts/ModalContext";

const Mobile = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showCreatePostModal, setShowCreatePostModal } = useModalContext();

  const iconMapping = {
    MdHome: MdHome,
    IoCreate: IoCreate,
    FaUser: FaUser,
    IoMdNotifications: IoMdNotifications,
  };
  
  const handleLinkClick = (path, isCreate) => {
    if (isCreate) {
      setShowCreatePostModal(!showCreatePostModal);
    } else {
      setShowCreatePostModal(false);
      router.push(path);
    }
  };
  

  return (
    <div className="grid grid-cols-4 h-full place-items-center w-[100vw] border-t-2 border-gray-200 z-20">
      {NavLinks?.slice(0, 3).map((link, index) => {
        const IconComponent = iconMapping[link?.icon];
        return (
          <div
            key={index}
            className={`col-span-1 h-full min-h-[78px] border-r-2 w-full flex items-center justify-center border-gray-200 bg-gradient-to-b from-white to-gray-300 ${
              router.pathname === link?.path &&
              `shadow-inner bg-gradient-to-b from-white to-gray-400`
            }`}
            onClick={() => handleLinkClick(link?.path, link?.icon === "IoCreate")}
          >
            <IconComponent size={25} />
          </div>
        );
      })}
      <div
        className={`col-span-1 h-full border-r-2 w-full flex items-center justify-center border-gray-200 bg-gradient-to-b from-white to-gray-300 relative ${isMenuOpen && 'shadow-inner bg-gradient-to-b from-white to-gray-400'}`}
        onClick={() => {setIsMenuOpen(!isMenuOpen); setShowCreatePostModal(false)}}
      >
        <BsMenuButtonFill size={25} />
        <div className="absolute bottom-0 w-full mb-20 mr-1 flex flex-col items-end">
          {NavLinks?.slice(3)?.map((link, index) => {
            const IconComponent = iconMapping[link?.icon];
            return (
              <div
                key={index}
                className={`min-h-[78px] flex items-center justify-center w-full border-t-2 border-l-2 border-gray-200 bg-gradient-to-l from-white to-gray-200 transform transition-all ease-in-out duration-300 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? '0ms' : '150ms' }}
              >
                <IconComponent size={25} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
