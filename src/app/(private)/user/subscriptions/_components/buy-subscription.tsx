"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GetStripeClientSecret } from "@/actions/payments";
import CheckoutForm from "@/app/(private)/user/subscriptions/_components/checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);
const BuySubscription = ({ plan }: { plan: any }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false);
  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await GetStripeClientSecret(plan.price);
      if (response.error) throw new Error(response.error);
      console.log(response, " im response");
      setClientSecret(response.clientSecret);
      setShowCheckoutForm(true);
    } catch (err: any) {
      return {
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        block
        disabled={plan.price === 0}
        type="primary"
        size="large"
        onClick={getClientSecret}
        loading={loading}
      >
        Buy Now
      </Button>
      {clientSecret && showCheckoutForm && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            plan={plan}
          />
        </Elements>
      )}
    </div>
  );
};

export default BuySubscription;
