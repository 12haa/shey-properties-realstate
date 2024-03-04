import React from "react";
import { PropertiesFormStepProps } from "@/app/(private)/user/properties/_components/properties-form/page";
import { Button } from "antd";

const Amenities = ({
  currentStep,
  setCurrentStep,
}: PropertiesFormStepProps) => {
  return (
    <div className="flex justify-end gap-5">
      <Button
        disabled={currentStep === 0}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </Button>
      <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
        Next
      </Button>
    </div>
  );
};

export default Amenities;
