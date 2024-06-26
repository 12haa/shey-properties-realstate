import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { GetCurrentUserFromMongoDb } from "@/actions/users";
import PageTitle from "@/components/page-title";
import { prisma } from "@/config/db";
import { subscriptionPlans } from "@/constants";

const Account = async () => {
  const clerkUser = await currentUser();
  console.log(clerkUser, "clerk user");
  const mongoUser = (await GetCurrentUserFromMongoDb()).data;
  const propertiesCount = await prisma.property.count({
    where: {
      userId: mongoUser?.id,
    },
  });
  // Get User Subscription Data
  const userSubscriptionPlan: any = await prisma.subscription.findFirst({
    where: {
      userId: mongoUser?.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(userSubscriptionPlan, "User Subscription Plan");

  const getSectionTitle = (title: string) => {
    return (
      <div>
        <h1 className="text-xl font-bold text-gray-500">{title}</h1>
        <hr className="border-gray-300 my-2 border-solid" />
      </div>
    );
  };
  const getAttribute = (title: string, value: string) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-700 font-semibold">{title}</span>
        <span className="text-gray-400"> {value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 border-4">
        <span className="font-semibold ">{clerkUser?.firstName}</span>
        <PageTitle title="Dashboard " />
      </div>
      <div className="flex flex-col gap-5">
        {getSectionTitle("Basic Details")}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {getAttribute("Name : ", clerkUser?.firstName || "")}
          {getAttribute(
            "Email : ",
            clerkUser?.emailAddresses[0]?.emailAddress || "",
          )}

          {getAttribute("Properties Posted : ", propertiesCount.toString())}
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        {getSectionTitle("Subscription Details")}
        <div className="grid grid-cols-3 gap-5 ">
          {getAttribute("Plan", userSubscriptionPlan.plan.name || "")}
          {getAttribute("Price", userSubscriptionPlan.plan.price.toString())}
          {getAttribute(
            "Properties Limit",
            userSubscriptionPlan.plan.propertiesLimit.toString(),
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
