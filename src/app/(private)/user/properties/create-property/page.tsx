import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesForm from "@/app/(private)/user/properties/_components/properties-form/page";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";
import { GetCurrentUserFromMongoDb } from "@/actions/users";

const CreatePropertyPage = async ({ searchParams }: { searchParams: any }) => {
  // Handle search params here if needed
  const mongoUser = (await GetCurrentUserFromMongoDb()).data;
  const cloneFrom = searchParams?.cloneFrom || "";
  let property: Property | null = null;
  if (cloneFrom) {
    property = (await prisma.property.findUnique({
      where: {
        id: cloneFrom,
      },
    })) as Property;
  }
  // Cher User Subscription and properties count
  const [userSubscription, propertiesCount] = (await Promise.all([
    prisma.subscription.findFirst({ where: { userId: mongoUser?.id } }),
    prisma.property.count({
      where: {
        userId: mongoUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ])) as any;

  let showForm = true;
  let ErrorMessage = "";

  if (!userSubscription && propertiesCount >= 3) {
    showForm = false;
    ErrorMessage =
      "You have reached the maximum number of properties allowed , please upgrade your plan to create more properties";
  }
  if (userSubscription?.plan?.propertiesCount > propertiesCount) {
    showForm = false;
    ErrorMessage =
      "You have reached the maximum number of properties allowed , please upgrade your plan to create more properties";
  }

  return (
    <div>
      <PageTitle title="Create Property" />
      {showForm ? (
        <PropertiesForm initialValues={property ? property : {}} />
      ) : (
        <div className="text-center">{ErrorMessage}</div>
      )}
    </div>
  );
};
export default CreatePropertyPage;
