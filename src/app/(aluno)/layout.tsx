import {ReactNode} from "react";
import "../(admin)/admin-layout.css"
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import {faChalkboard, faChartColumn, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {auth} from "@/actions/auth";

export default function AlunoLayout({ children }: { children: ReactNode }) {

    const user = auth();

    return(
        <>
            <Nav user={user}/>
            <Aside links={[{link: '/turma', label: 'Minha Turma', icon: faChalkboard}, {
                link: '/atividades',
                label: 'Minhas Atividades',
                icon: faUserGroup
            }]}/>
            {children}
        </>
    )
}