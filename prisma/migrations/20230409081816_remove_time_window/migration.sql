/*
  Warnings:

  - You are about to drop the column `time_window` on the `Asset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "tmdb_id" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "available" TEXT NOT NULL
);
INSERT INTO "new_Asset" ("available", "id", "image", "media_type", "title", "tmdb_id") SELECT "available", "id", "image", "media_type", "title", "tmdb_id" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
