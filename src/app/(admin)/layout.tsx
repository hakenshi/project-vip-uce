'use client'

import {ReactNode, useEffect} from "react";
import "./admin-layout.css"
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import {faChalkboard, faChartColumn, faChartPie, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {useStateContext} from "@/components/contexts/useStateContext";
import {Users} from "@prisma/client";

export default function DashboardLayout({children}: { children: ReactNode }) {

    const {user, setUser} = useStateContext();
    useEffect(() => {
        const userId = sessionStorage.getItem("auth_user");
        if (!user) {
            fetch(`/api/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
                .then(({user}: {user: Users}) => {
                    setUser(user);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [user]);

    return (
        // @ts-ignore
        <>
            <Nav/>
            <Aside links={[{link: '/dashboard', label: 'Dashboard', icon: faChartColumn}, {
                link: '/alunos',
                label: 'Alunos',
                icon: faUserGroup
            }, {link: '/turmas', label: 'Turmas', icon: faChalkboard}]}/>
            {children}
        </>
    )
}