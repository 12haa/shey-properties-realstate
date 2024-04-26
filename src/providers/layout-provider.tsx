"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { GetCurrentUserFromMongoDb } from "@/actions/users";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader";
import { Button, Dropdown } from "antd";
import { useRouter } from "next/navigation";

const userMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/user/properties",
  },
  {
    name: "Account",
    path: "/user/account",
  },
  {
    name: "Subscriptions",
    path: "/user/subscriptions",
  },
  {
    name: "Queries",
    path: "/user/queries",
  },
];
const adminMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/admin/properties",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
];
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [menuToShow, setMenuToShow] = useState(userMenu);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const isPublicRoute = ["/sign-in", "/sign-up"].includes(
    pathname.split("/")[1],
  );
  const isAdminRoute = pathname.split("/")[1] === "admin";
  const router = useRouter();

  const getHeader = () => {
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-3 flex justify-between items-center rounded-b">
          <h1 className="text-2xl text-white font-bold">Shey</h1>
          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <Dropdown
              menu={{
                items: menuToShow.map((item: any, index) => ({
                  key: index.toString(),
                  label: item.name,
                  onClick: () => {
                    router.push(item.path);
                  },
                })),
              }}
            >
              <Button type="link" className="text-primary hover:text-primary">
                {currentUser?.username}
              </Button>
            </Dropdown>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };
  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) return <Loader />;
    if (isAdminRoute && !currentUser?.isAdmin)
      return (
        <div className="py-5 lg:px-20 px-5 text-center text-gray-500 font-semibold">
          You are no authorized to view this page
        </div>
      );
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };
  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDb();
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        setCurrentUser(response.data);
        if (response.data.isAdmin) {
          setMenuToShow(adminMenu);
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isPublicRoute) getCurrentUser().then(() => console.log("done"));
  }, []);

  return (
    <div className="">
      {getHeader()}
      {getContent()}
    </div>
  );
};

export default LayoutProvider;
