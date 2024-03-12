import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesForm from "@/app/(private)/user/properties/_components/properties-form/page";
import { prisma } from "@/config/db";
interface Props {
  params: {
    id: string;
  };
}
const EditPropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log(property, "property from edit property page");

  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm initialValues={property} isEdit={true} />
    </div>
  );
};

export default EditPropertyPage;
