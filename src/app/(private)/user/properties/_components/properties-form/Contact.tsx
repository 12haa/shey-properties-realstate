import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Form, Input, message, Select } from "antd";
import { UploadFilesToFireBaseAndReturnURLs } from "@/helpers/upload-media";
import { AddProperty, EditProperty } from "@/actions/properties";
import { useParams, useRouter } from "next/navigation";

const Contact = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
  loading,
  setLoading,
  isEdit = false,
}: PropertiesFormStepProps) => {
  const { id }: any = useParams();
  console.log(id, "id");

  const onFinish = async (values: any) => {
    try {
      const tempFinalValues = { ...finalValues, contact: values };
      console.log(finalValues, "final values");
      // Handling Media Upload
      const tempMedia = tempFinalValues.media;
      const newImagesUrls = await UploadFilesToFireBaseAndReturnURLs(
        tempMedia.newlyUploadedFiles,
      );
      tempMedia.images = [...tempMedia.images, ...newImagesUrls];
      tempFinalValues.medaia = tempMedia;
      const valuesAsPerDb = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        ...tempFinalValues.contact,
        ...tempFinalValues.amenities,
        images: tempFinalValues.media.images,
      };
      let response = null;
      if (isEdit) {
        console.log(response, "response 1");

        response = await EditProperty(valuesAsPerDb, id);
        console.log(response, "response 2");
      } else {
        response = await AddProperty(valuesAsPerDb);
      }
      if (response.error) throw new Error(response.error);
      message.success(response.data.message);
      router.push("/user/properties");
    } catch (err: any) {
      console.log(err, "im ERRRRRRORORORO");
      throw new Error(err.message);
    }
  };
  const router = useRouter();
  return (
    <Form
      name="contact"
      layout="vertical"
      initialValues={finalValues.contact}
      onFinish={onFinish}
    >
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
        <Form.Item
          name="ownerName"
          label="ownerName"
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
          name="showOwnerContact"
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
        <Button type="primary" htmlType="submit">
          Save Property
        </Button>
      </div>
    </Form>
  );
};

export default Contact;
