
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";
import PickupTimeModal from "@/components/PickupTimeModal";
import RideSelectionScreen from "@/components/RideSelectionScreen";
import RiderSelectionModal from "@/components/RiderSelectionModal";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";

const RidePage = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);
  const [pickupTimeModalOpen, setPickupTimeModalOpen] = useState(false);
  const [showRideSelection, setShowRideSelection] = useState(false);
  const [riderModalOpen, setRiderModalOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState("Pickup now");
  const [selectedRider, setSelectedRider] = useState("For me");
  const { isCustomerLoggedIn } = useUser();

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!isCustomerLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to book a ride",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [isCustomerLoggedIn, navigate]);

  // Load pickup and dropoff from session storage if available
  useEffect(() => {
    const storedPickup = sessionStorage.getItem('pickup');
    const storedDropoff = sessionStorage.getItem('dropoff');
    
    if (storedPickup) setPickup(storedPickup);
    if (storedDropoff) setDropoff(storedDropoff);
  }, []);

  const handleAddressSearch = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and dropoff locations",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, using fixed coordinates
    setPickupLocation([-122.1430, 37.4419]); // Palo Alto
    setDropoffLocation([-122.0841, 37.3893]); // Mountain View
    
    setShowRideSelection(true);
  };

  const handlePickupTimeSelect = (time: string, date: string) => {
    setPickupTime(`${date} ${time}`);
    setPickupTimeModalOpen(false);
  };

  const handleRiderSelect = (rider: string) => {
    setSelectedRider(rider);
    setRiderModalOpen(false);
  };

  const handleBackFromRideSelection = () => {
    setShowRideSelection(false);
  };

  const handleRideSelected = (rideType: string, price: number) => {
    // Store ride info in session storage for payment page
    sessionStorage.setItem('rideType', rideType);
    sessionStorage.setItem('ridePrice', price.toString());
    sessionStorage.setItem('ridePickup', pickup);
    sessionStorage.setItem('rideDropoff', dropoff);
    
    navigate('/payment');
  };

  if (showRideSelection) {
    return (
      <RideSelectionScreen
        pickupLocation={pickup}
        dropoffLocation={dropoff}
        onBack={handleBackFromRideSelection}
        onRideSelected={handleRideSelected}
      />
    );
  }

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
        
        {/* Ride request form overlay */}
        <div className="absolute top-4 left-4 md:left-8 z-10 max-w-md">
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
                <input
                  type="text"
                  placeholder="Dropoff location"
                  className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              {/* Pickup time dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between border border-gray-300 p-3 h-12"
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{pickupTime}</span>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  <DropdownMenuItem onSelect={() => setPickupTime("Pickup now")}>Pickup now</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setPickupTimeModalOpen(true)}>Schedule for later</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mb-4">
              {/* Rider selection dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between border border-gray-300 p-3 h-12"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>{selectedRider}</span>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  <DropdownMenuItem onSelect={() => setSelectedRider("For me")}>For me</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setRiderModalOpen(true)}>Add a passenger</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white p-3 h-12"
              onClick={handleAddressSearch}
              disabled={!pickup || !dropoff}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Non-transparent modal for pickup time selection */}
      {pickupTimeModalOpen && (
        <PickupTimeModal 
          onClose={() => setPickupTimeModalOpen(false)} 
          onSelect={handlePickupTimeSelect} 
        />
      )}

      {/* Rider selection modal */}
      {riderModalOpen && (
        <RiderSelectionModal 
          onClose={() => setRiderModalOpen(false)} 
          onSelect={handleRiderSelect}
        />
      )}
    </div>
  );
};

export default RidePage;
