-- AlterTable
ALTER TABLE "public"."files" ADD COLUMN     "folderid" INTEGER;

-- CreateTable
CREATE TABLE "public"."folders" (
    "id" SERIAL NOT NULL,
    "parentid" INTEGER,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "public"."folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "public"."folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
