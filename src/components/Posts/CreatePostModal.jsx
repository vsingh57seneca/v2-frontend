import React, { useEffect, useState } from "react";
import ResponsiveModal from "../General/ResponsiveModal";
import { IoCreate } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { useModalContext } from "@/contexts/ModalContext";
import toast from "react-hot-toast";
import { create } from "@/apis/Posts";
import { useRouter } from "next/router";

const fileTypes = ["JPG", "PNG", "GIF"];

const CreatePostModal = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSelected, setImageSelected] = useState(true);
  const [file, setFile] = useState(null);
  const [allowComments, setAllowComments] = useState(true);
  const { setShowCreatePostModal } = useModalContext();
  const [keyboard, setKeyboard] = useState(null);

  const handleChange = (file) => {
    setFile(file);
  };

  const onCreate = async () => {
    if (title === "") {
      toast.error("Title required");
      return;
    } else if (content === "") {
      toast.error("Content required");
      return;
    }

    const post = {
      owner: localStorage.getItem("token"),
      title: title,
      content: content,
      image: file,
      keyboard: keyboard,
      allowComments: allowComments,
    };

    console.log(post)

    try {
      const response = await create(post);
      console.log(response);
      if (response?.status === 201) {
        toast.success(response.data);
        setShowCreatePostModal(false);
      }
    } catch (error) {
      console.log(error);
      if(error?.response?.status === 403) {
        localStorage.removeItem('token');
        toast.error(error?.response?.data?.message);
        setShowCreatePostModal(false);
        router.push('/');
      }
    }
  };

  return (
    <ResponsiveModal>
      <div className="flex items-center gap-x-4">
        <IoCreate size={50} />
        <div className="flex flex-col">
          <h1 className="font-bold">Create Post</h1>
          <p>Share what is on your mind!</p>
        </div>
      </div>

      <div className="grid gird-cols-2 gap-y-6">
        <div className="col-span-full">
          <h1 className="font-semibold">
            Post Title <span className="text-red-500"> *</span>
          </h1>
          <input
            type="text"
            className="border border-gray-300 w-full rounded-lg px-3 py-2"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-span-full">
          <h1 className="font-semibold">
            Post Content <span className="text-red-500"> *</span>
          </h1>
          <textarea
            type="text"
            className="border border-gray-300 w-full rounded-lg px-3 py-2 resize-none"
            placeholder="Enter content here"
            value={content}
            maxLength={140}
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="col-span-full">
          <h1 className="font-semibold">Media</h1>
          <div className="flex flex-col justify-center gap-y-2">
            <div className="flex justify-center">
              <button
                className={`text-white border border-gray-300 px-3 py-2 rounded-md transition-all ease-in-out duration-300 ${
                  imageSelected
                    ? `bg-blue-500 hover:bg-blue-700`
                    : `bg-gray-500 hover:bg-gray-700`
                }`}
                onClick={() => {setImageSelected(true); setKeyboard(null)}}
              >
                Image
              </button>
              <button
                className={`text-white border border-gray-300 px-3 py-2 rounded-md transition-all ease-in-out duration-300 ${
                  !imageSelected
                    ? `bg-blue-500 hover:bg-blue-700`
                    : `bg-gray-500 hover:bg-gray-700`
                }`}
                onClick={() => {setImageSelected(false); setFile(null)}}
              >
                Keyboard
              </button>
            </div>
            {imageSelected ? (
              <div className="flex justify-center w-full">
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  multiple={false}
                  maxSize={4}
                />
              </div>
            ) : (
              <div>Display Keyboards here</div>
            )}
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex gap-x-4">
            <h1 className="font-semibold">Allow Comments?</h1>
            <input
              type="checkbox"
              value={allowComments}
              checked={allowComments}
              onChange={() => {
                setAllowComments(!allowComments);
              }}
              className="w-4"
            />
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex justify-end gap-x-4">
            <button
              className={`px-3 py-2 rounded-lg text-white transition-all ease-in-out duration-300 ${
                title === "" || content === ""
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 cursor-pointer hover:bg-blue-700"
              }`}
              onClick={onCreate}
            >
              Create Post
            </button>
            <button
              className="bg-neutral-800 px-3 py-2 rounded-lg text-white transition-all ease-in-out duration-300 hover:bg-neutral-950"
              onClick={() => setShowCreatePostModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default CreatePostModal;
