import React from "react";
import { Modal } from "antd";
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
  return (
    <Modal
      title="Complete Your Subscription Purchase"
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
      footer={null}
      width={600}
    ></Modal>
  );
};

export default CheckoutForm;
