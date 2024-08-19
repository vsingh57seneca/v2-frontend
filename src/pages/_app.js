import Navbar from "@/components/Navigation/Navbar";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <div className={`flex-grow ${router.pathname === "/" ? 'min-h-screen' : 'h-[calc(100vh-80px)]'}`}>
        <Component {...pageProps} />
      </div>
      <div className={`flex ${router.pathname === "/" && 'hidden'}`}> 
        <Navbar />
      </div>
    </div>
  );
}
