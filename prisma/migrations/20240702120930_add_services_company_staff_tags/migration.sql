/*
  Warnings:

  - You are about to drop the column `name` on the `user_socials` table. All the data in the column will be lost.
  - Added the required column `title` to the `user_socials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "user_socials" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "company_services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "company_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_services" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "staff_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "service_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanyServiceToServiceTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ServiceTagToStaffService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "staff_services_user_id_idx" ON "staff_services"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyServiceToServiceTag_AB_unique" ON "_CompanyServiceToServiceTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyServiceToServiceTag_B_index" ON "_CompanyServiceToServiceTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceTagToStaffService_AB_unique" ON "_ServiceTagToStaffService"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceTagToStaffService_B_index" ON "_ServiceTagToStaffService"("B");

-- CreateIndex
CREATE INDEX "user_socials_user_id_idx" ON "user_socials"("user_id");

-- AddForeignKey
ALTER TABLE "staff_services" ADD CONSTRAINT "staff_services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_services" ADD CONSTRAINT "staff_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "company_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyServiceToServiceTag" ADD CONSTRAINT "_CompanyServiceToServiceTag_A_fkey" FOREIGN KEY ("A") REFERENCES "company_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyServiceToServiceTag" ADD CONSTRAINT "_CompanyServiceToServiceTag_B_fkey" FOREIGN KEY ("B") REFERENCES "service_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceTagToStaffService" ADD CONSTRAINT "_ServiceTagToStaffService_A_fkey" FOREIGN KEY ("A") REFERENCES "service_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceTagToStaffService" ADD CONSTRAINT "_ServiceTagToStaffService_B_fkey" FOREIGN KEY ("B") REFERENCES "staff_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
