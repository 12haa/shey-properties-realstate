import { GetCurrentUserFromMongoDb } from "@/actions/users";
import { randomFillSync } from "node:crypto";
import Filters from "@/components/Filters";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import PropertiesData from "@/app/(private)/_components/properties-data";

export default async function Home() {
  await GetCurrentUserFromMongoDb();

  return (
    <div className="  ">
      <Filters />
      <Suspense fallback={<Loader />}>
        <PropertiesData />
      </Suspense>
    </div>
  );
}
