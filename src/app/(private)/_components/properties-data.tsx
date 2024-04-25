import React from "react";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const PropertiesData = async ({ searchParams }: { searchParams: any }) => {
  const properties: Property[] = await prisma.property.findMany({
    where: searchParams,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7  lg:grid-cols-3">
      {properties.map((property) => (
        <div className="border rounded border-solid border-gray-300 overflow-hidden">
          <img
            src={property.images[0]}
            alt="property"
            className="w-full h-60 object-cover rounded-t property-main-image  cursor-pointer"
          />
          <div className="p-3 flex flex-col ">
            <span className="text-sm text-primary font-semibold">
              {property.name}
            </span>
            <span className="text-gray-500 text-xs">
              {property.city}, {property.landmark}
            </span>
          </div>
          <div className="p-4 bg-gray-100 flex justify-between items-center rounded-b">
            <span className="text-primary text-xl font-bold   ">
              ${property.price}
            </span>

            <Link
              className="no-underline text-sm text-primary font-bold"
              href={`property/${property.id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertiesData;
