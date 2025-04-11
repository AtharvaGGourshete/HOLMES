import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Footer from "@/components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Handle removing an item from the cart
  const handleRemoveFromCart = (pgName) => {
    const updatedCart = cartItems.filter((item) => item.name !== pgName);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Handle like toggle (optional, if you want to keep favourites functionality)
  const handleLikeToggle = (pg) => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isLiked = favourites.some((item) => item.name === pg.name);

    if (isLiked) {
      favourites = favourites.filter((item) => item.name !== pg.name);
    } else {
      favourites = [...favourites, pg];
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((pg, index) => (
              <Card
                key={index}
                className="relative bg-white shadow-md rounded-2xl overflow-hidden"
              >
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="relative z-10 p-6 bg-gradient-to-b from-transparent to-black rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-bold text-white">{pg.name}</h2>
                    <p className="text-gray-300">{pg.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-100">{pg.price}</p>
                    <p className="text-gray-400">{pg.features}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, starIndex) => (
                        <span key={starIndex}>
                          <Star
                            size={16}
                            fill={
                              starIndex < Math.floor(pg.rating)
                                ? "gold"
                                : "none"
                            }
                            stroke="gold"
                          />
                        </span>
                      ))}
                      <span className="ml-2 text-gray-300">{pg.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="text-black bg-white border-white hover:text-white rounded-full"
                      onClick={() => navigate("/payment", { state: { pg } })}
                    >
                      Add Payemnt Methods
                    </Button>
                    <div className="flex gap-2">
                      {/* <button
                        onClick={() => handleLikeToggle(pg)}
                        className="text-xl"
                      >
                        {(
                          JSON.parse(localStorage.getItem("favourites")) || []
                        ).some((item) => item.name === pg.name) ? (
                          <Heart size={20} stroke="red" fill="red" />
                        ) : (
                          <Heart size={20} className="text-white" />
                        )}
                      </button> */}
                      <Button
                        variant="destructive"
                        className="rounded-full bg-red-600 hover:bg-red-700"
                        onClick={() => handleRemoveFromCart(pg.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}