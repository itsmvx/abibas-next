import prisma from "../lib/prisma";

async function main() {
    await prisma.roles.createMany({
        data: [
            { id: "ADMIN", name: "ADMIN" },
            { id: "USER", name: "USER" },
        ],
    });

    await prisma.audiences.createMany({
        data: [
            { id: "UNISEX", name: "UNISEX" },
            { id: "MEN", name: "MEN" },
            { id: "WOMEN", name: "WOMEN" }, // Corrected the name from "NAME" to "WOMEN"
            { id: "KID", name: "KID" },
        ],
    });

    await prisma.categories.createMany({
        data: [
            {
                id: 'ALL',
                name: 'All',
                slug: 'All Categories',
                description: 'All Categories',
                images: ['image122.jpg', 'image222.jpg'],
            },
            {
                name: 'Clothing',
                slug: 'clothing',
                description: 'Category for various clothing items',
                images: ['image1.jpg', 'image2.jpg'],
            },
            {
                name: 'Footwear',
                slug: 'footwear',
                description: 'Category for shoes and sneakers',
                images: ['image3.jpg', 'image4.jpg'],
            },
            {
                name: 'Accessories',
                slug: 'accessories',
                description: 'Category for accessories like hats and bags',
                images: ['image5.jpg', 'image6.jpg'],
            },
            {
                name: 'Outdoor Gear',
                slug: 'outdoor gear',
                description: 'Category for outdoor and sports equipment',
                images: ['image7.jpg', 'image8.jpg'],
            },
            {
                name: 'Sportswear',
                slug: 'sportswear',
                description: 'Category for sport specific clothing',
                images: ['image9.jpg', 'image10.jpg'],
            },
            {
                name: 'Athletic Shoes',
                slug: 'athletic shoes',
                description: 'Category for athletic and running shoes',
                images: ['image11.jpg', 'image12.jpg'],
            },
        ],
    });

    await prisma.tags.createMany({
        data: [
            {
                name: 'Casual',
                slug: 'casual',
                images: ['image13.jpg', 'image14.jpg'],
            },
            {
                name: 'Sporty',
                slug: 'sporty',
                images: ['image15.jpg', 'image16.jpg'],
            },
            {
                name: 'Formal',
                slug: 'formal',
                images: ['image17.jpg', 'image18.jpg'],
            },
            {
                name: 'Running',
                slug: 'running',
                images: ['image19.jpg', 'image20.jpg'],
            },
            {
                name: 'Outdoor',
                slug: 'outdoor',
                images: ['image21.jpg', 'image22.jpg'],
            },
            {
                name: 'Accessories',
                slug: 'accessories',
                images: ['image23.jpg', 'image24.jpg'],
            },
        ],
    });

    await prisma.series.createMany({
        data: [
            {
                id: 'ORIGINAL',
                name: 'Original',
                slug: 'original items for you',
                description: 'Og',
            },
            {
                id: 'Night StarFall',
                name: 'Night StarFall',
                slug: 'fallen',
                description: 'Popular series of Night StarFall',
            },
            {
                id: 'Millennium',
                name: 'Millennium',
                slug: 'Products by Millennium Science School Students',
                description: 'GO BRR',
            },
            {
                id: 'Ignite',
                name: 'Ignite',
                slug: 'ignite your spirit',
                description: 'High performance series',
            },
            {
                id: 'Herrscher of Void',
                name: 'Herrscher of Void',
                slug: 'void is coming',
                description: `Let the void coming`,
            },
            {
                name: 'Netherlight',
                slug: 'light is fleeting',
                description: 'Extreme conditions series',
            },
            {
                name: 'Sentience',
                slug: 'ahahaha',
                description: `Don't you dare to runaway`,
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
