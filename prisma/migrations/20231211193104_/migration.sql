-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_series_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "series_id" DROP NOT NULL,
ALTER COLUMN "series_id" SET DEFAULT 'ORIGINAL';

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;
