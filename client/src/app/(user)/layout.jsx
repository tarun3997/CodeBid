import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";

export default function UserLayout({children}){
    return (
        <div className="flex bg-[#17151f] flex-col">
            <div className="flex">
                <div className="w-[11%]">
            <Sidebar />
            </div>
        <div className="w-full">{children}</div>
        </div>
        <Footer />
        </div>
    )
}