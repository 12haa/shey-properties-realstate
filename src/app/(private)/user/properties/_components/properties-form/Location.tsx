import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Form, Input, InputNumber, Select } from "antd";

const Location = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({
      ...finalValues,
      location: values,
    });

    setCurrentStep(currentStep + 1);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1">
          <Form.Item
            label="city"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city",
              },
            ]}
          >
            <Input
              placeholder="City"
              value={finalValues.location?.city}
              onChange={(e) =>
                setFinalValues({
                  ...finalValues,
                  location: {
                    ...finalValues.location,
                    city: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
        </div>
        <div className=" col-span1 lg:col-span-3">
          <Form.Item
            label="pincode"
            name="pincode"
            rules={[
              {
                required: true,
                message: "Please input your Pincode",
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Pincode"
              value={finalValues.location?.pincode}
            />
          </Form.Item>
        </div>
        <div className="col-span1 lg:col-span-3">
          <Form.Item
            label="landmark"
            name="landmark"
            rules={[
              {
                required: true,
                message: "Please input your landmark",
              },
            ]}
          >
            <Input
              placeholder="Landmark"
              value={finalValues.location?.landmark}
              onChange={(e) =>
                setFinalValues({
                  ...finalValues,
                  location: {
                    ...finalValues.location,
                    landmark: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <Form.Item
            label="address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address",
              },
            ]}
          >
            <Input
              placeholder="Address"
              value={finalValues.location?.address}
              onChange={(e) =>
                setFinalValues({
                  ...finalValues,
                  location: {
                    ...finalValues.location,
                    address: e.target.value,
                  },
                })
              }
              className="col-span1 lg:col-span-3"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          type="default"
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

export default Location;
