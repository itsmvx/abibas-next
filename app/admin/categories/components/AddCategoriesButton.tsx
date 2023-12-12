'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddCategoriesButton = () => {
    const path:string = usePathname();
    return (
        <>
            <Link
                href={`${path}/new`}
                className="px-3 py-2 flex items-center justify-center gap-x-3 rounded-md ring-[0.5px] hover:bg-neutral-900 hover:text-white transition-colors duration-200 ring-zinc-400 shadow-md bg-white">
                <p className="text-sm">Add New</p>
                <iconify-icon width={30} icon="mdi:folder-multiple-plus-outline"></iconify-icon>
            </Link>
        </>
    );
};

export default AddCategoriesButton;