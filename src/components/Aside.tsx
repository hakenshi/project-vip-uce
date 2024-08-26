'use client'

import React from 'react';

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {redirect, useRouter} from "next/navigation";
import {router} from "next/client";

interface Link{
    link: string;
    label: string;
    icon: IconDefinition;
}
interface AsideProps {
    links: Link[];
}

const Aside: React.FC<AsideProps> = ({links}) => {

    const router = useRouter();
    const logout = () =>{
        sessionStorage.clear();
        router.replace('/')
    }

    return (
            <aside className="flex flex-col items-center justify-center text-white bg-zinc-600">
                    <div className="flex flex-col justify-center gap-9 flex-grow">
                    <ul className="flex flex-col justify-center gap-5">
                        {links?.map(({link, label, icon}, index) => (
                            <li className={"text-lg"} key={index}><Link href={link} ><FontAwesomeIcon icon={icon} /> {label} </Link></li>
                        ))}
                    </ul>
                    </div>
                <button onClick={() => logout()} className="flex justify-center items-center p-5 gap-5 text-lg"><FontAwesomeIcon icon={faRightFromBracket} /> Sair</button>
            </aside>
    );
};

export default Aside;