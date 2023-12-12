import AdminContentWrapper from "@/app/admin/components/AdminContentWrapper";
import prisma from "@/lib/prisma";
import { ErrorBoundary } from "@/app/admin/components/ErrorBoundary";
import AudiencesTable from "@/app/admin/audiences/components/AudiencesTable";
import AudiencesHeader from "@/app/admin/audiences/components/AudiencesHeader";
const getAudiencesData = async () => {
    try {
        return await prisma.audiences.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    },
                },
            },
        })
    } catch (error) {
        return null;
    }
}
const AudiencesPage = async () => {
    const audiences: AudiencesData | null = await getAudiencesData();
    if (!audiences) {
        return (
            <ErrorBoundary />
        )
    }

    return (
        <AdminContentWrapper>
            <AudiencesHeader />
            <AudiencesTable audiencesData={audiences} />
        </AdminContentWrapper>
    )
}

export default AudiencesPage;
