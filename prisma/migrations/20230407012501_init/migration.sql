-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "tmdb_id" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "time_window" TEXT NOT NULL,
    "available" TEXT NOT NULL
);
