-- CreateTable
CREATE TABLE "public"."TestConnection" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "TestConnection_pkey" PRIMARY KEY ("id")
);
