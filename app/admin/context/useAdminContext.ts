import { useContext } from "react";
import { AdminContext } from "@/app/admin/context/AdminProvider";

const useAdminContext = () => {
    const { adminState, adminDispatch, ADMIN_STATE_ACTIONS } = useContext(AdminContext);

    return {
        adminState,
        adminDispatch,
        ADMIN_STATE_ACTIONS
    };
};
export default useAdminContext;