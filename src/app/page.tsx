import {FormInput} from "@/components/FormInput";
import Image from "next/image";
import logo from "@/images/LOGOVIP.png"
import {signIn} from "@/auth";
import SignIn from "@/components/SignIn";
export default function Home() {



  return (
    <main className="flex justify-center items-center h-screen">
      <div className="border p-5 rounded m-2 w-[32rem] h-[32rem] bg-white flex justify-center items-center shadow-lg shadow-zinc-200">
        <SignIn />
      </div>
    </main>
  );
}
