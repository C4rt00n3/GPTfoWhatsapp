-- CreateTable
CREATE TABLE "phone" (
    "number" TEXT NOT NULL,
    "date_now" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count_use" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "image_count" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "twitter" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TwitterID" TEXT,
    "ScreenName" TEXT,
    "Followers" TEXT,
    "Blue" TEXT,
    "Connections" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "phone_number_key" ON "phone"("number");

-- CreateIndex
CREATE UNIQUE INDEX "twitter_ID_key" ON "twitter"("ID");
