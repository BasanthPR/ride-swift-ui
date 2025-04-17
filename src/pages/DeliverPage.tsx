
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Clock, MapPin, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";

const DeliverPage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("send");

  const handleAddressSearch = () => {
    // For demo purposes, using fixed coordinates
    setPickupLocation([-122.1430, 37.4419]); // Palo Alto
    setDropoffLocation([-122.0841, 37.3893]); // Mountain View
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <RideNavbar />
      
      <div className="flex-1 relative pt-16">
        {/* Map takes the full screen */}
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="h-full w-full absolute inset-0"
        />
        
        {/* Delivery form overlay */}
        <div className="absolute top-4 left-4 md:left-8 z-10 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-3">Courier</h2>
            <p className="text-gray-600 mb-4">
              Have a courier deliver something for you. Get packages delivered in the time it takes to drive there.
            </p>
            
            {/* Tabs */}
            <div className="flex mb-4">
              <Button 
                variant={activeTab === "send" ? "default" : "outline"}
                className={`flex-1 mr-2 ${activeTab === "send" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => setActiveTab("send")}
              >
                Send
              </Button>
              <Button 
                variant={activeTab === "receive" ? "default" : "outline"}
                className={`flex-1 ${activeTab === "receive" ? "bg-black text-white" : "bg-gray-100"}`}
                onClick={() => setActiveTab("receive")}
              >
                Receive
              </Button>
            </div>
            
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
                <input
                  type="text"
                  placeholder="Dropoff location"
                  className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                />
              </div>
            </div>
            
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black p-3 mb-4"
              onClick={handleAddressSearch}
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

export default DeliverPage;
