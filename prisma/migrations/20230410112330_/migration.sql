-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreFollowers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "email" TEXT,
    "avatar" TEXT
);
INSERT INTO "new_StoreFollowers" ("avatar", "email", "id", "username") SELECT "avatar", "email", "id", "username" FROM "StoreFollowers";
DROP TABLE "StoreFollowers";
ALTER TABLE "new_StoreFollowers" RENAME TO "StoreFollowers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
