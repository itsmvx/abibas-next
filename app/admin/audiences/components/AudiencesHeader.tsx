const AudiencesHeader = () => {
    return (
        <>
            <section className="select-none space-y-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-medium tracking-tight">List of Audiences</h1>
                    <button className="px-3 py-2 flex items-center justify-center gap-x-3 rounded-md ring-[0.5px] hover:bg-neutral-900 hover:text-white transition-colors duration-200 ring-zinc-400 shadow-md bg-white">
                        <p className="text-sm">Add New</p>
                        <iconify-icon width={30} icon="mdi:tag-plus-outline"></iconify-icon>
                    </button>
                </div>
            </section>
        </>
    )
}
export default AudiencesHeader
