import {ReactNode} from "react";
import "./admin-layout.css"
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import {faChalkboard, faChartColumn, faChartPie, faUserGroup} from "@fortawesome/free-solid-svg-icons";
export default function DashboardLayout({children}: {children: ReactNode}) {
    return(
       <>
           <Nav/>
           <Aside links={[{link: '/dashboard', label: 'Dashboard', icon: faChartColumn},{link: '/alunos', label: 'Alunos', icon: faUserGroup}, {link: '/turmas', label: 'Turmas', icon: faChalkboard} ]}/>
           {children}
       </>
   )
}