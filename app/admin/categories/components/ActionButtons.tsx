'use client'
const ActionButtons = () => {
    return (
        <>
            <button
                className="w-6 h-6">
                <iconify-icon width={18} icon="mdi:pencil-outline"></iconify-icon>
            </button>

            <button className="w-6 h-6">
                <iconify-icon width={18} icon="mdi:delete-outline"></iconify-icon>
            </button>
        </>
    );
};

export default ActionButtons;