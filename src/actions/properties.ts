"use server";

import { GetCurrentUserFromMongoDb } from "@/actions/users";

import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";

export const AddProperty = async (property: any) => {
  try {
    const user: any = await GetCurrentUserFromMongoDb();
    console.log(user, "im user from actions file");

    property.userId = user.data.id;

    console.log(property, "im property from actions file 2");
    await prisma.property.create({
      data: property,
    });

    console.log(property, "im property from actions file");
    revalidatePath("/user/properties.tsx");
    return {
      data: property,
      message: "Property Added successfully",
    };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};

export const EditProperty = async (property: any, id: string) => {
  try {
    await prisma.property.update({
      where: {
        id,
      },
      data: property,
    });

    revalidatePath("/user/properties");
    return {
      data: property,
      message: "Property Edited successfully",
    };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};

export const DeleteProperty = async (id: string) => {
  try {
    await prisma.property.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/user/properties");
    return {
      message: "Property Deleted successfully",
    };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
