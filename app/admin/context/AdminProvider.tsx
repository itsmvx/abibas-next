'use client'
import React, { Context, createContext, useReducer } from "react";

export const AdminContext: Context<any> = createContext(null)
type AdminProviderChildren = {
    children: React.ReactNode
}
const AdminProvider = ({ children }: AdminProviderChildren) => {
    type AdminStateActions =  {
        TOGGLE_SIDEBAR: string,
        TOGGLE_SETTINGS: string
    };
    type AdminState = {
        openSidebar: boolean,
        openSettings: boolean
    };
    type AdminReducer = {
        type: keyof AdminStateActions,
        payload: any
    };
    const ADMIN_STATE_ACTIONS:AdminStateActions = {
        TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
        TOGGLE_SETTINGS: 'TOGGLE_SETTINGS'
    };
    const adminReducer = (state: AdminState, action: AdminReducer) => {
        switch (action.type) {
            case ADMIN_STATE_ACTIONS.TOGGLE_SIDEBAR:
                return {
                    ...state,
                    openSidebar: action.payload ?? !state.openSidebar
                }
            case ADMIN_STATE_ACTIONS.TOGGLE_SETTINGS:
                return {
                    ...state,
                    openSettings: !state.openSettings
                }
            default:
                return state;
        }
    };
    const [adminState, adminDispatch] = useReducer(adminReducer, {
        openSidebar: false,
        openSettings: false,
    });
    const AdminContextValue = {
        adminState,
        adminDispatch,
        ADMIN_STATE_ACTIONS
    }

    return (
        <>
            <AdminContext.Provider value={AdminContextValue}>
                { children }
            </AdminContext.Provider>
        </>
    );
};

export default AdminProvider;