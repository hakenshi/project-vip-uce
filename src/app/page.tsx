import {FormInput} from "@/components/FormInput";
import Image from "next/image";
import logo from "@/images/LOGOVIP.png"
import {login} from "@/actions/auth";
export default function Home() {



  return (
    <main className="flex justify-center items-center h-screen">
      <div className="border p-5 rounded m-2 w-[32rem] h-[32rem] bg-white flex justify-center items-center shadow-lg shadow-zinc-200">
        <form className="p-5 w-full flex flex-col gap-5" action={login}>
          <div className="flex w-full justify-center">
            <Image className={"w-32"} width={114} src={logo} alt={"logo vip english"} />
          </div>
          <FormInput name={"email"} label={"Email"} placeholder={"email@gmail.com"} />
          <FormInput type={'password'} name={"senha"} label={"Senha"} placeholder={"•••••••"}/>
          <div className="flex justify-center">
            <button className="bg-red-600 hover:bg-red-700 p-2 text-white rounded w-44" type={"submit"}>Enviar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
