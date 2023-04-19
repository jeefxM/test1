/*
  Warnings:

  - Made the column `username` on table `StoreFollowers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN "email" TEXT;
ALTER TABLE "Store" ADD COLUMN "facebook" TEXT;
ALTER TABLE "Store" ADD COLUMN "instagram" TEXT;
ALTER TABLE "Store" ADD COLUMN "twitter" TEXT;
ALTER TABLE "Store" ADD COLUMN "website" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreFollowers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT
);
INSERT INTO "new_StoreFollowers" ("avatar", "email", "id", "username") SELECT "avatar", "email", "id", "username" FROM "StoreFollowers";
DROP TABLE "StoreFollowers";
ALTER TABLE "new_StoreFollowers" RENAME TO "StoreFollowers";
CREATE UNIQUE INDEX "StoreFollowers_email_key" ON "StoreFollowers"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
