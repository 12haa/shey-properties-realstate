"use client";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import {
  furnishingTypes,
  parkingTypes,
  propertyStatus,
  propertyTypes,
} from "@/constants";
import { log } from "node:util";

const Filters = () => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  // Form onFinish Handler
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className=" flex justify-between p-5  border rounded-sm border-solid border-gray-300 mb-5 items-center">
        <div className="flex gap-4">
          <span className="text-sm text-gray-600">No Filters Applied</span>
        </div>
        {/*Right Side*/}
        <div className="flex gap-5 ">
          <Button className="">Clear</Button>
          <Button
            type="primary"
            className=""
            onClick={() => setShowFiltersModal((prevState) => !prevState)}
          >
            Show Filters
          </Button>
        </div>
      </div>

      {/*FILTERS MODAL*/}

      {showFiltersModal && (
        <Modal
          title={
            <h1 className=" text-center text-primary text-xl font-semibold uppercase">
              Apply filters
            </h1>
          }
          open={showFiltersModal}
          onCancel={() => setShowFiltersModal(false)}
          centered
          width={800}
          footer={null}
        >
          <Form onFinish={onFinish} layout="vertical">
            {/* Form Items */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <Form.Item label="PropertyType" name="type">
                <Select options={propertyTypes} />
              </Form.Item>
              <Form.Item label="Rent Or Sale" name="status">
                <Select options={propertyStatus} />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input placeholder="City" />
              </Form.Item>
              {/*Create and antd FormItem for age*/}
              <Form.Item label="Age" name="age">
                <InputNumber placeholder="Age" />
              </Form.Item>

              <Form.Item label="Furnishing" name="furnishing">
                <Select options={furnishingTypes} />
              </Form.Item>
              <Form.Item label="Parking" name="Parking">
                <Select options={parkingTypes} />
              </Form.Item>
            </div>
            <div className="mt-7 flex gap-5 justify-end">
              <Button onClick={() => setShowFiltersModal(false)} type="default">
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Filters;
