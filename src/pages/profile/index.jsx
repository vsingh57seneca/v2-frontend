import React, { useEffect, useState } from "react";
import { find } from "@/apis/Account";
import Loading from "@/components/General/Loading";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const ProfilesIndex = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [country, setCountry] = useState("");

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    const result = await find(token);
    if (result?.status === 200) {
      setUser(result?.data);
    } else if (result?.status === 403) {
      toast.error(result?.data);
      router.push('/');
      return;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setEmail(user?.email);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setDOB(user?.dob?.slice(0, 10));
    setCountry(user?.country);
  }, [user]);

  const onCancel = () => {
    router.push('/feed');
  }

  return (
    <div className="h-full">
      {user ? (
        <>
          <h1 className="font-bold text-2xl p-4">
            {user?.display_name}'s Profile
          </h1>
          <div className="grid grid-cols-2 p-8 gap-y-6 gap-x-8">
            <div className="col-span-full flex gap-x-6">
              <Image
                src={
                  user?.display_image
                    ? user?.display_image
                    : `/images/avatars/default.png`
                }
                width={56}
                height={56}
                alt="Profile Picture"
                priority
                className="rounded-full"
              />

              <button className="px-5 border rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all ease-in-out duration-300">
                Upload Image
              </button>
            </div>

            <div className="col-span-full">
              <label htmlFor="" className="flex flex-col">
                <h1 className="font-semibold text-xl">Email</h1>
                <input
                  className="border px-3 py-2 rounded-lg border-gray-300 w-full"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="col-span-full md:col-span-1">
              <label htmlFor="" className="flex flex-col">
                <h1 className="font-semibold text-xl">First name</h1>
                <input
                  className="border px-3 py-2 rounded-lg border-gray-300 w-full"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>

            <div className="col-span-full md:col-span-1">
              <label htmlFor="" className="flex flex-col">
                <h1 className="font-semibold text-xl">Last name</h1>
                <input
                  className="border px-3 py-2 rounded-lg border-gray-300 w-full"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            <div className="col-span-full md:col-span-1">
              <label htmlFor="" className="flex flex-col">
                <h1 className="font-semibold text-xl">Date of birth</h1>
                <input
                  className="border px-3 py-2 rounded-lg border-gray-300 w-full"
                  type="date"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </label>
            </div>

            <div className="col-span-full md:col-span-1">
              <label htmlFor="" className="flex flex-col">
                <h1 className="font-semibold text-xl">Country</h1>
                <input
                  className="border px-3 py-2 rounded-lg border-gray-300 w-full"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center p-8">
            <div className="flex gap-x-6">
              <button className="px-3 py-2 border rounded-lg bg-blue-500 text-white transition-all ease-in-out duration-300 hover:bg-blue-700">Save Changes</button>
              <button className="px-3 py-2 border rounded-lg bg-neutral-600 text-white transition-all ease-in-out duration-300 hover:bg-neutral-800" onClick={onCancel}>Cancel</button>
            </div>
            <button className="px-3 py-2 border rounded-lg bg-red-600 text-white transition-all ease-in-out duration-300 hover:bg-red-800">Delete</button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfilesIndex;
