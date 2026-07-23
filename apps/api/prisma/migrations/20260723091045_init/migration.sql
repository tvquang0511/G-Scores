-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "math" DOUBLE PRECISION,
    "literature" DOUBLE PRECISION,
    "foreignLanguage" DOUBLE PRECISION,
    "physics" DOUBLE PRECISION,
    "chemistry" DOUBLE PRECISION,
    "biology" DOUBLE PRECISION,
    "history" DOUBLE PRECISION,
    "geography" DOUBLE PRECISION,
    "civicEducation" DOUBLE PRECISION,
    "foreignLanguageCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_registrationNumber_key" ON "Student"("registrationNumber");
