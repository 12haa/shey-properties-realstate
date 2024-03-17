"use client";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import { AddQuery } from "@/actions/queries";

const QueryModal = ({ propertyId }: { propertyId: string }) => {
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await AddQuery({ ...values, propertyId });
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        message.success("Query added successfully");
        setShowQueryModal(false);
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Button className="" block onClick={() => setShowQueryModal(true)}>
        More Info
      </Button>

      {showQueryModal && (
        <Modal
          open={showQueryModal}
          onCancel={() => setShowQueryModal(false)}
          title="Send a query to the owenr"
          centered
          width={600}
          footer={null}
        >
          <Form
            layout="vertical"
            name="query-form"
            onFinish={onFinish}
            className="flex flex-col gap-5"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
              name="name"
              label="Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your quote amount",
                },
              ]}
              name="qouteAmount"
              label="Qoute Amount"
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your message",
                },
              ]}
              name="message"
              label="Message"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Your Contact"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number",
                  },
                ]}
              >
                <Input className="w-full" placeholder="Enter Your Email" />
              </Form.Item>
            </Form.Item>
            <div className="flex justify-end gap-2 rounded-md">
              <Button className="mt-7" htmlType="submit" loading={loading}>
                Send
              </Button>
              <Button
                type="primary"
                className="mt-7"
                htmlType="button"
                onClick={() => setShowQueryModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default QueryModal;
