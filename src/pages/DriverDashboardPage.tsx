
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Car, User, Clipboard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import Map from "@/components/Map";
import { BillingInfo } from "@/types/billing";

const DriverDashboardPage = () => {
  const navigate = useNavigate();
  const { driverProfile, isDriverLoggedIn, logoutDriver } = useUser();
  const [activeRides, setActiveRides] = useState<BillingInfo[]>([]);
  const [online, setOnline] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number]>([-122.4194, 37.7749]); // San Francisco
  const [showNewRideAlert, setShowNewRideAlert] = useState(false);
  const [newRide, setNewRide] = useState<BillingInfo | null>(null);
  const [notifications, setNotifications] = useState(0);

  // Check if driver is logged in
  useEffect(() => {
    if (!isDriverLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to access your dashboard",
        variant: "destructive"
      });
      navigate('/driver/login');
    }
    
    // Check for active rides in sessionStorage
    const checkForNewRides = () => {
      const rideInfoJson = sessionStorage.getItem('activeRide');
      if (rideInfoJson) {
        try {
          const rideInfo = JSON.parse(rideInfoJson);
          // Only show the alert for new rides that haven't been accepted/rejected yet
          if (!activeRides.some(ride => ride.id === rideInfo.id) && !rideInfo.accepted) {
            setNewRide(rideInfo);
            setShowNewRideAlert(true);
            setNotifications(prev => prev + 1);
            
            // Play sound alert
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869.wav');
            audio.play().catch(e => console.log('Audio play failed:', e));
          }
        } catch (error) {
          console.error("Error parsing ride info:", error);
        }
      }
    };
    
    // Check immediately and then every 5 seconds if online
    checkForNewRides();
    const interval = setInterval(() => {
      if (online) {
        checkForNewRides();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isDriverLoggedIn, navigate, activeRides, online]);

  const handleToggleOnline = () => {
    setOnline(!online);
    toast({
      title: online ? "You're offline" : "You're online",
      description: online ? "You won't receive any ride requests" : "You'll now receive ride requests",
    });
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    toast({
      title: "Notifications",
      description: "No new notifications",
    });
  };

  const handleAcceptRide = (ride: BillingInfo) => {
    // Update the ride in active rides
    const updatedRide = { ...ride, accepted: true };
    setActiveRides(prev => [...prev, updatedRide]);
    
    // Update sessionStorage
    sessionStorage.setItem('activeRide', JSON.stringify(updatedRide));
    
    setShowNewRideAlert(false);
    setNewRide(null);
    
    toast({
      title: "Ride Accepted",
      description: `You've accepted the ride to ${ride.destinationLocation}`,
    });
  };

  const handleRejectRide = (ride: BillingInfo) => {
    // Remove from session storage
    sessionStorage.removeItem('activeRide');
    
    setShowNewRideAlert(false);
    setNewRide(null);
    
    toast({
      title: "Ride Rejected",
      description: "You've rejected the ride request",
    });
  };

  const handleStartRide = (ride: BillingInfo) => {
    toast({
      title: "Ride Started",
      description: "You've started the ride. Drive safely!",
    });
    
    // Remove the ride from active rides after 10 seconds (simulating completion)
    setTimeout(() => {
      setActiveRides(prev => prev.filter(r => r.id !== ride.id));
      sessionStorage.removeItem('activeRide');
      toast({
        title: "Ride Completed",
        description: `You've completed the ride to ${ride.destinationLocation}`,
      });
    }, 10000);
  };

  const handleLogout = () => {
    logoutDriver();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your driver account."
    });
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!driverProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Uber Driver</div>
        <div className="flex items-center space-x-4">
          <button 
            className="relative cursor-pointer" 
            onClick={handleNotificationClick}
          >
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
                {notifications}
              </span>
            )}
          </button>
          <button 
            onClick={handleToggleOnline} 
            className={`px-4 py-1 rounded-full cursor-pointer ${online ? 'bg-green-500' : 'bg-gray-500'}`}
          >
            {online ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative h-[calc(100vh-80px)]">
        {/* Map takes the full area */}
        <Map 
          className="h-full w-full"
          driverLocation={coordinates}
        />
        
        {/* Driver Info Panel */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gray-200 rounded-full p-2">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-bold">{`${driverProfile.firstName} ${driverProfile.lastName}`}</h3>
              <div className="text-sm text-gray-600">
                Rating: {driverProfile.rating} ⭐
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center space-x-2 text-sm mb-1">
              <Car className="h-4 w-4" />
              <span>{`${driverProfile.carDetails.year} ${driverProfile.carDetails.make} ${driverProfile.carDetails.model}`}</span>
            </div>
            <div className="text-sm text-gray-600">
              {driverProfile.carDetails.color} · {driverProfile.carDetails.licensePlate}
            </div>
          </div>
        </div>
        
        {/* New Ride Alert Modal */}
        {showNewRideAlert && newRide && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-2">New Ride Request!</h3>
              <div className="my-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{newRide.sourceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{newRide.destinationLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{newRide.distanceCovered} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fare:</span>
                  <span className="font-medium">${newRide.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleRejectRide(newRide)}
                >
                  Reject
                </Button>
                <Button 
                  className="flex-1 bg-black text-white"
                  onClick={() => handleAcceptRide(newRide)}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Active Rides Panel */}
        {activeRides.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Active Rides</h3>
              {activeRides.map((ride) => (
                <div key={ride.id} className="border-t border-gray-200 py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{`${ride.sourceLocation} → ${ride.destinationLocation}`}</div>
                      <div className="text-sm text-gray-600">
                        {`${ride.distanceCovered} miles · $${ride.totalAmount.toFixed(2)}`}
                      </div>
                    </div>
                    <div>
                      {ride.accepted ? (
                        <Button 
                          variant="default" 
                          onClick={() => handleStartRide(ride)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Start Ride
                        </Button>
                      ) : (
                        <Button 
                          variant="default"
                          onClick={() => handleAcceptRide(ride)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Accept
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation - Fixed clickability */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3">
        <button 
          className="flex flex-col items-center cursor-pointer" 
          onClick={() => {}} 
          aria-label="Home"
        >
          <Car className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          className="flex flex-col items-center cursor-pointer" 
          onClick={() => handleNavigate('/activity')} 
          aria-label="Activity"
        >
          <Clipboard className="h-6 w-6" />
          <span className="text-xs mt-1">Activity</span>
        </button>
        
        <button 
          className="flex flex-col items-center cursor-pointer" 
          onClick={() => handleNavigate('/profile')} 
          aria-label="Account"
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </button>
        
        <button 
          className="flex flex-col items-center cursor-pointer" 
          onClick={() => handleNavigate('/profile')} 
          aria-label="Settings"
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
        
        <button 
          className="flex flex-col items-center cursor-pointer" 
          onClick={handleLogout} 
          aria-label="Logout"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DriverDashboardPage;
