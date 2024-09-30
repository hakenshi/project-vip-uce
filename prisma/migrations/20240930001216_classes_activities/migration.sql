-- CreateTable
CREATE TABLE "ClassesActivities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "activitiesId" INTEGER NOT NULL,
    CONSTRAINT "ClassesActivities_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassesActivities_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
