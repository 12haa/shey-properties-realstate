import { GetCurrentUserFromMongoDb } from "@/actions/users";
import { randomFillSync } from "node:crypto";
import Filters from "@/components/Filters";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import PropertiesData from "@/app/(private)/_components/properties-data";

export default async function Home({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);
  console.log(key, "imKey From home");
  await GetCurrentUserFromMongoDb();

  return (
    <div className="  ">
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
