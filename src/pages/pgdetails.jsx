"use client";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClickSpark from "@/components/ui/ClickSpark/ClickSpark";

export function PGDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Retrieve PG details passed via state
  const pg = location.state?.pg;

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No PG details available.</p>
      </div>
    );
  }

  // Function to handle adding PG to cart
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart items
    const isAlreadyAdded = cart.some((item) => item.name === pg.name);

    if (!isAlreadyAdded) {
      cart.push(pg); // Add PG to cart
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
      toast({
        title: "Success",
        description: `${pg.name} has been added to the cart.`,
      });
    } else {
      toast({
        title: "Already Added",
        description: `${pg.name} is already in the cart!`,
        action: <ToastAction altText="View Cart">View Cart</ToastAction>,
      });
    }
  };

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src={pg.image}
            alt={pg.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-black">{pg.name}</h1>
            <p className="text-gray-500">{pg.location}</p>
            <p className="text-gray-800 text-lg mt-4">{pg.price}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-black">Description</h3>
              <p className="text-gray-600 mt-2">{pg.features}</p>
            </div>
            <div className="gap-2 flex">
              <Button
                onClick={() => navigate(-1)}
                className="mt-6 bg-[#FF9F1C] text-black rounded-xl"
              >
                Back
              </Button>
              <Button
                className="mt-6 bg-[#FF9F1C] text-black rounded-xl"
                variant="outline"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
