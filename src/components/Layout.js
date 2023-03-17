import Link from "next/link";
import Header from "./Header"
import Title from "./Title"
import { useRouter } from "next/router";

function Layout({ children }) {
    const { pathname } = useRouter();
    return (<>
        <Header />

        <main className="container mx-auto text-xl max-w-xl px-5 text-slate-400">
            <Title />
            <nav className="my-5">
                <Link href="/"
                    className={`mr-4 ${pathname === "/" ? "underline text-white" : null}`}
                >
                    Overview
                </Link>
                <Link href="/edit"
                    className={`mr-4 ${pathname === "/edit" ? "underline text-white" : null}`}
                >
                    Edit servers
                </Link>
            </nav>
            {children}
        </main>

    </>);
}

export default Layout;