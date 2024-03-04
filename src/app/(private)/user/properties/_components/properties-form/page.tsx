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
  setCurrentStep: (currentStep: number) => void;
  finalValues: any;
  setFinalValues: (finalValues: any) => void;
}
const PropertiesForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [finalValues, setFinalValues] = useState({
    basic: {},
    location: {},
    amenities: {},
    media: {},
    contact: {},
  });
  const commonPropsForSteps = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
  };
  const steps = [
    {
      title: "Basic",
      content: <Basic {...commonPropsForSteps} />,
    },
    {
      title: "Location",
      content: <Location {...commonPropsForSteps} />,
    },
    {
      title: "Amenities",
      content: <Amenities {...commonPropsForSteps} />,
    },
    {
      title: "Media",
      content: <Media {...commonPropsForSteps} />,
    },
    {
      title: "Contact",
      content: <Contact {...commonPropsForSteps} />,
    },
  ];
  return (
    <div>
      <Steps items={steps} current={currentStep} />
      <div className="mt-8 ">{steps[currentStep].content} </div>
    </div>
  );
};

export default PropertiesForm;
