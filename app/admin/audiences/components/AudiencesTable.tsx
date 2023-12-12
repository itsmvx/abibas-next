import moment from "moment/moment";

type AudienceTableProps = {
    audiencesData? : ({
        _count: {
            products: number
        }}
        & {
        id: string,
        name: string,
        images: string[],
        created_at: Date | null,
        updated_at: Date | null
    }) []
}

const AudiencesTable = ({ audiencesData } : AudienceTableProps ) => {

    return (
        <>
            <section className="h-full bg-white border-[0.5px] border-zinc-300 shadow-sm shadow-zinc-400 overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead className="font-semibold text-left">
                    <tr>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Audience Name
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
                        audiencesData && audiencesData.map((audience, index) => {
                            return (
                                <tr key={index}>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        { audience.name }
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        { audience._count.products }
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        { audience.created_at ? `${ moment(audience.created_at.toDateString()).format('MMMM Do YYYY')}` : '-' }
                                    </td>
                                    <td className="text-xs whitespace-nowrap p-4">
                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                        46,53%
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </section>
        </>
    )
}
export default AudiencesTable
