/*
  Warnings:

  - You are about to drop the column `conut_use` on the `number` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_number" (
    "number" TEXT NOT NULL,
    "date_now" DATETIME NOT NULL,
    "count_use" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL
);
INSERT INTO "new_number" ("date_now", "name", "number") SELECT "date_now", "name", "number" FROM "number";
DROP TABLE "number";
ALTER TABLE "new_number" RENAME TO "number";
CREATE UNIQUE INDEX "number_number_key" ON "number"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
