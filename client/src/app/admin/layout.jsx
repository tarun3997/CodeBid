import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({children}){
    return (
        <div className="flex bg-[#17151f] w-full">
            <Sidebar />
            <div className="w-72"></div>
        <div className="w-full">{children}</div>
        </div>
    )
}