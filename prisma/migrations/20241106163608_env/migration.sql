/*
  Warnings:

  - The `status` column on the `UserActivities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `notificationType` on the `Notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ALERT', 'MESSAGE');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "file" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Levels" ALTER COLUMN "level" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "notificationType",
ADD COLUMN     "notificationType" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "UserActivities" DROP COLUMN "status",
ADD COLUMN     "status" "ActivityStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "UserType" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;
