import React from "react";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params: { id } }: Props) => {
  const property: Property = (await prisma.property.findUnique({
    where: { id: id },
  })) as Property;
  return <div>{property.name}</div>;
};

export default PropertyPage;
