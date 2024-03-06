import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Form, Input, Select } from "antd";

const Contact = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    const tempFinalValues = { ...finalValues, contact: values };

    console.log(tempFinalValues);
  };
  return (
    <Form
      name="contact"
      layout="vertical"
      initialValues={finalValues.contact}
      onFinish={onFinish}
    >
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
        <Form.Item
          label="ownerName"
          name="Owner Name"
          rules={[
            {
              required: true,
              message: "Please input your Owner Name!",
            },
          ]}
        >
          <Input placeholder="Owner Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="ownerEmail"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Form.Item name="ownerEmail" noStyle>
            <Input type="email" placeholder="Email" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        {/*  owner contact*/}
        <Form.Item
          label="showOwnerContact"
          name="show owner contact"
          rules={[
            {
              required: true,
              message: "Please input your Owner Contact!",
            },
          ]}
        >
          <Select
            placeholder="Show Owner Contact"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          type="default"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Contact;
