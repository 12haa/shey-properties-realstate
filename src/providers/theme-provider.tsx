"use client";
import React from "react";
import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1B4242",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: "none",
              colorPrimaryActive: "#1B4242",
              controlOutline: "none",
              colorBorder: "#1B4242",
            },
            Input: {
              controlHeight: 40,
              boxShadow: "none",
              activeShadow: "none",
            },
            Select: {
              controlHeight: 45,
              boxShadow: "none",
              controlOutline: "none",
            },
            InputNumber: {
              controlHeight: 45,
              boxShadow: "none",
              controlOutline: "none",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
};

export default ThemeProvider;
