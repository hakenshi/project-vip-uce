import Image from "next/image";
import Aside from "./Aside";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nav from "@/app/Nav";
export default function Home() {
  return (
    <main>
        <Nav/>
      <Aside/>
    </main>
  );
}
