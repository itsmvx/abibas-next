import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const AdminDefaultPage = () => {
    const session = getServerSession(options)
    if (!session) {
        redirect('/admin/dashboard')
    }
    redirect('/sign-in');
}
export default AdminDefaultPage
