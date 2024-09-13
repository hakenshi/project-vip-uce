import React from 'react';

import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

interface Link {
    link: string;
    label: string;
    icon: IconDefinition;
}

interface AsideProps {
    links: Link[];
}

const Aside: React.FC<AsideProps> = ({links}) => {
    const logout = async () => {
        'use server'
        const token = cookies().get('token')

        if (token){
            cookies().delete('token')
            redirect('/')
        }
    }

    return (
        <aside className="flex md:flex-col items-center justify-center text-white bg-zinc-600">
            <div className="flex md:flex-col justify-center gap-9 flex-grow">
                <ul className="flex md:flex-col w-full justify-evenly md:justify-center gap-5">
                    {links?.map(({link, label, icon}, index) => (
                        <li className={"text-lg text-center md:text-left"} key={index}><Link href={link}><FontAwesomeIcon icon={icon}/> <span
                            className={"md:text-lg text-xs block md:inline"}>{label}</span> </Link></li>
                    ))}
                </ul>
            </div>
            <form action={logout}>
                <button className="flex justify-center items-center p-5 gap-5 text-lg">
                    <FontAwesomeIcon icon={faRightFromBracket}/>
                    <span className={"hidden md:inline"}>Sair</span>
                </button>
            </form>
        </aside>
    );
};

export default Aside;