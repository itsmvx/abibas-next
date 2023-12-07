/*
  Warnings:

  - You are about to drop the `_eventsToproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_productTotags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_eventsToproduct" DROP CONSTRAINT "_eventsToproduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_eventsToproduct" DROP CONSTRAINT "_eventsToproduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_productTotags" DROP CONSTRAINT "_productTotags_A_fkey";

-- DropForeignKey
ALTER TABLE "_productTotags" DROP CONSTRAINT "_productTotags_B_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_series_id_fkey";

-- DropTable
DROP TABLE "_eventsToproduct";

-- DropTable
DROP TABLE "_productTotags";

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specs" JSONB NOT NULL,
    "image_urls" TEXT[],
    "audience" "audiences" DEFAULT 'ALL',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "categories_id" TEXT,
    "series_id" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_eventsToproducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_productsTotags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_eventsToproducts_AB_unique" ON "_eventsToproducts"("A", "B");

-- CreateIndex
CREATE INDEX "_eventsToproducts_B_index" ON "_eventsToproducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_productsTotags_AB_unique" ON "_productsTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_productsTotags_B_index" ON "_productsTotags"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventsToproducts" ADD CONSTRAINT "_eventsToproducts_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventsToproducts" ADD CONSTRAINT "_eventsToproducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTotags" ADD CONSTRAINT "_productsTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTotags" ADD CONSTRAINT "_productsTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
