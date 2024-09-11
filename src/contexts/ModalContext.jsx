import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  return (
    <ModalContext.Provider value={{showCreatePostModal, setShowCreatePostModal}}>
        {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
    return useContext(ModalContext);
};