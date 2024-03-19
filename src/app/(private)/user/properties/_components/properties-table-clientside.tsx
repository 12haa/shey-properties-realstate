"use client";
import React, { useState } from "react";
import { Property } from "@prisma/client";
import { Button, message, Table } from "antd";
import { useRouter } from "next/navigation";

import { DeleteProperty } from "@/actions/properties";
import PropertyQueries from "@/app/(private)/user/properties/_components/property-queries";

const ClientSidePropertiesTable = ({
  properties,
}: {
  properties: Property[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showQueries, setShowQueries] = useState<boolean>(false);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const router = useRouter();
  //log Property Delete Function
  console.log(showQueries);
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await DeleteProperty(id);
      if (response.error) throw new Error("Something went wrong");
      message.success(response.message);
    } catch (err: any) {
      return {
        message: err.message,
      };
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render(price: number) {
        return `$ ${price}`;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render(createdAt: Date) {
        return new Date(createdAt).toLocaleDateString();
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render(value: any, record: Property) {
        return (
          <div className="flex gap-5">
            <Button
              size="small"
              onClick={() => {
                setShowQueries(true);
                setSelectedProperty(record);
              }}
            >
              Queries
            </Button>
            <Button size="small" onClick={() => onDelete(record.id)}>
              <i className="ri-delete-bin-line"></i>
            </Button>
            <Button
              size="small"
              onClick={() =>
                router.push(
                  `user/properties/create-property?cloneFrom=${record.id}`,
                )
              }
            >
              <i className="ri-file-copy-line"></i>
            </Button>
            <Button
              size="small"
              onClick={() =>
                router.push(`properties/edit-property/${record.id}`)
              }
            >
              <i className="ri-pencil-line"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="capitalize">
      <Table
        dataSource={properties}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      {setShowQueries ? (
        <PropertyQueries
          showQueriesModal={showQueries}
          setShowQueriesModal={setShowQueries}
          selectedProperty={selectedProperty}
        />
      ) : null}
    </div>
  );
};

export default ClientSidePropertiesTable;
