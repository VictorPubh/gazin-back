/*
  Warnings:

  - You are about to drop the column `personId` on the `Hobby` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hobby" DROP CONSTRAINT "Hobby_personId_fkey";

-- AlterTable
ALTER TABLE "Hobby" DROP COLUMN "personId";

-- CreateTable
CREATE TABLE "_HobbyToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HobbyToPerson_AB_unique" ON "_HobbyToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbyToPerson_B_index" ON "_HobbyToPerson"("B");

-- AddForeignKey
ALTER TABLE "_HobbyToPerson" ADD FOREIGN KEY ("A") REFERENCES "Hobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HobbyToPerson" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
