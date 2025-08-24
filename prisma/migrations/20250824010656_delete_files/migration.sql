-- DropForeignKey
ALTER TABLE "public"."files" DROP CONSTRAINT "files_folderid_fkey";

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
