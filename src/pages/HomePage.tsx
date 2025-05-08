
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Clock, MapPin, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainNavbar from "@/components/MainNavbar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";

const HomePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const navigate = useNavigate();
  const { isCustomerLoggedIn } = useUser();

  const handleSearch = () => {
    if (pickup && dropoff) {
      // Store the pickup and dropoff in sessionStorage for the ride page
      sessionStorage.setItem('pickup', pickup);
      sessionStorage.setItem('dropoff', dropoff);
      navigate('/ride');
    }
  };

  // Suggestions with Courier disabled
  const suggestions = [
    {
      id: "courier",
      title: "Courier",
      description: "Service not available at this time.",
      disabled: true
    },
    {
      id: "hourly",
      title: "Hourly",
      description: "Request a trip for a block of time and make multiple stops.",
      link: "/ride"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <MainNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-8">
                Go anywhere with<br />Uber
              </h1>
              
              {/* Ride Request Form */}
              <div className="space-y-4 max-w-xl shadow-lg rounded-lg p-6 bg-white border border-gray-200">
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter pickup location"
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
                    placeholder="Enter destination"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-between gap-2 h-14">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Today
                    </div>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full h-14">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          Now
                        </div>
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      <DropdownMenuItem>Now</DropdownMenuItem>
                      <DropdownMenuItem>Schedule for later</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Button 
                  variant="default" 
                  className="w-full bg-black hover:bg-gray-800 text-white h-14"
                  onClick={handleSearch}
                  disabled={!pickup || !dropoff}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
                
                {isCustomerLoggedIn ? (
                  <Link to="/activity" className="text-black hover:text-gray-700 py-2 flex items-center">
                    View your recent activity
                  </Link>
                ) : (
                  <Link to="/login" className="text-black hover:text-gray-700 py-2 flex items-center">
                    Log in to see your recent activity
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Suggestions Section */}
        <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Suggestions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className={`bg-gray-100 p-6 rounded-lg ${suggestion.disabled ? 'opacity-60' : ''}`}
              >
                <h3 className="text-xl font-bold mb-2">{suggestion.title}</h3>
                <p className="text-gray-700 mb-6">{suggestion.description}</p>
                <div className="flex justify-between items-end">
                  {suggestion.disabled ? (
                    <span className="text-gray-500 font-medium">Not available</span>
                  ) : (
                    <Link to={suggestion.link} className="text-black font-medium hover:underline">
                      Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
