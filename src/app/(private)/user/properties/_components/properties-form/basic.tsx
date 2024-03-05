import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { propertyStatus, propertyTypes } from "@/constants";

const Basic = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, basic: values });
    setCurrentStep(currentStep + 1);
  };
  return (
    <Form
      layout="vertical"
      initialValues={finalValues.basic}
      onFinish={onFinish}
    >
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 ">
        <Form.Item
          name="name"
          label="Property name"
          rules={[{ required: true, message: "Please input property name!" }]}
          className="col-span-2 lg:col-span-2"
        >
          <Input placeholder="Property Name" name="propertyName" />
        </Form.Item>
        <Form.Item
          name="description "
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input property description!",
            },
          ]}
          className="col-span-1 lg:col-span-3"
        >
          <Input.TextArea placeholder="Property Description" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please select property type!",
            },
          ]}
          className="col-span-1 lg:col-span-2"
        >
          <Select options={propertyTypes} />
        </Form.Item>
        <Form.Item
          name="Status"
          label="status"
          rules={[
            {
              required: true,
              message: "Please select property status!",
            },
          ]}
        >
          <Select options={propertyStatus} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please select property status!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            type="number"
            placeholder="Property Price"
          />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          type="default"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Basic;
