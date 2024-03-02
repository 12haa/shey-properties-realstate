import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesForm from "@/app/(private)/user/properties/_components/properties-form/page";

const CreatePropertyPage = () => {
  return (
    <div>
      <PageTitle title="Create Property" />
      <PropertiesForm />
    </div>
  );
};

export default CreatePropertyPage;
