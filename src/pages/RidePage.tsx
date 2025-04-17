
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Clock, MapPin, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";

const RidePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);

  const handleAddressSearch = () => {
    // For demo purposes, using fixed coordinates
    setPickupLocation([-122.1430, 37.4419]); // Palo Alto
    setDropoffLocation([-122.0841, 37.3893]); // Mountain View
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <RideNavbar />
      
      <div className="flex-1 relative">
        {/* Map takes the full screen */}
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="h-full w-full absolute inset-0"
        />
        
        {/* Ride request form overlay */}
        <div className="absolute top-16 left-4 md:left-8 z-10 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Get a ride</h2>
            
            <div className="space-y-3 mb-4">
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <input
                  type="text"
                  placeholder="Pickup location"
                  className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-l-md focus:outline-none"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                  <Button variant="ghost" className="border border-gray-300 border-l-0 rounded-l-none rounded-r-md px-2">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between border border-gray-300 p-3"
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Pickup now</span>
                </div>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between border border-gray-300 p-3"
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>For me</span>
                </div>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
            
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white p-3"
              onClick={handleAddressSearch}
              disabled={!pickup || !dropoff}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePage;
