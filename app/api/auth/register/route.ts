import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { aesCryptoTest } from "@/lib/CryptoLib";
export async function POST (req: NextRequest) {
    const headerKey = req.headers.get('X-Api-Key') ?? '';
    try {
        const { iv, key } = JSON.parse(headerKey);
        if (!aesCryptoTest(key, Buffer.from(iv, 'base64'))) {
            return NextResponse.json({
                message: 'Invalid API KEY'
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid API KEY'
        }, { status: 401 });
    }
    const { fullname, username, password } = await req.json();
    const existUser = await prisma.users.findUnique({
        where: {
            username: username,
        },
    });
    if (existUser) {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    } else {
        const user = await prisma.users.create({
            data: {
                fullname: fullname,
                username: username,
                password: await bcrypt.hash(password, 10)
            },
        });
        const res = {
            id: user.id,
            username: user.username,
            created_at: user.created_at,
        }
        return NextResponse.json(res);
    }
}