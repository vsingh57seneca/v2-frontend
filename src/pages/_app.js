import Navbar from "@/components/Navigation/Navbar";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/contexts/ModalContext";
import CreatePostModalWrapper from "@/components/Posts/CreatePostModalWrapper"; // New wrapper component
import { SocketProvider } from "@/contexts/SocketContext";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SocketProvider>
      <ModalProvider>
        <div className="min-h-screen flex">
          <Toaster />
          <div
            className={`flex fixed bottom-0 lg:static lg:bottom-auto ${
              router.pathname === "/" && "hidden"
            }`}
          >
            <Navbar />
          </div>
          <div
            className={`flex-grow overflow-hidden overflow-y-auto relative ${
              router.pathname === "/"
                ? "min-h-screen"
                : "h-[calc(100vh-80px)] lg:min-h-screen"
            }`}
          >
            <CreatePostModalWrapper />
            <Component {...pageProps} />
          </div>
        </div>
      </ModalProvider>
    </SocketProvider>
  );
}
