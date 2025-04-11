import React from "react";

const PaymentButton = () => {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_XXXXXXXXXXXXXX", // Replace with your Razorpay Test Key
      amount: 100 * 100, // Amount in paise (₹100)
      currency: "INR",
      name: "Dummy Transaction",
      description: "Test Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Pay ₹100
    </button>
  );
};

export default PaymentButton;
