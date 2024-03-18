"use client";
import React from "react";
import { Query } from "@prisma/client/";
import { Property } from "@prisma/client";
import dayjs from "dayjs";
import { Table } from "antd";

const UserQueriesTable = ({ queries }: { queries: Query[] }) => {
  const columns = [
    {
      title: "Property",
      dataIndex: "property",
      render: (property: Property) => property.name,
    },

    {
      title: "Quote Amount",
      dataIndex: "qouteAmount",
      render: (quoteAmount: number) => `$ ${quoteAmount}`,
    },

    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD/MM/YYYY hh:mm:ss"),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={queries} />
    </div>
  );
};

export default UserQueriesTable;
