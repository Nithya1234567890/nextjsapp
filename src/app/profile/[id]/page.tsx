export default function userProfile({params}: any){
    return(
        <div className="flex flex-col justify-center gap-8 items-center min-h-screen">
            <h1 className="text-5xl">Profile</h1>
            <p className="text-3xl">Profile Page <span className=" bg-orange-400 text-white p-3 rounded-md border border-black"> {params.id}</span></p>
        </div>
    )
}