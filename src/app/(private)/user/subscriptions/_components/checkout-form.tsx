import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface Props {
  plan: any;
  showCheckoutForm: boolean;
  setShowCheckoutForm: any;
}

const CheckoutForm = ({
  plan,
  showCheckoutForm,
  setShowCheckoutForm,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  // Stripe Handle Submit Event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://localhost:3000/user/subscriptions",
        },
        redirect: "if_required",
      });

      if (result.error) {
        console.log(result.error.message);
        return {
          error: result.error.message,
        };
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        message.success("Payment Successful!");
      }
      setShowCheckoutForm(false);
    } catch (err: any) {
      return {
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Complete Your Subscription Purchase"
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit} className="mt-7">
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
          }}
        />
        <div className="flex justify-end mt-4 gap-5">
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
          <Button onClick={() => setShowCheckoutForm(false)}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
