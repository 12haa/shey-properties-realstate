"use client";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import {
  furnishingTypes,
  parkingTypes,
  propertyStatus,
  propertyTypes,
} from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { log } from "node:util";

const Filters = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  // Form onFinish Handler
  const onFinish = (values: any) => {
    //   Remove Empty Values
    const formattedData: any = {};
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formattedData[key] = values[key];
      }
    });
    const queryString = new URLSearchParams(formattedData).toString();

    //   Redirect
    router.push(`${pathname}?${queryString}`);
    setShowFiltersModal(false);
  };

  return (
    <>
      <div className=" flex justify-between p-5  border rounded-sm border-solid border-gray-300 mb-5 items-center">
        <div className="flex gap-4">
          {Object.keys(searchParams).length === 0 ? (
            <span className="text-gray-500 text-sm">No Filters Applied.</span>
          ) : (
            <div className="flex flex-wrap gap-5">
              {Object.keys(searchParams).map((key) => (
                //   Also Could Use Tag Component from antd
                <div className="flex justify-center items-center gap-2">
                  <span>Filters :</span>
                  <div className="flex gap-2 p-2 bg-gray-100 rounded-lg border border-dashed">
                    <p>{searchParams[key]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/*Right Side*/}
        <div className="flex gap-5 ">
          <Button onClick={() => router.push(pathname)}>Clear</Button>
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
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={searchParams}
          >
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
              <Form.Item label="Parking" name="parking">
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
