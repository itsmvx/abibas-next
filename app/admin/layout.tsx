import type { Metadata } from 'next'
import { ReactNode } from "react";
import { Sidebar } from "@/app/admin/components/Sidebar";
import { Navbar } from "@/app/admin/components/Navbar";
import AdminProvider from "@/app/admin/context/AdminProvider";
export const metadata: Metadata = {
    title: 'Abibas | Admin',
};
type AdminLayoutProps = {
    children: ReactNode
};
export default function AdminLayout({ children }: AdminLayoutProps ) {
    return (
        <main className="w-full min-h-screen h-full bg-gray-100 scroll-smooth">
            <div className="ml-0 lg:ml-80 mx-4 lg:mx-0 overflow-hidden pt-5 transition-all duration-200">
                <AdminProvider>
                    <Sidebar />
                    <Navbar />
                    { children }
                </AdminProvider>
            </div>
        </main>
    )
}