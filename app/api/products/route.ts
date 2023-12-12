import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
//
// const audiencesList = ["MEN", "WOMEN", "KID"];
//
// type QueryParamsType = {
//     audiences?: string | null;
//     name?: string | null;
// };

export async function GET(req: NextRequest) {
    return NextResponse.json({
        message: req
    })
    // let queryParams: QueryParamsType = {};
    //
    // if (req.nextUrl.searchParams.has("audiences")) {
    //     const audienceParam: string | null = req.nextUrl.searchParams.get("audiences") || "";
    //     if (audienceParam && audiencesList.includes(audienceParam.toUpperCase())) {
    //         queryParams.audiences = audienceParam.toUpperCase();
    //     } else {
    //         return NextResponse.json(
    //             {
    //                 message: "Invalid Audience Parameter",
    //             },
    //             { status: 400 }
    //         );
    //     }
    // }
    //
    // if (req.nextUrl.searchParams.has("name")) {
    //     queryParams.name = req.nextUrl.searchParams.get("name");
    // }
    //
    // const countParam = req.nextUrl.searchParams.get("count");
    // const takeQueryParam = countParam !== null ? parseInt(countParam, 10) : 20;
    //
    // try {
    //     const products = await prisma.products.findMany({
    //         where: {
    //             ...queryParams,
    //         },
    //         take: takeQueryParam,
    //     });
    //
    //     return NextResponse.json({
    //         message: "success",
    //         data: products,
    //     });
    // }
    // catch (error) {
    //     return NextResponse.json(
    //         {
    //             message: "Something Error",
    //         },
    //         { status: 500 }
    //     );
    // }
}
