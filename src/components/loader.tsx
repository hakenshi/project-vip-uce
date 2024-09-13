import React from "react";
import Image from "next/image";

export default function Loader() {
    return (
        <div className={"w-full justify-center flex flex-col items-center h-[70%]"}>
            <Image width={100} height={100} src="/LOGOVIP.png" alt=""/>
            <span className="loader"></span>
        </div>
    )
}