"use server";
import { prisma } from "@/config/db";
import { GetCurrentUserFromMongoDb } from "@/actions/users";

export const SaveSubscription = async ({
  paymentId,
  plan,
}: {
  paymentId: string;
  plan: string;
}) => {
  try {
    const user = await GetCurrentUserFromMongoDb();
    const payload: any = {
      paymentId,
      plan,
      userId: user?.data?.id,
    };
    await prisma.subscription.create({
      data: payload,
    });
    return {
      message: "Subscription Saved Successfully",
    };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
