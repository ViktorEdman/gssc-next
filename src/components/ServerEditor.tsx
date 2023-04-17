function ServerEditor({editServer: server}) {
    return ( 
    <div className="top-0 left-0 right-0 z-10 flex  absolute backdrop-blur-sm justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div className="h-fit w-xl z-20 bg-slate-800 rounded-lg" >
            <h2>Editing server {server.name}</h2>
        </div>
    </div> );
}

export default ServerEditor;