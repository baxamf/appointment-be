-- CreateTable
CREATE TABLE "user_working_day" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "start_hour" INTEGER NOT NULL,
    "start_minute" INTEGER NOT NULL,
    "end_hour" INTEGER NOT NULL,
    "end_minute" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_working_day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_working_day_user_id_idx" ON "user_working_day"("user_id");

-- AddForeignKey
ALTER TABLE "user_working_day" ADD CONSTRAINT "user_working_day_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
