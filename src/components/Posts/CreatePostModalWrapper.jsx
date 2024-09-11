import React from "react";
import CreatePostModal from "@/components/Posts/CreatePostModal";
import { useModalContext } from "@/contexts/ModalContext";

const CreatePostModalWrapper = () => {
  const { showCreatePostModal } = useModalContext();

  return showCreatePostModal ? <CreatePostModal /> : null;
};

export default CreatePostModalWrapper;
