/*
  Warnings:

  - You are about to drop the column `gametype` on the `gameservers` table. All the data in the column will be lost.
  - Added the required column `game` to the `gameservers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gameservers" DROP COLUMN "gametype",
ADD COLUMN     "game" TEXT NOT NULL;
