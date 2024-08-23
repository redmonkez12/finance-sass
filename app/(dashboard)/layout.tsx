import { PropsWithChildren } from "react";
import { Header } from "@/components/header";

export default function Page({ children }: PropsWithChildren) {
    return (
        <>
            <Header/>
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    );
}
