import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";

export default function UserLayout({children}){
    return (
        <div className="flex bg-[#17151f] flex-col">
            <div className="flex">
                
            <Sidebar />
        <div className="w-full">{children}</div>
        </div>
        <Footer />
        </div>
    )
}