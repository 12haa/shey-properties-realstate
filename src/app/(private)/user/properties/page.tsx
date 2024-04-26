import React, { Suspense } from "react";
import PageTitle from "@/components/page-title";
import PropertiesTable from "@/app/(private)/user/properties/_components/properties-table";
import LinkButton from "@/components/link-button";
import Filters from "@/components/Filters";
import Loader from "@/components/Loader";

const Properties = ({ searchParams }: { searchParams: any }) => {
  const key = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create property"
          path="/user/properties/create-property"
        />
      </div>
      <Filters searchParams={searchParams} />
      <Suspense
        key={key}
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <PropertiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Properties;
