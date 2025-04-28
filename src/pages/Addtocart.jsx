import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HashLoader } from "react-spinners";
import ClickSpark from "@/components/ui/ClickSpark/ClickSpark";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return total + price;
  }, 0);

  // Handle removing an item from the cart
  const handleRemoveFromCart = (pgName) => {
    const updatedCart = cartItems.filter((item) => item.name !== pgName);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
  };

  // Handle like toggle
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <HashLoader color="#FF9F1C" />
      </div>
    );
  }

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="flex flex-col min-h-screen bg-gray-50 mx-10">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm p-4 border-b">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-[#FF9F1C]" />
              Your Cart
            </h1>
            {cartItems.length > 0 && (
              <AlertDialog className="rounded-2xl">
                <AlertDialogTrigger asChild className="rounded-2xl">
                  <Button
                    variant="outline"
                    className="bg-red-100 text-red-600 hover:bg-red-200 rounded-full"
                    aria-label="Clear all items from cart"
                  >
                    Clear Cart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white text-black ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove all items from your cart?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-none w-2">
                      <Button className="bg-black text-white rounded-full hover:bg-white hover:text-black">
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart}>
                      <Button className="bg-black text-white rounded-full hover:bg-red-500 hover:text-white">
                        Clear Cart
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </header>

        {/* Main Content */}
        <section className="flex-1 container mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
              <Button
                onClick={() => navigate("/locations")}
                className="bg-[#FF9F1C] hover:bg-orange-600 text-black rounded-full px-6 flex items-center gap-2 mx-auto"
                aria-label="Continue shopping"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Summary */}
              <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  Cart Summary
                </h2>
                <p className="text-gray-600">
                  Total Items:{" "}
                  <span className="font-medium">{cartItems.length}</span>
                </p>
                <p className="text-gray-600">
                  Estimated Total:{" "}
                  <span className="font-medium">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Cart Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((pg, index) => (
                  <Card
                    key={index}
                    className="relative bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={pg.image}
                      alt={pg.name}
                      className="absolute inset-0 object-cover w-full h-full"
                    />
                    <div className="relative z-10 p-6 bg-gradient-to-b from-transparent to-black/80 rounded-2xl h-full flex flex-col justify-between">
                      <CardHeader className="p-0">
                        <h2 className="text-lg font-bold text-white">
                          {pg.name}
                        </h2>
                        <p className="text-gray-300 text-sm">{pg.location}</p>
                      </CardHeader>
                      <CardContent className="p-0 mt-4">
                        <p className="text-gray-100 font-semibold">
                          {pg.price}
                        </p>
                        <p className="text-gray-300 text-sm mt-2">
                          {pg.features}
                        </p>
                        <div className="flex items-center mt-3">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={16}
                              fill={
                                starIndex < Math.floor(pg.rating)
                                  ? "gold"
                                  : "none"
                              }
                              stroke="gold"
                              className="mr-1"
                            />
                          ))}
                          <span className="text-gray-300 text-sm ml-2">
                            {pg.rating.toFixed(1)}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0 mt-4 flex justify-between items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                className="bg-[#FF9F1C] hover:bg-orange-600 text-black rounded-full"
                                onClick={() =>
                                  navigate("/payment", { state: { pg } })
                                }
                                aria-label={`Proceed to payment for ${pg.name}`}
                              >
                                Proceed to Payment
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Continue to payment for {pg.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      className="rounded-full bg-red-600 hover:bg-red-700"
                                      aria-label={`Remove ${pg.name} from cart`}
                                    >
                                      Remove
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Remove Item
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove{" "}
                                        {pg.name} from your cart?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleRemoveFromCart(pg.name)
                                        }
                                      >
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove {pg.name} from cart</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </ClickSpark>
  );
}
