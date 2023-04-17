import { useState, useEffect } from "react";
import { signIn } from "next-auth/react"

function LoginForm({ toggleLogin }) {
    const [username, setUsername] = useState("admin")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        function escapeLogin(e) {
            if (e.keyCode === 27) toggleLogin()
        }

        document.addEventListener('keydown', escapeLogin);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', escapeLogin);
        }
    }, [toggleLogin]);

    return (<div id="authentication-modal" tabIndex={-1}
        onClick={(e) => {
            if (e.target === document.querySelector('#authentication-modal')) toggleLogin()

        }}
        className=" top-0 left-0 right-0 z-10 flex  absolute backdrop-blur-sm justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div className="h-fit w-xl z-20 bg-slate-800 rounded-lg"  >
            <div className="relative" onClick={() => null}>
                <button onClick={() => toggleLogin()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>
                    <form className="space-y-6" onSubmit={async (e) => {
                        e.preventDefault();
                        const authentication = await signIn("credentials", { redirect: false, username, password })
                        if (authentication.error) {
                            setError("Invalid credentials")
                        }
                    }}>
                        <div>
                            <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="admin" onChange={e => setUsername(e.target.value)} value={username} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={e => setPassword(e.target.value)} value={password} required />
                        </div>
                        <div>
                            {error}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default LoginForm;