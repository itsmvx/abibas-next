import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import crypto from "crypto";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData: FormData = await req.formData();
        const formDataValues: FormDataEntryValue[] = Array.from(formData.values());
        formDataValues.map(async (image: FormDataEntryValue): Promise<void> => {
            const img: File = image as File;
            const arrBuffer: ArrayBuffer = await img.arrayBuffer();
            const uint8Array: Uint8Array = new Uint8Array(arrBuffer);
            await sharp(uint8Array)
                .toFormat('webp')
                .resize({width: 1024})
                .webp({quality: 85})
                .toFile(`./public/${crypto.randomBytes(7).toString('hex') + '-' + img.name}.webp`)

        })
        return NextResponse.json({
            message: 'Operation Succeeded'
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Operation Failed, an error occurred',
            description: error
        })
    }

}
