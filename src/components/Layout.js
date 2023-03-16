import Link from "next/link";
import Header from "./Header"
import Title from "./Title"

function Layout({children}) {
    return (<>  
        <Header/>
        
        <main className="container mx-auto text-xl max-w-xl">
        <Title/>
        <navbar>
           <Link href="/"
           className="mr-4"
           >
            Overview
            </Link>
           <Link href="/edit">Edit servers</Link>
        </navbar>
            {children}
        </main>
        
        </>);
}

export default Layout;