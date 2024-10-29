"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"

export function AdminLogin() {
    const [seePassword, setSeePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleSeePassword = () => {
      setSeePassword(!seePassword);
    };

    const handleSignIn = async () => {
      try {
        const res = await signInWithEmailAndPassword(email, password);
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        router.push("/");
      }
      catch (error) {
        console.error(error);
      }
    };
    
    return (
        <form className="mt-28 ml-auto mr-auto p-8 pb-16 pt-16 w-96 min-w-2/3 bg-white flex-col border border-solid border-gray-200 rounded-xl">
            <h1 className="text-center text-3xl font-interBold mb-12">Login</h1>
            <div className="flex-col mb-8">
              <div className="m-2 ml-4">
                <label className="font-interRegular" htmlFor="email">Email</label>
              </div>
              <div>
                <input required
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full p-2 pl-4 pr-4 outline-none font-interRegular box-border w-full border border-solid border-slate-300 focus:border-black"  
                  type="email" 
                  id="email" 
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="m-2 ml-4">
                <label className="font-interRegular" htmlFor="password">Password</label>
              </div>
              <div>
                <input required
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full p-2 pl-4 pr-4 outline-none font-interRegular box-border w-full border border-solid border-slate-300 focus:border-black"  
                  type={seePassword ? "text" : "password"} 
                  id="password" 
                />
                <div className="m-4 mt-4 flex gap-2">
                  <input 
                    onChange={handleSeePassword}
                    className="cursor-pointer"
                    type="checkbox" 
                    id="checkbox" /
                  >
                  <label className="cursor-pointer font-interRegular text-sm" htmlFor="checkbox">See password</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-12">
              <button onClick={handleSignIn} className="font-interRegular bg-black text-white p-2 pl-4 pr-4 border rounded-xl">
                Login
              </button>
            </div>
        </form>
    );
}