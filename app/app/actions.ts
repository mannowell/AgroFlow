"use server";

// import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { revalidatePath } from "next/cache";

export async function createBatch(formData: FormData) {
  // const session = await auth();
  // if (!session?.user?.id) throw new Error("Unauthorized");
  const mockUserId = "mock-id"; 

  const name = formData.get("name") as string;
  const initialQuantity = parseInt(formData.get("initialQuantity") as string);
  const initialAvgWeight = parseFloat(formData.get("initialAvgWeight") as string);

  await prisma.batch.create({
    data: {
      name,
      initialQuantity,
      initialAvgWeight,
      userId: mockUserId,
    },
  });

  revalidatePath("/app");
}

export async function addWeeklyLog(batchId: string, formData: FormData) {
  // const session = await auth();
  // if (!session?.user?.id) throw new Error("Unauthorized");

  const weekNumber = parseInt(formData.get("weekNumber") as string);
  const feedConsumed = parseFloat(formData.get("feedConsumed") as string);
  const deaths = parseInt(formData.get("deaths") as string);
  const currentAvgWeight = parseFloat(formData.get("currentAvgWeight") as string);

  await prisma.weeklyLog.create({
    data: {
      batchId,
      weekNumber,
      feedConsumed,
      deaths,
      currentAvgWeight,
    },
  });

  revalidatePath("/app");
}
