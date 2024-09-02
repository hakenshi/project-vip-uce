import {ReactNode} from "react";
import "./admin-layout.css"
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import {faChalkboard, faChartColumn, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Users} from "@prisma/client";
import {auth} from "@/actions/auth";
import {UserEnum} from "@/enums/user-enum";
import {redirect, useRouter} from "next/navigation";
import {cookies} from "next/headers";

export default function DashboardLayout({children}: { children: ReactNode; user: Users }) {

    const user = auth()


    if (user.userTypeId !== UserEnum.admin){
        redirect('/')
    }

    return (
        <>
            <Nav user={user}/>
            <Aside links={[{link: '/dashboard', label: 'Dashboard', icon: faChartColumn}, {
                link: '/alunos',
                label: 'Alunos',
                icon: faUserGroup
            }, {link: '/turmas', label: 'Turmas', icon: faChalkboard}]}/>
            {children}
        </>
    )
}