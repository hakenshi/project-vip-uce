import {ReactNode} from "react";

export default function AlunoLayout({ children }: { children: ReactNode }) {
    return(
        <main>
            {children}
        </main>
    )
}