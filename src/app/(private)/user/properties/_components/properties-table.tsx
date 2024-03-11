import React from "react";
import { prisma } from "@/config/db";
import ClientSidePropertiesTable from "@/app/(private)/user/properties/_components/properties-form/properties-table-clientside";

const PropertiesTable = async () => {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
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
