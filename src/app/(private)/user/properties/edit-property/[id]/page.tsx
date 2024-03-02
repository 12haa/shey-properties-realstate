import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesForm from "@/app/(private)/user/properties/_components/properties-form/page";

const EditPropertyPage = () => {
  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm />
    </div>
  );
};

export default EditPropertyPage;
