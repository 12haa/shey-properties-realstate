import React, { useEffect, useState } from "react";
import { Property } from "@prisma/client";
import { message, Modal, Table } from "antd";
import { Query } from "@prisma/client/";
import { GetQueriesByPropertyId } from "@/actions/queries";
import dayjs from "dayjs";

interface Props {
  showQueriesModal: boolean;
  setShowQueriesModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProperty: Property | null;
}

const PropertyQueries = ({
  showQueriesModal,
  setShowQueriesModal,
  selectedProperty,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const response = await GetQueriesByPropertyId(
          selectedProperty?.id as string,
        );
        if (response.error) throw new Error("Error fetching");
        setQueries(response.data as Query[]);
      } catch (error: any) {
        return {
          error: error.message,
        };
      } finally {
        setLoading(false);
      }
    };
    if (selectedProperty)
      fetchQueries().then(() => {
        console.log(queries);
      });
  }, []);

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
    },
    {
      title: "Customer PhoneNumber",
      dataIndex: "phoneNumber",
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
    <Modal
      title={`Queries for ${selectedProperty?.name}`}
      open={showQueriesModal}
      onCancel={() => setShowQueriesModal(false)}
      width={1000}
      footer={null}
    >
      <Table columns={columns} dataSource={queries} loading={loading} />
    </Modal>
  );
};

export default PropertyQueries;
