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
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const FilterSection = ({
  priceSliderValue,
  setPriceSliderValue,
  ratingsFilter,
  setRatingsFilter,
  amenitiesFilter,
  handleAmenitiesChange,
  clearFilters,
}) => {
  const amenitiesOptions = [
    "WiFi",
    "Meals",
    "Laundry",
    "Air Conditioning",
    "Gym",
    "Parking",
  ];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Filters</SidebarGroupLabel>
        <SidebarGroupContent className="px-4 py-2">
          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Price Range
            </h3>
            <Slider
              value={[priceSliderValue]}
              onValueChange={(value) => setPriceSliderValue(value[0])}
              min={1000}
              max={15000}
              step={500}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>₹1,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </h3>
            <div className="flex flex-wrap gap-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setRatingsFilter(rating.toString())}
                  className={`flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none text-sm ${
                    ratingsFilter === rating.toString() ? "text-blue-600" : ""
                  }`}
                  aria-label={`Filter by ${rating} stars`}
                >
                  <span>{rating}</span>
                  <Star
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Amenities
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600"
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

          {/* Clear Filters Button */}
          <Button
            onClick={clearFilters}
            className="w-full text-sm bg-gray-100 hover:bg-gray-200"
          >
            Clear All Filters
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default function Locations() {
  const [pgData, setPgData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [ratingsFilter, setRatingsFilter] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [priceSliderValue, setPriceSliderValue] = useState(12000);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  useEffect(() => {
    const fetchPGs = async () => {
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
          amenities: pg.amenities, // Assuming this is an array of amenities
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

      const matchesLocation =
        selectedLocation && selectedLocation !== "all"
          ? pg.location.toLowerCase() === selectedLocation.toLowerCase()
          : true;

      const matchesPrice =
        parseInt(pg.price.replace(/[^\d]/g, "")) <= priceSliderValue;

      const matchesAmenities = amenitiesFilter.every((amenity) =>
        pg.amenities && pg.amenities.includes(amenity) // Compare pg.amenities array with the filter
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
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        {/* Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="bg-gray-50 w-64">
            <SidebarHeader className="p-4">
              <SidebarGroup></SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <SidebarSeparator />
                <FilterSection
                  priceSliderValue={priceSliderValue}
                  setPriceSliderValue={setPriceSliderValue}
                  ratingsFilter={ratingsFilter}
                  setRatingsFilter={setRatingsFilter}
                  amenitiesFilter={amenitiesFilter}
                  handleAmenitiesChange={handleAmenitiesChange}
                  clearFilters={clearFilters}
                />
              </ScrollArea>
            </SidebarContent>
          </Sidebar>

          {/* Main */}
          <div className="flex-1">
            <header className="flex items-center p-4 border-b bg-white">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-2xl font-semibold">PG Listings</h1>
            </header>
            <div className="container mx-auto px-4 py-8">
              {/* Search Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <Input
                  type="text"
                  placeholder="Search for PG"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow rounded-full"
                />
                <Select onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48 rounded-full">
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
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    No PGs found matching your filters.
                  </p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPGs.map((pg, index) => (
                    <Card
                      key={index}
                      className="relative bg-white shadow-md rounded-2xl overflow-hidden"
                    >
                      <img
                        src={pg.image}
                        alt={pg.name}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                      <div className="relative z-10 p-6 bg-gradient-to-b from-transparent to-black rounded-2xl h-full flex flex-col justify-between">
                        <div>
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
                                <Star
                                  key={starIndex}
                                  size={16}
                                  fill={
                                    starIndex < Math.floor(pg.rating)
                                      ? "gold"
                                      : "none"
                                  }
                                  stroke="gold"
                                />
                              ))}
                              <span className="ml-2 text-gray-300">
                                {pg.rating}
                              </span>
                            </div>
                          </CardContent>
                        </div>
                        <CardFooter className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            className="text-black bg-white border-white hover:text-white rounded-full"
                            onClick={() =>
                              navigate("/pg-details", { state: { pg } })
                            }
                          >
                            View Details
                          </Button>
                          <button
                            onClick={() => handleLikeToggle(pg)}
                            className="ml-2 text-xl"
                          >
                            {favourites.some(
                              (item) => item.name === pg.name
                            ) ? (
                              <Heart size={20} stroke="red" fill="red" />
                            ) : (
                              <Heart size={20} className="text-white" />
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

        {/* Global Footer */}
        <Footer />
      </div>
    </SidebarProvider>
  );
}
