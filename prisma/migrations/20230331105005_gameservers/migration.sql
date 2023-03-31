-- CreateTable
CREATE TABLE "gameservers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gametype" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "gameservers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gameservers_name_key" ON "gameservers"("name");
