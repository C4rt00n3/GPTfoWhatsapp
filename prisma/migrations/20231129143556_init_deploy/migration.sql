-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_number" (
    "number" TEXT NOT NULL,
    "date_now" DATETIME NOT NULL,
    "count_use" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "image_count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_number" ("count_use", "date_now", "name", "number") SELECT coalesce("count_use", 0) AS "count_use", "date_now", "name", "number" FROM "number";
DROP TABLE "number";
ALTER TABLE "new_number" RENAME TO "number";
CREATE UNIQUE INDEX "number_number_key" ON "number"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
