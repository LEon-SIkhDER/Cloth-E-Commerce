import { auth } from "@/lib/auth";
import SideBar from "@/SharedComponent/SideBar/SideBar";
// import { router } from "better-auth/api";
// import { redirect } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
// import "../globals.css"



const DashboardLayout = async ({ children }) => {
    
    const session = await auth.api.getSession({
        headers: await headers() // headers containing the user's session token
    });
    // console.log('session from server', session)
    if(!session){
        return redirect("/signIn")
    }
    return (
        <div>
            <Toaster></Toaster>
            <SideBar pages={children}></SideBar>
        </div>
    );
};

export default DashboardLayout;