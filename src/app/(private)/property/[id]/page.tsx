import React from "react";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";
import LinkButton from "@/components/link-button";
import { Carousel } from "antd";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params: { id } }: Props) => {
  const property: Property = (await prisma.property.findUnique({
    where: { id: id },
  })) as Property;
  return (
    <div>
      <LinkButton path="/" title="Back to properties" />

      <h1 className="text-2xl font-bold text-primary"> {property.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/*Property Image*/}
        <div className="col-span-2">
          <Carousel autoplay>
            {property.images.map((image) => (
              <div key={image}>
                <img
                  src={image}
                  alt={image}
                  className="w-full h-96 lg:h-[450px] object-cover rounded"
                />
              </div>
            ))}
          </Carousel>
          <p className="text-sm text-gray-600 mt-7">{property.description}</p>
        </div>
        {/*Property Info*/}
        <div></div>
      </div>
    </div>
  );
};

export default PropertyPage;
