-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "plan_json" JSONB NOT NULL,
    "plan_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripProfile" (
    "userId" TEXT NOT NULL,
    "location" VARCHAR(40) NOT NULL,
    "destination" VARCHAR(40) NOT NULL,
    "fromDate" CHAR(10) NOT NULL,
    "toDate" CHAR(10) NOT NULL,
    "numberPersons" INTEGER NOT NULL,
    "numberKids" INTEGER NOT NULL,
    "goal" VARCHAR(30) NOT NULL,
    "budget" VARCHAR(8) NOT NULL,
    "primaryTicket" VARCHAR(18) NOT NULL,
    "accommodationType" VARCHAR(18) NOT NULL,
    "insurance" VARCHAR(18) NOT NULL,
    "comments" VARCHAR(400),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Plans_userId_idx" ON "Plans"("userId");

-- AddForeignKey
ALTER TABLE "Plans" ADD CONSTRAINT "Plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
