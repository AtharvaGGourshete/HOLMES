import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [subOption, setSubOption] = useState("");
  const [proceed, setProceed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(`Payment Successful! Token: ${token.id}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Accomodation Cost</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Payment Method:</label>
        <select
          value={selectedMethod}
          onChange={(e) => {
            setSelectedMethod(e.target.value);
            setSubOption(""); 
            setProceed(false); 
          }}
          className="w-full p-2 border rounded-md"
        >
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
          <option value="wallet">Wallet</option>
        </select>
      </div>

      
      {selectedMethod === "card" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Card Type:</label>
          <select
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="rupay">RuPay</option>
          </select>
        </div>
      )}

      {selectedMethod === "upi" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Select UPI App:</label>
          <select
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="googlepay">Google Pay</option>
            <option value="phonepe">PhonePe</option>
            <option value="paytm">Paytm</option>
          </select>
          {subOption && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="mt-2 p-2 border rounded-md w-full"
            />
          )}
        </div>
      )}

      {selectedMethod === "netbanking" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Bank:</label>
          <select
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
          </select>
        </div>
      )}

      {selectedMethod === "wallet" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Wallet:</label>
          <select
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="paytm">Paytm Wallet</option>
            <option value="amazonpay">Amazon Pay</option>
            <option value="mobikwik">Mobikwik</option>
          </select>
        </div>
      )}

      
      <button
        onClick={() => setProceed(true)}
        disabled={!subOption && selectedMethod !== "card"}
        className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        Proceed to Payment
      </button>

      
      {proceed && selectedMethod === "card" && (
        <form onSubmit={handleSubmit} className="mt-4">
          <CardElement className="p-2 border rounded-md" />
          <button
            type="submit"
            disabled={!stripe || loading}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Pay ₹100"}
          </button>
        </form>
      )}

      
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default PaymentForm;

// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const PaymentForm = ({ cartItems, totalAmount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedMethod, setSelectedMethod] = useState("card");
//   const [subOption, setSubOption] = useState("");
//   const [proceed, setProceed] = useState(false);
//   const [transactionId, setTransactionId] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     const cardElement = elements.getElement(CardElement);
//     const { error, token } = await stripe.createToken(cardElement);

//     if (error) {
//       setMessage(error.message);
//     } else {
//       setMessage("Payment Successful!");
//       setTransactionId(token.id);
//       setPaymentSuccess(true);
//     }

//     setLoading(false);
//   };

//   const handlePrint = () => {
//     window.print(); // Opens the print dialog for downloading/printing the receipt.
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-4">Stripe Payment</h2>

//       {!paymentSuccess ? (
//         <>
//           {/* Payment Method Selection */}
//           <div className="mb-4">
//             <label className="block font-medium mb-2">Select Payment Method:</label>
//             <select
//               value={selectedMethod}
//               onChange={(e) => {
//                 setSelectedMethod(e.target.value);
//                 setSubOption("");
//                 setProceed(false);
//               }}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="card">Credit / Debit Card</option>
//               <option value="upi">UPI</option>
//               <option value="netbanking">Net Banking</option>
//               <option value="wallet">Wallet</option>
//             </select>
//           </div>

//           {/* Sub-options based on Payment Method */}
//           {selectedMethod === "card" && (
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Select Card Type:</label>
//               <select
//                 value={subOption}
//                 onChange={(e) => setSubOption(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="visa">Visa</option>
//                 <option value="mastercard">MasterCard</option>
//                 <option value="rupay">RuPay</option>
//               </select>
//             </div>
//           )}

//           {selectedMethod === "upi" && (
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Select UPI App:</label>
//               <select
//                 value={subOption}
//                 onChange={(e) => setSubOption(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="googlepay">Google Pay</option>
//                 <option value="phonepe">PhonePe</option>
//                 <option value="paytm">Paytm</option>
//               </select>
//               {subOption && (
//                 <input
//                   type="text"
//                   placeholder="Enter UPI ID"
//                   className="mt-2 p-2 border rounded-md w-full"
//                 />
//               )}
//             </div>
//           )}

//           {selectedMethod === "netbanking" && (
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Select Bank:</label>
//               <select
//                 value={subOption}
//                 onChange={(e) => setSubOption(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="sbi">State Bank of India</option>
//                 <option value="hdfc">HDFC Bank</option>
//                 <option value="icici">ICICI Bank</option>
//                 <option value="axis">Axis Bank</option>
//               </select>
//             </div>
//           )}

//           {selectedMethod === "wallet" && (
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Select Wallet:</label>
//               <select
//                 value={subOption}
//                 onChange={(e) => setSubOption(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="paytm">Paytm Wallet</option>
//                 <option value="amazonpay">Amazon Pay</option>
//                 <option value="mobikwik">Mobikwik</option>
//               </select>
//             </div>
//           )}

//           {/* Proceed to Payment Button */}
//           <button
//             onClick={() => setProceed(true)}
//             disabled={!subOption && selectedMethod !== "card"}
//             className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
//           >
//             Proceed to Payment
//           </button>

//           {/* Payment Form for Card */}
//           {proceed && selectedMethod === "card" && (
//             <form onSubmit={handleSubmit} className="mt-4">
//               <CardElement className="p-2 border rounded-md" />
//               <button
//                 type="submit"
//                 disabled={!stripe || loading}
//                 className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
//               >
//                 {loading ? "Processing..." : `Pay ₹${totalAmount}`}
//               </button>
//             </form>
//           )}

//           {/* Display Message after Payment */}
//           {message && <p className="mt-2 text-green-600">{message}</p>}
//         </>
//       ) : (
//         <>
//           {/* Receipt Section */}
//           <div className="mt-4 p-4 border rounded bg-gray-100">
//             <h3 className="text-lg font-bold mb-2">Payment Receipt</h3>
//             <p><strong>Transaction ID:</strong> {transactionId}</p>
//             <p><strong>Payment Method:</strong> {selectedMethod} {subOption && `(${subOption})`}</p>
//             <p><strong>Total Amount Paid:</strong> ₹{totalAmount}</p>

//             <h4 className="text-md font-semibold mt-3">Purchased Items:</h4>
//             <ul className="list-disc ml-5">
//               {cartItems.map((item, index) => (
//                 <li key={index}>{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</li>
//               ))}
//             </ul>

//             {/* Print Receipt Button */}
//             <button
//               onClick={handlePrint}
//               className="mt-4 w-full px-4 py-2 bg-gray-800 text-white rounded"
//             >
//               Download / Print Receipt
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PaymentForm;


