import React from "react";
import PageTitle from "@/components/page-title";
import PropertiesTable from "@/app/(private)/user/properties/_components/properties-table";
import LinkButton from "@/components/link-button";

const Properties = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create property"
          path="/user/properties/create-property"
        />
      </div>

      <PropertiesTable />
    </div>
  );
};

export default Properties;
