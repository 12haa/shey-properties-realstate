"use client";
import React, { useState } from "react";
import { Steps } from "antd";
import Basic from "@/app/(private)/user/properties/_components/properties-form/basic";
import Location from "@/app/(private)/user/properties/_components/properties-form/Location";
import Amenities from "@/app/(private)/user/properties/_components/properties-form/amenities";
import Media from "@/app/(private)/user/properties/_components/properties-form/Media";
import Contact from "@/app/(private)/user/properties/_components/properties-form/Contact";

export interface PropertiesFormStepProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
const PropertiesForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const commonPropsForSteps = {};
  const steps = [
    {
      title: "Basic",
      content: <Basic />,
    },
    {
      title: "Location",
      content: <Location />,
    },
    {
      title: "Amenities",
      content: <Amenities />,
    },
    {
      title: "Media",
      content: <Media />,
    },
    {
      title: "Contact",
      content: <Contact />,
    },
  ];
  return (
    <div>
      <Steps items={steps} current={currentStep} />
      <div className="mt-8 ">{steps[currentStep].content}</div>
    </div>
  );
};

export default PropertiesForm;
