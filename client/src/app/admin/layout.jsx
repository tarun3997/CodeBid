import CustomNavbar from "@/components/SideNavbar";

export default function DashboardLayout({children}){
    return (
        <div className="flex w-full">
            <CustomNavbar />
            <div className="w-72"></div>
        <div className="w-full">{children}</div>
        </div>
    )
}