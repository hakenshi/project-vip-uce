-- CreateTable
CREATE TABLE "Levels" (
                          "id" SERIAL PRIMARY KEY,
                          "level" VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE "Classes" (
                           "id" SERIAL PRIMARY KEY,
                           "levelId" INTEGER NOT NULL,
                           "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           "updated_at" TIMESTAMP(3) NOT NULL,
                           CONSTRAINT "Classes_levelId_key" UNIQUE ("levelId")
);

-- CreateTable
CREATE TABLE "UserType" (
                            "id" SERIAL PRIMARY KEY,
                            "name" VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE "Activities" (
                              "id" SERIAL PRIMARY KEY,
                              "title" VARCHAR(191) NOT NULL,
                              "description" VARCHAR(191) NOT NULL,
                              "file" VARCHAR(191),
                              "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
                         "id" SERIAL PRIMARY KEY,
                         "classId" INTEGER,
                         "userTypeId" INTEGER NOT NULL DEFAULT 2,
                         "email" VARCHAR(191) NOT NULL,
                         "name" VARCHAR(191) NOT NULL,
                         "image" VARCHAR(191),
                         "password" VARCHAR(191) NOT NULL,
                         "birthDay" TIMESTAMP(3),
                         "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         "updated_at" TIMESTAMP(3) NOT NULL,
                         CONSTRAINT "Users_email_key" UNIQUE ("email")
);

-- CreateTable
CREATE TABLE "ClassesActivities" (
                                     "id" SERIAL PRIMARY KEY,
                                     "classId" INTEGER NOT NULL,
                                     "activitiesId" INTEGER NOT NULL,
                                     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UserActivities" (
                                  "id" SERIAL PRIMARY KEY,
                                  "userId" INTEGER NOT NULL,
                                  "activityId" INTEGER NOT NULL,
                                  "classId" INTEGER NOT NULL,
                                  "status" VARCHAR(10) CHECK ("status" IN ('PENDING', 'COMPLETED')) NOT NULL DEFAULT 'PENDING',
                                  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  "updated_at" TIMESTAMP(3) NOT NULL
);

-- AddForeignKey
ALTER TABLE "Classes"
    ADD CONSTRAINT "Classes_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"
    ADD CONSTRAINT "Users_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"
    ADD CONSTRAINT "Users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassesActivities"
    ADD CONSTRAINT "ClassesActivities_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassesActivities"
    ADD CONSTRAINT "ClassesActivities_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivities"
    ADD CONSTRAINT "UserActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivities"
    ADD CONSTRAINT "UserActivities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivities"
    ADD CONSTRAINT "UserActivities_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
