import React, { useState } from "react";
import toast from "react-hot-toast";
import { create } from "@/apis/Account";

const SignUpForm = ({ setShowSignUpModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const onClose = () => {
        setShowSignUpModal(false);
    }

    const onCreate = async () => {
        if (email === "" || password === "" || password2 === "" ) {
            toast.error("All fields required");
            return;
        } 
        
        if(password != password2) {
            toast.error("Passwords do not match");
            return;
        }

        try {
          const result = await create({email: email, password: password});
          console.log(result)
          toast.success(result);
          onClose();
        } catch(error) {
          if(error?.response?.status === 403) {
            toast.error(error?.response?.data)
          }
        }

    }

  return (
    <div className="absolute bg-black/80 left-0 w-full h-full z-20">
      <div className="flex md:items-center justify-center md:h-full">
        <div className="bg-white w-full flex flex-col gap-y-6 p-4 md:max-w-[40%] rounded-lg">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <div className="p-4 flex flex-col gap-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 w-full rounded-full px-3 py-2"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 w-full rounded-full px-3 py-2"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-400 w-full rounded-full px-3 py-2"
              value={password2}
              onChange={(e) => {setPassword2(e.target.value)}}
            />
            <button className="font-semibold bg-green-500 text-white px-3 py-2 rounded-full" onClick={(onCreate)}>
              Create Account
            </button>
            <button className="font-semibold bg-red-500 text-white px-3 py-2 rounded-full" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
