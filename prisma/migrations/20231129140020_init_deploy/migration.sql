-- CreateTable
CREATE TABLE "number" (
    "number" TEXT NOT NULL,
    "date_now" DATETIME NOT NULL,
    "count_use" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "number_number_key" ON "number"("number");
