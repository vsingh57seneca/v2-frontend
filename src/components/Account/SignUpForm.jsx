import React, { useState } from "react";
import toast from "react-hot-toast";
import { create } from "@/apis/Account";
import ResponsiveModal from "../General/ResponsiveModal";

const SignUpForm = ({ setShowSignUpModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDOB] = useState("");
  const [displayName, setDisplayName] = useState("");

  const onClose = () => {
    setShowSignUpModal(false);
  };

  const onCreate = async () => {
    if (
      email === "" ||
      password === "" ||
      password2 === "" ||
      firstName === "" ||
      lastName === "" ||
      country === "" ||
      dob === "" ||
      displayName === ""
    ) {
      toast.error("All fields required");
      return;
    }

    if (password != password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const data = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        country: country,
        dob: dob,
        display_name: displayName,
      };

      const result = await create(data);
      console.log(result);
      toast.success(result);
      onClose();
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error(error?.response?.data);
      }
    }
  };

  return (
    <ResponsiveModal>
      <h1 className="text-2xl font-bold">Create Account</h1>
          <div className="p-4 flex flex-col gap-y-4">
            <label>
              <p className="font-semibold">Email</p>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-200 w-full px-3 py-2 "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <div className="flex gap-x-4">
              <label>
                <p className="font-semibold">Password</p>
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <label>
                <p className="font-semibold">Confirm Password</p>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className="flex gap-x-4">
              <label>
                <p className="font-semibold">First name</p>
                <input
                  type="text"
                  placeholder="First name"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label>
                <p className="font-semibold">Last name</p>
                <input
                  type="text"
                  placeholder="Last name"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </div>

            <label>
              <p className="font-semibold">Display name</p>
              <input
                type="text"
                placeholder="Display name"
                className="border border-gray-200 w-full px-3 py-2"
                value={displayName}
                onChange={(e) => {setDisplayName(e.target.value)}}
              />
            </label>

            <div className="flex gap-x-4">
              <label>
                <p className="font-semibold">Date of birth</p>
                <input
                  type="date"
                  placeholder="Date of birth"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={dob}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDOB(e.target.value);
                  }}
                />
              </label>
              <label>
                <p className="font-semibold">Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  className="border border-gray-200 w-full px-3 py-2"
                  value={country}
                  onChange={(e) => {setCountry(e.target.value)}}
                />
              </label>
            </div>

            <button
              className="font-semibold bg-blue-500 text-white px-3 py-2 "
              onClick={onCreate}
            >
              Create Account
            </button>
            <button
              className="font-semibold bg-red-500 text-white px-3 py-2 "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
    </ResponsiveModal>
  );
};

export default SignUpForm;
