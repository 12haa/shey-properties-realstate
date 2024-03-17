"use server";

import { GetCurrentUserFromMongoDb } from "@/actions/users";
import { prisma } from "@/config/db";

export const AddQuery = async (query: any) => {
  console.log(query, "im query2 from actions");

  try {
    const user = await GetCurrentUserFromMongoDb();
    console.log(user, "im user from actions file Add Query");
    query.userId = user?.data?.id;
    await prisma.query.create({
      data: query,
    });
    console.log(query, "im query2 from actions");
    return {
      success: true,
      message: "Query Added successfully",
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      error: err.message,
    };
  }
};
