/*
  Warnings:

  - You are about to drop the column `name` on the `StoreFollowers` table. All the data in the column will be lost.
  - Added the required column `username` to the `StoreFollowers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreFollowers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT
);
INSERT INTO "new_StoreFollowers" ("avatar", "email", "id") SELECT "avatar", "email", "id" FROM "StoreFollowers";
DROP TABLE "StoreFollowers";
ALTER TABLE "new_StoreFollowers" RENAME TO "StoreFollowers";
CREATE UNIQUE INDEX "StoreFollowers_username_key" ON "StoreFollowers"("username");
CREATE UNIQUE INDEX "StoreFollowers_email_key" ON "StoreFollowers"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
