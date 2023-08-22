/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `professors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "professors_name_key" ON "professors"("name");
