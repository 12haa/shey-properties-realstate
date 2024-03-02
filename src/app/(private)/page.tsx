import { currentUser, UserButton } from "@clerk/nextjs";
import { GetCurrentUserFromMongoDb } from "@/actions/users";
import { randomFillSync } from "node:crypto";

export default async function Home() {
  await GetCurrentUserFromMongoDb();

  return <div className="  ">Home</div>;
}
