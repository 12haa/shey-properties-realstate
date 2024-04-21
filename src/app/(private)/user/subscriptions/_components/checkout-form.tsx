import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { SaveSubscription } from "@/actions/subscriptions";

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
  const router = useRouter();

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
        message.success("Payment Successful!");
        await SaveSubscription({ paymentId: result.paymentIntent.id, plan });
        message.success("Subscription purchased Successfully!");

        router.push("/user/subscriptions");
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
