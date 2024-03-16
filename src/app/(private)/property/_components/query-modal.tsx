"use client";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";

const QueryModal = ({ propertyId }: { propertyId: string }) => {
  const onFinish = async (values: any) => {};

  const [showQueryModal, setShowQueryModal] = useState(false);
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
              <Input />
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
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
              >
                <Input type="email" placeholder="Enter Your Email" />
              </Form.Item>
            </Form.Item>
            <div className="flex justify-end gap-2 rounded-md">
              <Button className="mt-7" htmlType="submit">
                Send
              </Button>
              <Button
                type="primary"
                className="mt-7"
                htmlType="button"
                onClick={() => setShowQueryModal(false)}
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
