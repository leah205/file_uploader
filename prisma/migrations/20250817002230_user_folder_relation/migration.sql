/*
  Warnings:

  - Added the required column `userid` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."folders" ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
