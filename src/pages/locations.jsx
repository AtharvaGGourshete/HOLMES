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
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Locations() {
  const [pgData, setPgData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [ratingsFilter, setRatingsFilter] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [priceSliderValue, setPriceSliderValue] = useState([12000]);
  const navigate = useNavigate();

  const amenitiesOptions = [
    "WiFi",
    "Meals",
    "Laundry",
    "Air Conditioning",
    "Gym",
    "Parking",
  ];

  // Load favourites from localStorage on initial render
  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  // Fetch PGs from Supabase
  useEffect(() => {
    const fetchPGs = async () => {
      const { data, error } = await supabase.from("insert_pg").select("*");
      if (error) {
        console.error("Error fetching PG data:", error.message);
      } else {
        // Ensure structure matches UI expectation
        const formattedData = data.map((pg) => ({
          name: pg.PG_Name,
          location: pg.Address || "Unknown",
          price: `₹${pg.Rent_Price}/month`,
          features: pg.Amenities || "Basic Amenities",
          image: pg.img || "https://www.hostelworld.com/blog/wp-content/uploads/2018/06/hostel-room-types-5.jpg",
          liked: false,
          rating: parseFloat(pg.Rating) || 3,
          amenities: pg.amenities
        }));
        
        setPgData(formattedData);
        
      }
    };

    fetchPGs();
  }, []);

  const handleSearch = () => {
    return pgData.filter((pg) => {
      const matchesText = pg.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesLocation = selectedLocation
        ? pg.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;
      const matchesPrice =
        parseInt(pg.price.replace(/[^0-9]/g, "")) <= priceSliderValue;
      const matchesAmenities = amenitiesFilter.every((amenity) =>
        pg.features.toLowerCase().includes(amenity.toLowerCase())
      );
      const matchesRatings = ratingsFilter ? pg.rating >= ratingsFilter : true;

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

  return (
    <>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar Filter Section */}
        <aside className="w-64 bg-white shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price</h3>
            <Slider
              value={[priceSliderValue]}
              onValueChange={(value) => setPriceSliderValue(value[0])}
              min={1000}
              max={15000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>₹1,000</span>
              <span>₹{priceSliderValue}</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ratings</h3>
              {/* <Select onValueChange={setRatingsFilter}>
                <SelectTrigger className="w-full rounded-3xl">
                  <SelectValue placeholder="Select Ratings" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars & Up</SelectItem>
                  <SelectItem value="3">3 Stars & Up</SelectItem>
                  <SelectItem value="2">2 Stars & Up</SelectItem>
                  <SelectItem value="1">1 Star & Up</SelectItem>
                </SelectContent>
              </Select> */}
          </div>

          {/* Amenities Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenitiesOptions.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => handleAmenitiesChange(amenity)}
                  className={`px-3 py-1 rounded-full border ${
                    amenitiesFilter.includes(amenity)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow p-6">
          {/* Search Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <Input
              type="text"
              placeholder="Search for PG"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-grow rounded-full"
            />
            {/* <Select onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48 rounded-full">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-2xl mt-2 shadow-2xl">
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="andheri">Andheri</SelectItem>
                <SelectItem value="bandra">Bandra</SelectItem>
                <SelectItem value="dadar">Dadar</SelectItem>
                <SelectItem value="thane">Thane</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* PG Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPGs.length > 0 ? (
              filteredPGs.map((pg, index) => (
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
                      <h2 className="text-lg font-bold text-white">
                        {pg.name}
                        
                      </h2>
                      <p className="text-gray-300">{pg.location}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-100">{pg.price}</p>
                      <p className="text-gray-400">{pg.features}</p>
                      <p className="text-gray-400">{pg.amenities}</p>
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
                        onClick={() => navigate("/pg-details", { state: { pg } })}
                      >
                        View Details
                      </Button>
                      <button
                        onClick={() => handleLikeToggle(pg)}
                        className="ml-2 text-xl"
                      >
                        {favourites.some((item) => item.name === pg.name) ? (
                          <Heart size={20} stroke="red" fill="red" />
                        ) : (
                          <Heart size={20} className="text-white" />
                        )}
                      </button>
                    </CardFooter>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No PGs found for your search.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
