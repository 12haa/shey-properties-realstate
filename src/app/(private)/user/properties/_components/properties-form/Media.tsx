import React, { useState } from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button, Upload } from "antd";

const Media = ({
  setCurrentStep,
  currentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const [tempFiles, setTempFiles] = useState<any[]>([]);
  const onFinish = () => {
    setFinalValues({
      ...finalValues,
      media: {
        newlyUploadedFiles: tempFiles,
        images: finalValues.media.images,
      },
    });
    setCurrentStep(currentStep + 1);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-5 mb-5">
        {finalValues.media.images.map((image: string) => {
          return (
            <div className="flex flex-col gap-3 border border-dashed border-gray-300 p-5 rounded justify-center items-center">
              <img
                src={image}
                alt="image"
                className="w-20 h-20  rounded object-cover "
              />
              <span
                className="text-red-500 underline text-sm cursor-pointer "
                onClick={() => {
                  let tempMedia = finalValues.media;
                  tempMedia.images = tempMedia.images.filter(
                    (img: string) => img !== image,
                  );
                  setFinalValues({
                    ...finalValues,
                    media: {
                      newlyUploadedFiles: tempFiles,
                      images: tempMedia.images,
                    },
                  });
                }}
              >
                Delete
              </span>
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture-card"
        multiple
        beforeUpload={(file: any) => {
          setTempFiles((prev) => [...prev, file]);
          return false;
        }}
      >
        Upload{" "}
      </Upload>
      <div className="flex justify-end gap-5">
        <Button
          type="default"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary" onClick={onFinish}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Media;
