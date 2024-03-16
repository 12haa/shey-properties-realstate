import React from "react";
import { prisma } from "@/config/db";
import ClientSidePropertiesTable from "@/app/(private)/user/properties/_components/properties-form/properties-table-clientside";
import { GetCurrentUserFromMongoDb } from "@/actions/users";

const PropertiesTable = async () => {
  const user = await GetCurrentUserFromMongoDb();
  const properties = await prisma.property.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      userId: user?.data?.id,
    },
  });
  console.log(properties);
  return (
    <div>
      <ClientSidePropertiesTable properties={properties} />
    </div>
  );
};

export default PropertiesTable;
