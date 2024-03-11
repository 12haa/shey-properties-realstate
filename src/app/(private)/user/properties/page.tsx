import React, { Suspense } from "react";
import PageTitle from "@/components/page-title";
import PropertiesTable from "@/app/(private)/user/properties/_components/properties-table";
import LinkButton from "@/components/link-button";
import Filters from "@/components/Filters";
import Loader from "@/components/Loader";

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
      <Filters />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <PropertiesTable />
      </Suspense>
    </div>
  );
};

export default Properties;
