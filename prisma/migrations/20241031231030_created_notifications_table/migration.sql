-- CreateTable
CREATE TABLE "Notifications" (
                                 "id" SERIAL PRIMARY KEY,
                                 "classId" INTEGER NOT NULL,
                                 "notificationType" VARCHAR(10) CHECK ("notificationType" IN ('ALERT', 'MESSAGE')) NOT NULL,
                                 "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 "updated_at" TIMESTAMP(3) NOT NULL
);

-- AddForeignKey
ALTER TABLE "Notifications"
    ADD CONSTRAINT "Notifications_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
