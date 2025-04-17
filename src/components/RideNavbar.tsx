
import { Link } from "react-router-dom";
import { Car, Package, Calendar, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

const RideNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="h-full mx-auto flex items-center px-4 md:px-8">
        <div className="flex items-center mr-12">
          <Link to="/" className="text-black font-bold text-2xl">
            Uber
          </Link>
        </div>
        
        <nav className="flex space-x-2 md:space-x-6">
          <Link 
            to="/ride" 
            className="flex items-center py-4 px-2 border-b-2 border-black text-black font-medium"
          >
            <Car className="h-5 w-5 mr-2" />
            Ride
          </Link>
          
          <Link 
            to="/deliver" 
            className="flex items-center py-4 px-2 text-gray-500 font-medium hover:text-black"
          >
            <Package className="h-5 w-5 mr-2" />
            Courier
          </Link>
          
          <Link 
            to="/ride/rental" 
            className="flex items-center py-4 px-2 text-gray-500 font-medium hover:text-black"
          >
            <Car className="h-5 w-5 mr-2" />
            Rental Cars
          </Link>
          
          <Link 
            to="/ride/hourly" 
            className="flex items-center py-4 px-2 text-gray-500 font-medium hover:text-black"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Hourly
          </Link>
          
          <Link 
            to="/eat" 
            className="flex items-center py-4 px-2 text-gray-500 font-medium hover:text-black"
          >
            <UtensilsCrossed className="h-5 w-5 mr-2" />
            Eat
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/activity" className="text-black font-medium">
            Activity
          </Link>
          
          <Link to="/profile">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="sr-only">Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default RideNavbar;
