import Link from "next/link";
import Header from "./Header"
import Title from "./Title"
import {useRouter} from "next/router";

function Layout({children}) {
    const router = useRouter();
    return (<>  
        <Header/>
        
        <main className="container mx-auto text-xl max-w-xl px-5">
        <Title/>
        <nav className="my-5">
           <Link href="/"
           className="mr-4"
           >
            Overview
            </Link>
           <Link href="/edit">Edit servers</Link>
        </nav>
            {children}
        </main>
        
        </>);
}

export default Layout;