import type React from "react"

type props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: props) {
    return (
        <div className="flex h-screen">
            <div className=" bg-amber-50">
                sidebar
            </div>
            
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
}