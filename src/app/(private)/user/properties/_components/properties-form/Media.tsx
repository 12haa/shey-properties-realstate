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
