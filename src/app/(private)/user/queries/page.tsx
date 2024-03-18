import React from "react";
import PageTitle from "@/components/page-title";
import { prisma } from "@/config/db";
import { GetCurrentUserFromMongoDb } from "@/actions/users";
import UserQueriesTable from "@/app/(private)/user/queries/_components/user-queries-table";

const QueriesPage = async () => {
  const user = await GetCurrentUserFromMongoDb();
  console.log(user);
  const queries = await prisma.query.findMany({
    where: {
      userId: user?.data?.id,
    },
    include: {
      property: true,
    },
  });

  return (
    <div>
      <PageTitle title="Queries" />
      <UserQueriesTable queries={queries} />
    </div>
  );
};

export default QueriesPage;
