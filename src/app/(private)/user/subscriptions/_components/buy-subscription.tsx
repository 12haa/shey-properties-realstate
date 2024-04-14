"use client";
import React from "react";
import { Button } from "antd";

const BuySubscription = ({ plan }: { plan: any }) => {
  return (
    <div>
      <Button block disabled={plan.price === 0} type="primary" size="large">
        Buy Now
      </Button>
    </div>
  );
};

export default BuySubscription;
