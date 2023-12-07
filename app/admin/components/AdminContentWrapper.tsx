import { ReactNode } from "react";

type AdminContentWrapperType = {
    children: ReactNode
};
const AdminContentWrapper = ({ children }: AdminContentWrapperType) => {
    return (
        <>
            <div className="mx-3 lg:mx-0 lg:ml-1 lg:mr-4 space-y-7">
                { children }
            </div>
        </>
    );
};

export default AdminContentWrapper;