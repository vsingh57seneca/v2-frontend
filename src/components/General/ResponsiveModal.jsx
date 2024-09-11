import React from "react";

const ResponsiveModal = ({children}) => {
  return (
    <div className="absolute bg-black/80 left-0 w-full h-full z-20">
      <div className="flex md:items-center justify-center md:h-full">
        <div className="bg-white w-full flex flex-col gap-y-6 p-4 md:max-w-[40%] rounded-lg">
            {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;
