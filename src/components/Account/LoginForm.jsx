import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "@/apis/Auth";
import { useRouter } from "next/router";

const LoginForm = ({ setShowSignUpModal }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    if (email === "" || password === "") {
      toast.error("All Fields Required");
      return;
    }

    try {
      const result = await login({ email: email, password: password });
      if (result?.token) {
        toast.success("Login successful");
        localStorage.setItem("token", result?.token);
        router.push("/feed");
      }
    } catch (error) {
      const response = error?.response;

      if(response?.status === 403) {
        toast.error(response?.data);
      }
    }
  };

  const onSignUp = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center md:min-h-0 gap-y-4 w-full">
      <h1 className="text-2xl font-bold">Sign in to Keebgram</h1>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-400 rounded-full px-4 py-3 w-full"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-400 rounded-full px-4 py-3 w-full"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p className="text-gray-500/70 underline cursor-pointer font-semibold justify-end w-full flex">
        Forgot Password?
      </p>
      <button
        className="bg-blue-500 text-white rounded-full w-full px-4 py-3"
        onClick={onSignIn}
      >
        Sign in
      </button>
      <div className="w-full flex items-center justify-around text-gray-500/60">
        <hr class="w-full h-1" />
        <p className="flex-grow w-full text-center font-semibold">
          Or login with
        </p>
        <hr class="w-full h-1" />
      </div>
      <p className="cursor-pointer w-full text-center border px-4 py-3 rounded-full border-gray-400 font-bold">
        Google
      </p>
      <div className="text-gray-500/60 font-semibold">
        <p className="">
          Don't have an account?
          <span className="text-blue-500 cursor-pointer" onClick={onSignUp}>
            {" "}
            Sign Up now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
