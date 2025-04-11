"use client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/SplitText";
import { Link } from "react-router-dom";

export default function Addtocart() {
  const { toast } = useToast();
  const [cart, setCart] = useState([]); // Store PGs in state
  const navigate = useNavigate();

  // Fetch cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove PG from cart
  const removeFromCart = (pgId) => {
    const updatedCart = cart.filter((item) => item.id !== pgId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAnimationComplete = () => {
    console.log("Cart is empty");
  };

  function handleClick() {
    return toast({ title: "PG Selected Proceed with Payment" });
  }

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-black mb-4 text-center">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">
            <SplitText
              text="Your cart is empty!!"
              className="text-2xl font-semibold text-center"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </p>
        ) : (
          <ul>
            {cart.map((pg) => (
              <li key={pg.id} className="border-b py-4 flex items-center">
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {pg.name}
                  </h2>
                  <p className="text-gray-500">{pg.location}</p>
                  <p className="text-gray-800 font-semibold">{pg.price}</p>
                </div>
                <div className="ml-auto flex gap-4">
                <Link to="/payment-method">
                  <Button
                    onClick={handleClick}
                    className="bg-green-500 hover:bg-green-300 text-white rounded-xl"
                  >
                    Proceed
                  </Button>
                  </Link>
                  <Button
                    onClick={() => removeFromCart(pg.id)}
                    className="bg-red-500 hover:bg-red-300 text-white rounded-xl"
                  >
                    Remove
                  </Button>
                  
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => navigate("/listed-PGs")}
            className="bg-purple-500 hover:bg-purple-300 text-black rounded-xl"
          >
            Continue Browsing
          </Button>
        </div>
      </div>
    </div>
  );
}
