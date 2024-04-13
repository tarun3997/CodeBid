import CustomNavbar from "@/components/SideNavbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";

export default function UserLayout({children}){
    return (
        <div className="flex  flex-col">
            <div className="flex">
                
            <CustomNavbar />
        <div className="w-full">{children}</div>
        </div>
        <Footer />
        </div>
    )
}