import prisma from "@/lib/prisma";
import { ErrorBoundary } from "@/app/admin/components/ErrorBoundary";
import AdminContentWrapper from "@/app/admin/components/AdminContentWrapper";
import { dateFormat } from "@/lib/DateLib";
import AddCategoriesButton from "@/app/admin/categories/components/AddCategoriesButton";

async function getCategoriesData() {
    try {
        return await prisma.categories.findMany({
            select: {
                id: true,
                audiences: {
                    select: {
                        name: true
                    }
                },
                _count: {
                    select:{
                        products: true
                    }
                },
                name: true,
                slug: true,
                description: true,
                images: true,
                created_at: true
            }
        })
    } catch (error) {
        return null;
    }
}
const CategoriesPage = async ( ) => {
    const categoriesData = await getCategoriesData();
    if (!categoriesData) {
        return (
            <>
                <ErrorBoundary />
            </>
        )
    }
    return (
        <>
            <AdminContentWrapper>
                <section className="select-none space-y-10">
                    <div className="relative flex items-center justify-between">
                        <div className="relative w-28 h-11 md:hidden flex justify-start bg-white rounded-md ring-1 ring-zinc-400">
                            <button className="peer z-10 text-start indent-3 peer bg-transparent w-full h-full">
                                WOMEN
                            </button>
                            <div className="absolute top-2.5 right-1">
                                <iconify-icon width={26} icon="mdi:chevron-down"></iconify-icon>
                            </div>
                            <div className="peer-focus:visible invisible absolute top-full mt-1.5 w-28 h-32 flex flex-col items-center gap-x-1 bg-white rounded-md ring-1 ring-zinc-400 z-10">
                                <button className="text-start indent-3 peer z-10 bg-transparent w-full h-full hover:bg-zinc-200">
                                    MEN
                                </button>
                                <button className="text-start indent-3 peer z-10 bg-transparent w-full h-full hover:bg-zinc-200">
                                    WOMEN
                                </button>
                                <button className="text-start indent-3 peer z-10 bg-transparent w-full h-full hover:bg-zinc-200">
                                    KID
                                </button>
                            </div>

                        </div>

                        <div className="hidden md:flex items-center gap-x-3">
                            <button className="w-28 h-10 rounded-full text-black bg-zinc-200 hover:text-white hover:bg-neutral-900 transition-colors duration-200">
                                <p>UNISEX</p>
                            </button>
                            <button className="w-28 h-10 rounded-full text-black bg-zinc-200 hover:text-white hover:bg-neutral-900 transition-colors duration-200">
                                <p>MEN</p>
                            </button>
                            <button className="w-28 h-10 rounded-full text-black bg-zinc-200 hover:text-white hover:bg-neutral-900 transition-colors duration-200">
                                <p>WOMEN</p>
                            </button>
                            <button className="w-28 h-10 rounded-full text-black bg-zinc-200 hover:text-white hover:bg-neutral-900 transition-colors duration-200">
                                <p>KID</p>
                            </button>
                        </div>
                        <AddCategoriesButton />
                    </div>
                </section>

                <section className="h-full bg-white border-[0.5px] border-zinc-300 shadow-sm shadow-zinc-400 overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse">
                        <thead className="font-semibold text-left">
                        <tr>
                            <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                                Category
                            </th>
                            <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                                Audience
                            </th>
                            <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                                Total Products
                            </th>
                            <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                                Date Created
                            </th>
                            <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            categoriesData && categoriesData.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="indent-2 text-xs whitespace-nowrap p-4">
                                            { category.name }
                                        </td>
                                        <td className="indent-2 text-xs whitespace-nowrap p-4">
                                            { category?.audiences?.name ? category.audiences.name : `Not Set`}
                                        </td>
                                        <td className="indent-2 text-xs whitespace-nowrap p-4">
                                            { category._count.products }
                                        </td>
                                        <td className="indent-2 text-xs whitespace-nowrap p-4">
                                            { category.created_at ? `${dateFormat(category.created_at.toDateString(), 'MMMM Do YYYY')}` : '-' }
                                        </td>
                                        <td className="text-xs whitespace-nowrap p-4">
                                            <div className="relative flex flex-row gap-x-3">
                                                <button className="group relative w-6 h-6 hover:text-blue-700 transition-colors duration-200 rounded-full">
                                                    <iconify-icon width={24} icon="mdi:pencil-outline"></iconify-icon>
                                                    <p className="absolute -top-[110%] -left-1.5 text-xs text-white rounded-md bg-neutral-900 scale-100 group-hover:visible invisible px-2 py-1">
                                                        Edit
                                                    </p>
                                                </button>

                                                <button className="peer w-6 h-6 hover:text-red-500 hover:scale-125 transition-scale duration-200 rounded-full">
                                                    <iconify-icon width={24} icon="mdi:delete-outline"></iconify-icon>
                                                </button>
                                                <p className="absolute -top-[110%] left-5 text-xs text-white rounded-md bg-neutral-900 scale-100 peer-hover:visible invisible px-2 py-1">
                                                    Delete
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </section>
            </AdminContentWrapper>
        </>
    )
}
export default CategoriesPage
