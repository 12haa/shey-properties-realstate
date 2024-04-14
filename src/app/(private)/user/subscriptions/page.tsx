import React from "react";
import PageTitle from "@/components/page-title";
import { subscriptionPlans } from "@/constants";
import { Button } from "antd";
import BuySubscription from "@/app/(private)/user/subscriptions/_components/buy-subscription";

const SubscriptionsPage = () => {
  return (
    <div>
      <PageTitle title="Subscriptions" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {subscriptionPlans.map((plan) => {
          const isSelected = plan.name === "Basic";
          return (
            <div
              className={`flex flex-col gap-5 justify-between p-5 border rounded  border-solid
                ${isSelected ? "border-primary border-2" : "border-gray-300"}`}
            >
              <div className="flex flex-col gap-3 ">
                <h1 className="text-xl font-bold text-primary">{plan.name}</h1>
                <h1 className="text-orange-700 lg:text-5xl md:text-4xl text-xl font-bold  ">
                  ${plan.price}
                </h1>

                <hr />
                <div className="flex flex-col gap-1 ">
                  {plan.features.map((feature) => (
                    <span className="text-gray-500 text-sm">{feature}</span>
                  ))}
                </div>
              </div>
              <BuySubscription plan={plan} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
