import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest) {
    const searchParams: string = req.nextUrl.searchParams.get('check') || '';
    try {
        const res = await prisma.categories.findUnique({
            where: {
                name: searchParams
            }
        })
        if (!res) {
            return NextResponse.json({
                message: 'Categories name available to use'
            }, { status: 200 })
        }
        return NextResponse.json({
            message: 'Categories name already exist'
        }, { status: 409 })
    } catch (error) {
        return NextResponse.json({
            message: 'Unexpected error occurred'
        }, { status: 500 })
    }
}
export const revalidate = 0;