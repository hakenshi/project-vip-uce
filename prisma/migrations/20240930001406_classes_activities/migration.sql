/*
  Warnings:

  - Added the required column `updated_at` to the `ClassesActivities` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassesActivities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "activitiesId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ClassesActivities_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassesActivities_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClassesActivities" ("activitiesId", "classId", "id") SELECT "activitiesId", "classId", "id" FROM "ClassesActivities";
DROP TABLE "ClassesActivities";
ALTER TABLE "new_ClassesActivities" RENAME TO "ClassesActivities";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
