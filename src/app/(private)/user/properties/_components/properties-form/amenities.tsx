import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Input, Select, InputNumber, Form } from "antd";
import { facingTypes, parkingTypes, furnishingTypes } from "@/constants";

const Amenities = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };

  // bedrooms , bathrooms , furnishing , balconies , parking , floors , area , facing , age
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.amenities}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bedrooms"
          label="Bedrooms"
          rules={[
            {
              required: true,
              message: "Please input the number of bedrooms",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Bedrooms" />
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="Bathrooms"
          rules={[
            {
              required: true,
              message: "Please input the number of bathrooms",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Bathrooms" />
        </Form.Item>
        <Form.Item
          name="furnishing"
          label="Furnishing"
          rules={[
            {
              required: true,
              message: "Please select the furnishing",
            },
          ]}
        >
          <Select
            className="w-full "
            placeholder="Bathrooms"
            options={furnishingTypes}
          />
        </Form.Item>
        <Form.Item
          name="balconies"
          label="Balconies"
          rules={[
            {
              required: true,
              message: "Please input the number of balconies",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Balconies" />
        </Form.Item>
        <Form.Item
          name="parking"
          label="Parking"
          rules={[
            {
              required: true,
              message: "Please select the parking",
            },
          ]}
        >
          <Select className="w-full " options={parkingTypes} />
        </Form.Item>
        <Form.Item
          name="floors"
          label="Floors"
          rules={[
            {
              required: true,
              message: "Please input the number of floors",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Floors" />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[
            {
              required: true,
              message: "Please input the area",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Area" />
        </Form.Item>
        <Form.Item
          name="facing"
          label="Facing"
          rules={[
            {
              required: true,
              message: "Please select the facing",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Bathrooms" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input the age",
            },
          ]}
        >
          <InputNumber className="w-full " placeholder="Age" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Amenities;
