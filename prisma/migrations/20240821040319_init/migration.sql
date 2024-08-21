-- CreateTable
CREATE TABLE "Levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "levelId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Classes_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classId" INTEGER NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Users_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "file" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Classes_levelId_key" ON "Classes"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userTypeId_key" ON "Users"("userTypeId");
