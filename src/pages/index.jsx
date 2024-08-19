import LoginForm from "@/components/Account/LoginForm";
import SignUpForm from "@/components/Account/SignUpForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  return (
    <div className="grid grid-cols-2 h-full w-full">
      <div className="hidden md:col-span-1 md:flex min-h-screen relative">
        <Image
          src={"/images/backgrounds/landing-background.jpg"}
          alt="Landing Background"
          layout="fill"
          objectFit="cover" 
          priority 
        />
      </div>
      <div className="col-span-full md:col-span-1 p-8 md:p-[20%] flex items-center h-full justify-center">
        <LoginForm setShowSignUpModal={setShowSignUpModal} />
      </div>

      {showSignUpModal && <SignUpForm setShowSignUpModal={setShowSignUpModal} />}
    </div>
  );
}
