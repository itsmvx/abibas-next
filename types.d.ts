import React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes, HTMLElement>
        }
    }
    //PRISMA TABLE COLUMN TYPES
    type AudiencesData = ({
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