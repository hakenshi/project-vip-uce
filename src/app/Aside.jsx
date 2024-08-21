"use client";
import React from 'react';

const Aside = () => {
    return (
        <div className="h-screen flex">
            <aside className="flex flex-col  w-52 items-center justify-center  text-white bg-zinc-600">
                <ul className="flex-grow flex-col justify-center gap-5">
                    <div className="flex flex-col justify-center gap-9 teste">
                        <li><a href=""><i className="fa-solid fa-chart-line"></i> Dashboard</a></li>
                        <li><a href=""><i className="fa-solid fa-user"></i> Alunos</a></li>
                        <li><a href=""><i className="fa-solid fa-chalkboard"></i> Turmas</a></li>
                    </div>
                </ul>
                <div className="flex justify-center mb-4"><a><i className="fa-solid fa-right-from-bracket"></i> LOGOUT</a>
                </div>
            </aside>
        </div>
    );
};

export default Aside;