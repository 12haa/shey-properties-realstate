import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesForm from "@/app/(private)/user/properties/_components/properties-form/page";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";

const CreatePropertyPage = async ({ searchParams }: { searchParams: any }) => {
  // Handle search params here if needed
  const cloneFrom = searchParams?.cloneFrom || "";
  let property: Property | null = null;
  if (cloneFrom) {
    property = (await prisma.property.findUnique({
      where: {
        id: cloneFrom,
      },
    })) as Property;
  }
  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm initialValues={property ? property : {}} />
    </div>
  );
};
export default CreatePropertyPage;
