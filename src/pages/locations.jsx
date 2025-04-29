import { useState, useEffect } from "react";
import supabase from "@/config/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart, Star, Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PropagateLoader } from "react-spinners";
import ClickSpark from "@/components/ui/ClickSpark/ClickSpark";

export default function Locations() {
  const [pgData, setPgData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [ratingsFilter, setRatingsFilter] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [priceSliderValue, setPriceSliderValue] = useState(12000);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // State for cart item count
  const navigate = useNavigate();

  const amenitiesOptions = [
    "WiFi",
    "Meals",
    "Laundry",
    "Air Conditioning",
    "Gym",
    "Parking",
  ];
  const ratings = [5, 4, 3, 2, 1];

  // Initialize favourites and cart count
  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  // Listen for storage changes to update cart count
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch PG data from Supabase
  useEffect(() => {
    const fetchPGs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("insert_pg").select("*");
      if (error) {
        console.error("Error fetching PG data:", error.message);
      } else {
        const formattedData = data.map((pg) => ({
          name: pg.PG_Name,
          location: pg.Address || "Unknown",
          price: `₹${pg.Rent_Price}/month`,
          features: pg.Amenities || "Basic Amenities",
          image:
            pg.img ||
            "https://www.hostelworld.com/blog/wp-content/uploads/2018/06/hostel-room-types-5.jpg",
          liked: false,
          rating: parseFloat(pg.Rating) || 3,
          amenities: pg.amenities || [],
        }));
        setPgData(formattedData);
      }
      setLoading(false);
    };
    fetchPGs();
  }, []);

  const handleSearch = () => {
    return pgData.filter((pg) => {
      const matchesText = pg.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesLocation =
        selectedLocation && selectedLocation !== "all"
          ? pg.location.toLowerCase() === selectedLocation.toLowerCase()
          : true;
      const matchesPrice =
        parseInt(pg.price.replace(/[^\d]/g, "")) <= priceSliderValue;
      const matchesAmenities = amenitiesFilter.every((amenity) =>
        pg.amenities.includes(amenity)
      );
      const matchesRatings = ratingsFilter
        ? pg.rating >= parseFloat(ratingsFilter)
        : true;
      return (
        matchesText &&
        matchesLocation &&
        matchesPrice &&
        matchesAmenities &&
        matchesRatings
      );
    });
  };

  const handleLikeToggle = (pg) => {
    let updatedFavourites;
    const isLiked = favourites.some((item) => item.name === pg.name);
    if (isLiked) {
      updatedFavourites = favourites.filter((item) => item.name !== pg.name);
    } else {
      updatedFavourites = [...favourites, pg];
    }
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const filteredPGs = handleSearch();

  const handleAmenitiesChange = (amenity) => {
    setAmenitiesFilter((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setPriceSliderValue(12000);
    setRatingsFilter("");
    setAmenitiesFilter([]);
    setSelectedLocation("");
    setSearchText("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <PropagateLoader color="#800080" />
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
      <div className="flex flex-col min-h-screen bg-white">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden mr-4">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-2xl font-bold text-gray-800">
                    PG Filters
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-4rem)]">
                  <div className="px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Filters
                    </h2>
                    {/* Price Filter */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                              Price Range
                            </h3>
                            <Slider
                              value={[priceSliderValue]}
                              onValueChange={(value) =>
                                setPriceSliderValue(value[0])
                              }
                              min={1000}
                              max={15000}
                              step={500}
                              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-2">
                              <span>₹1,000</span>
                              <span>₹{priceSliderValue.toLocaleString()}</span>
                              <span>₹15,000</span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Filter PGs by maximum monthly rent</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Ratings Filter */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                              Minimum Rating
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {ratings.map((rating) => (
                                <button
                                  key={rating}
                                  onClick={() =>
                                    setRatingsFilter(rating.toString())
                                  }
                                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors ${
                                    ratingsFilter === rating.toString()
                                      ? "bg-blue-100 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                  aria-label={`Filter by ${rating} stars`}
                                >
                                  <span>{rating}</span>
                                  <Star
                                    className="w-4 h-4 text-yellow-400"
                                    fill={
                                      ratingsFilter === rating.toString()
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the minimum rating for PGs</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Amenities Filter */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                              Amenities
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              {amenitiesOptions.map((amenity) => (
                                <label
                                  key={amenity}
                                  className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    value={amenity}
                                    checked={amenitiesFilter.includes(amenity)}
                                    onChange={() =>
                                      handleAmenitiesChange(amenity)
                                    }
                                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm">{amenity}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Choose required amenities for PGs</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Clear Filters Button */}
                    <Button
                      onClick={clearFilters}
                      className="w-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            {/* <h1 className="text-2xl font-semibold text-gray-800">
              PG Listings
            </h1> */}
          </div>
          {/* Cart Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <Button
                  variant="ghost"
                  className="relative hover:bg-gray-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  onClick={() => navigate("/cart")}
                  aria-label={`View cart with ${cartCount} items`}
                >
                  <ShoppingCart className="w-10 h-10 text-purple-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>View Cart ({cartCount} items)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block bg-white w-64 shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">PG Filters</h2>
              </div>
              <div className="p-4 overflow-y-auto h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Filters
                </h3>
                {/* Price Filter */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Price Range
                        </h4>
                        <Slider
                          value={[priceSliderValue]}
                          onValueChange={(value) =>
                            setPriceSliderValue(value[0])
                          }
                          min={1000}
                          max={15000}
                          step={500}
                          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                          <span>₹1,000</span>
                          <span>₹{priceSliderValue.toLocaleString()}</span>
                          <span>₹15,000</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter PGs by maximum monthly rent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Ratings Filter */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Minimum Rating
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {ratings.map((rating) => (
                            <button
                              key={rating}
                              onClick={() =>
                                setRatingsFilter(rating.toString())
                              }
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors ${
                                ratingsFilter === rating.toString()
                                  ? "bg-blue-100 text-blue-600"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                              aria-label={`Filter by ${rating} stars`}
                            >
                              <span>{rating}</span>
                              <Star
                                className="w-4 h-4 text-yellow-400"
                                fill={
                                  ratingsFilter === rating.toString()
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the minimum rating for PGs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Amenities Filter */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Amenities
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {amenitiesOptions.map((amenity) => (
                            <label
                              key={amenity}
                              className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                            >
                              <input
                                type="checkbox"
                                value={amenity}
                                checked={amenitiesFilter.includes(amenity)}
                                onChange={() => handleAmenitiesChange(amenity)}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm">{amenity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose required amenities for PGs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Clear Filters Button */}
                <Button
                  onClick={clearFilters}
                  className="w-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>

            {/* PG Listings */}
            <div className="flex-1">
              {/* Search Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                <Input
                  type="text"
                  placeholder="Search for PGs by name..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  aria-label="Search PGs"
                />
                <Select
                  onValueChange={setSelectedLocation}
                  value={selectedLocation}
                >
                  <SelectTrigger className="w-48 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Filter by Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-2xl mt-2 shadow-2xl">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="andheri">Andheri</SelectItem>
                    <SelectItem value="bandra">Bandra</SelectItem>
                    <SelectItem value="dadar">Dadar</SelectItem>
                    <SelectItem value="thane">Thane</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PG Cards Section */}
              {filteredPGs.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 text-lg mb-4">
                    No PGs found matching your filters.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPGs.map((pg, index) => (
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
                        <div>
                          <CardHeader className="p-0">
                            <CardTitle className="text-lg font-bold text-white">
                              {pg.name}
                            </CardTitle>
                            <p className="text-gray-300 text-sm">
                              {pg.location}
                            </p>
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
                        </div>
                        <CardFooter className="p-0 mt-4 flex justify-between items-center">
                          <Button
                            variant="outline"
                            className="text-black bg-white border-white hover:bg-gray-100 hover:text-black rounded-full transition-colors"
                            onClick={() =>
                              navigate("/pg-details", { state: { pg } })
                            }
                            aria-label={`View details for ${pg.name}`}
                          >
                            View Details
                          </Button>
                          <button
                            onClick={() => handleLikeToggle(pg)}
                            className="ml-2 text-xl"
                            aria-label={
                              favourites.some((item) => item.name === pg.name)
                                ? `Remove ${pg.name} from favourites`
                                : `Add ${pg.name} to favourites`
                            }
                          >
                            {favourites.some(
                              (item) => item.name === pg.name
                            ) ? (
                              <Heart size={20} stroke="red" fill="red" />
                            ) : (
                              <Heart
                                size={20}
                                className="text-white hover:text-red-500 transition-colors"
                              />
                            )}
                          </button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ClickSpark>
  );
}
