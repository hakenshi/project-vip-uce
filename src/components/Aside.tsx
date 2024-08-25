import React from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface Link{
    link: string;
    label: string;
    icon: IconDefinition;
}
interface AsideProps {
    links: Link[];
}

const Aside: React.FC<AsideProps> = ({links}) => {
    return (
            <aside className="flex flex-col items-center justify-center text-white bg-zinc-600">
                    <div className="flex flex-col justify-center gap-9 flex-grow">
                    <ul className="flex flex-col justify-center gap-5">
                        {links?.map(({link, label, icon}, index) => (
                            <li className={"text-lg"} key={index}><Link href={link} ><FontAwesomeIcon icon={icon} /> {label} </Link></li>
                        ))}
                    </ul>
                    </div>
                <div className="flex justify-center p-5"><FontAwesomeIcon icon={faRightFromBracket} /> Sair
                </div>
            </aside>
    );
};

export default Aside;