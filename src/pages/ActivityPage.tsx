
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronDown, User, HelpCircle, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import RideNavbar from "@/components/RideNavbar";

const PastRide = ({ 
  name, 
  date, 
  time, 
  price, 
  mapImage 
}: { 
  name: string; 
  date: string; 
  time: string; 
  price: string; 
  mapImage?: string;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      {mapImage && (
        <div className="h-48 bg-gray-200">
          <img 
            src={mapImage} 
            alt={`Map for ${name}`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-medium mb-1">{name}</h3>
        <div className="flex items-center text-gray-500 mb-2">
          <span>{date} • {time}</span>
        </div>
        <p className="text-lg font-medium mb-4">{price}</p>
        
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="text-black">
            <HelpCircle className="h-5 w-5 mr-2" />
            Help
          </Button>
          
          <Button variant="ghost" size="sm" className="text-black">
            <FileText className="h-5 w-5 mr-2" />
            Details
          </Button>
          
          <Button variant="ghost" size="sm" className="text-black">
            <RefreshCw className="h-5 w-5 mr-2" />
            Rebook
          </Button>
        </div>
      </div>
    </div>
  );
};

const ActivityPage = () => {
  const [filter, setFilter] = useState("Personal");
  const [tripType, setTripType] = useState("All Trips");
  
  const upcomingImage = "/lovable-uploads/b15ae532-9fa4-4f4a-9437-59ff5e3af042.png";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RideNavbar />
      
      <main className="flex-1 pt-20 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming</h2>
          
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <img 
                src={upcomingImage} 
                alt="Upcoming ride" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">You have no upcoming trips</h3>
              
              <Button variant="outline" className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Reserve ride
              </Button>
            </div>
          </div>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Past</h2>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center justify-between"
              >
                <User className="h-5 w-5 mr-2" />
                {filter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-between"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {tripType}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Jul 21 - Feb 22</h3>
            
            <PastRide 
              name="San Jose Improv" 
              date="Feb 22" 
              time="9:39 PM" 
              price="$22.92"
              mapImage="/lovable-uploads/b15ae532-9fa4-4f4a-9437-59ff5e3af042.png" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PastRide 
                name="Suburaban Bus Stand" 
                date="Aug 13" 
                time="11:09 AM" 
                price="₹35.00"
              />
              
              <PastRide 
                name="Kalyana - Ta Ru Nataraja's home" 
                date="Jul 25" 
                time="10:33 AM" 
                price="₹68.00"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="bg-gray-100 rounded-lg p-6 flex">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Get a ride in minutes</h3>
              <p className="text-gray-600 mb-4">
                Book an Uber from a web browser, no app install necessary.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800">
                Request a Ride
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src={upcomingImage} 
                alt="Request a ride" 
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ActivityPage;
