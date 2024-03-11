"use client";
import React from "react";
import { Property } from "@prisma/client";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";

const ClientSidePropertiesTable = ({
  properties,
}: {
  properties: Property[];
}) => {
  const router = useRouter();
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
        return `$${price}`;
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
            <Button size="small">
              <i className="ri-delete-bin-line"></i>
            </Button>
            <Button size="small">
              <i className="ri-file-copy-line"></i>
            </Button>
            <Button
              size="small"
              onClick={() =>
                router.push(`user//properties/edit-property/${record.id}`)
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
      <Table dataSource={properties} columns={columns}></Table>
    </div>
  );
};

export default ClientSidePropertiesTable;
