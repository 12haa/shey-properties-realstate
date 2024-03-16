import React from "react";
import { prisma } from "@/config/db";
import { Property } from "@prisma/client";
import LinkButton from "@/components/link-button";
import { Carousel } from "antd";
import QueryModal from "@/app/(private)/property/_components/query-modal";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params: { id } }: Props) => {
  const property: Property = (await prisma.property.findUnique({
    where: { id: id },
  })) as Property;

  const getAttributesDetails = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }) => {
    return (
      <div className="flex justify-between">
        <span className="text-sm text-gray-600 font-semibold">{name}</span>
        <span className="text-md  text-black">{value}</span>
      </div>
    );
  };

  const getSectionTitle = (title: string) => {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
        <hr className="border border-solid border-gray-300  my-2" />
      </div>
    );
  };

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
                  className="w-full h-96 lg:h-[550px] object-cover rounded"
                />
              </div>
            ))}
          </Carousel>
          <h1 className="text-2xl font-bold text-gray-700 mt-7">
            ${property.price} -- {property.status}
          </h1>
          <p className="text-sm text-gray-600 mb-2">{property.description}</p>
        </div>
        {/*Property Info*/}
        <div className="border border-solid border-gray-300 rounded p-5 gap-4">
          <div className="flex flex-col gap-1 ">
            {getSectionTitle("Amenities")}
            {getAttributesDetails({
              name: "Bedrooms",
              value: property.bedrooms,
            })}
            {getAttributesDetails({
              name: "Bathrooms",
              value: property.bathrooms,
            })}
            {getAttributesDetails({
              name: "Area",
              value: property.area,
            })}
            {getAttributesDetails({
              name: "Parking",
              value: property.parking,
            })}
            {getAttributesDetails({
              name: "Pool",
              value: property.balconies,
            })}
            {getAttributesDetails({
              name: "Status",
              value: property.status,
            })}
            {getAttributesDetails({
              name: "Price",
              value: property.price,
            })}
            {getAttributesDetails({
              name: "Furnishing",
              value: property.furnishing,
            })}
            {getAttributesDetails({
              name: "Age",
              value: property.age,
            })}
          </div>
          <div className="flex flex-col gap-1 ">
            {getSectionTitle("Address")}
            {getAttributesDetails({
              name: "City",
              value: property.city,
            })}
            {getAttributesDetails({
              name: "Landmark ",
              value: property.landmark,
            })}
            {getAttributesDetails({
              name: "Pincode",
              value: property.pincode,
            })}
            {getAttributesDetails({
              name: "Address",
              value: property.address,
            })}
          </div>
          <div className="flex flex-col gap-1 ">
            {getSectionTitle("Owner Details")}
            {property.showOwnerContact ? (
              <div className="gap-4">
                {getAttributesDetails({
                  name: "Name",
                  value: property.ownerName,
                })}
                {getAttributesDetails({
                  name: "Owner Email",
                  value: property.ownerEmail,
                })}
                {getAttributesDetails({
                  name: "Owner Phone Number",
                  value: property.phoneNumber,
                })}
              </div>
            ) : (
              <p>Owner Has Chosen not to show their info.</p>
            )}

            <QueryModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
