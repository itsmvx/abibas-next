/*
  Warnings:

  - You are about to drop the `_eventToproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_productTotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `audience_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "_eventToproduct" DROP CONSTRAINT "_eventToproduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_eventToproduct" DROP CONSTRAINT "_eventToproduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_productTotag" DROP CONSTRAINT "_productTotag_A_fkey";

-- DropForeignKey
ALTER TABLE "_productTotag" DROP CONSTRAINT "_productTotag_B_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "series" DROP CONSTRAINT "series_tags_id_fkey";

-- DropTable
DROP TABLE "_eventToproduct";

-- DropTable
DROP TABLE "_productTotag";

-- DropTable
DROP TABLE "audience_image";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "tag";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "audience_images" (
    "id" TEXT NOT NULL,
    "image_urls" TEXT[],
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "audience" "audiences" NOT NULL,

    CONSTRAINT "audience_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullname" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roles" DEFAULT 'USER',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "audience" "audiences" NOT NULL DEFAULT 'ALL',
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "image_urls" TEXT[],
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "audience" "audiences" NOT NULL DEFAULT 'ALL',
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_urls" TEXT[],
    "begin_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_eventsToproduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_productTotags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "audience_images_id_key" ON "audience_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "events_id_key" ON "events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "events_name_key" ON "events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_eventsToproduct_AB_unique" ON "_eventsToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_eventsToproduct_B_index" ON "_eventsToproduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_productTotags_AB_unique" ON "_productTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_productTotags_B_index" ON "_productTotags"("B");

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventsToproduct" ADD CONSTRAINT "_eventsToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventsToproduct" ADD CONSTRAINT "_eventsToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productTotags" ADD CONSTRAINT "_productTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productTotags" ADD CONSTRAINT "_productTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
