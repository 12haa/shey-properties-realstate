import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Form, Input, Select } from "antd";
import { propertyTypes } from "@/constants";

const Basic = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, basic: values });
  };
  setCurrentStep(currentStep + 1);

  return (
    <Form layout="vertical" initialValues={finalValues.basic}>
      <div className="grid lg:grid-cols-3 grid-cols-1 ">
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
      </div>
      <div className="flex justify-end gap-5">
        <Button
          type="default"
          disabled={currentStep === 0}
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

export default Basic;
