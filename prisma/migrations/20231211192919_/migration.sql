-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_audience_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "audience_id" DROP NOT NULL,
ALTER COLUMN "audience_id" SET DEFAULT 'UNISEX',
ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "category_id" SET DEFAULT 'ALL';

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_audience_id_fkey" FOREIGN KEY ("audience_id") REFERENCES "audiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
