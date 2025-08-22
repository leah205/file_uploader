/*
  Warnings:

  - Added the required column `root` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."folders" ADD COLUMN     "root" BOOLEAN NOT NULL;
