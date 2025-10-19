import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function PaymentForm({ clientSecret, form }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      navigate("/success-payment")
      // navigate("/success-payment", {
      //   state: {
      //     amount: form.amount || paymentIntent.amount,
      //     message: form.message || "Thanh toán thành công",
      //   },
      // });
      toast.success("Thanh toán thành công!");
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="border p-3 rounded-lg bg-white shadow-sm">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Xác nhận thanh toán
      </button>
    </form>
  );
}

export default PaymentForm;
