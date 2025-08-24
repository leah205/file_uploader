-- DropForeignKey
ALTER TABLE "public"."folders" DROP CONSTRAINT "folders_parentid_fkey";

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
