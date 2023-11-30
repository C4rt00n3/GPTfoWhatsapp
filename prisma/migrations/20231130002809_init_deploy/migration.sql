-- CreateTable
CREATE TABLE "phone" (
    "number" TEXT NOT NULL,
    "date_now" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count_use" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "image_count" INTEGER DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "phone_number_key" ON "phone"("number");
