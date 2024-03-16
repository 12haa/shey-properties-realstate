"use client";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const LinkButton = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter();
  return (
    // 使用Ant Design的Button组件
    <Button
      type="default"
      onClick={() => router.push(path)}
      className="rounded-md"
    >
      {title}
    </Button>
  );
};

export default LinkButton;
