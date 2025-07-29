/*
  Warnings:

  - You are about to drop the column `discountCodeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `DiscountCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DownloadVerification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiscountCodeToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DownloadVerification" DROP CONSTRAINT "DownloadVerification_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "_DiscountCodeToProduct" DROP CONSTRAINT "_DiscountCodeToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiscountCodeToProduct" DROP CONSTRAINT "_DiscountCodeToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discountCodeId";

-- DropTable
DROP TABLE "DiscountCode";

-- DropTable
DROP TABLE "DownloadVerification";

-- DropTable
DROP TABLE "_DiscountCodeToProduct";

-- DropEnum
DROP TYPE "DiscountCodeType";
