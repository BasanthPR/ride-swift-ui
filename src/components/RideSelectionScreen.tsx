
import React, { useState } from "react";
import { ArrowLeft, Car, Settings, Check, CreditCard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Map from "./Map";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface RideSelectionScreenProps {
  pickupLocation: string;
  dropoffLocation: string;
  onBack: () => void;
  onRideSelected: (rideType: string, price: number) => void;
}

const RideSelectionScreen: React.FC<RideSelectionScreenProps> = ({
  pickupLocation,
  dropoffLocation,
  onBack,
  onRideSelected,
}) => {
  const navigate = useNavigate();
  const { customerProfile, isCustomerLoggedIn } = useUser();
  const [selectedRide, setSelectedRide] = useState("UberX");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Check if user is logged in
  React.useEffect(() => {
    if (!isCustomerLoggedIn) {
      navigate('/login');
    }
    
    // Select default payment method if available
    if (customerProfile?.paymentMethods && customerProfile.paymentMethods.length > 0) {
      const defaultMethod = customerProfile.paymentMethods.find(pm => pm.isDefault);
      setSelectedPaymentMethod(defaultMethod?.id || customerProfile.paymentMethods[0].id);
    }
  }, [isCustomerLoggedIn, navigate, customerProfile]);

  // Hardcoded price for the demo
  const price = 24.99;

  const getPaymentMethodDetails = (id: string) => {
    if (!customerProfile?.paymentMethods) return null;
    return customerProfile.paymentMethods.find(pm => pm.id === id);
  };

  const selectedMethod = selectedPaymentMethod ? getPaymentMethodDetails(selectedPaymentMethod) : null;

  const handleConfirmRide = () => {
    onRideSelected(selectedRide, price);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="relative h-1/2">
        {/* Map area */}
        <Map 
          pickupLocation={[-122.1430, 37.4419]} // Palo Alto
          dropoffLocation={[-122.0841, 37.3893]} // Mountain View
          className="w-full h-full"
        />
        
        {/* Back button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 left-4 bg-white rounded-full w-10 h-10"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Choose a ride</h2>
          
          {/* Ride option */}
          <div
            className={`border ${
              selectedRide === "UberX" ? "border-black" : "border-gray-200"
            } rounded-lg p-4 mb-4 flex items-center justify-between`}
            onClick={() => setSelectedRide("UberX")}
          >
            <div className="flex items-center gap-4">
              <Car className="h-12 w-12" />
              <div>
                <p className="font-medium">UberX</p>
                <p className="text-sm text-gray-500">Up to 4 passengers</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">4 min away</p>
            </div>
          </div>
          
          {/* Payment method */}
          <div className="mt-6">
            <p className="font-medium mb-2">Payment</p>
            
            {customerProfile?.paymentMethods && customerProfile.paymentMethods.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between flex items-center h-auto py-3"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {selectedMethod ? (
                        <span>
                          {selectedMethod.type} •••• {selectedMethod.last4Digits}
                        </span>
                      ) : (
                        <span>Select payment method</span>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  {customerProfile.paymentMethods.map(method => (
                    <DropdownMenuItem
                      key={method.id}
                      className="flex items-center justify-between py-2"
                      onSelect={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>
                          {method.type} •••• {method.last4Digits}
                        </span>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Add payment method</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start flex items-center h-auto py-3"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Add payment method
              </Button>
            )}
          </div>
          
          {/* Ride details */}
          <div className="my-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <p className="flex-1">{pickupLocation}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <p className="flex-1">{dropoffLocation}</p>
            </div>
          </div>
          
          {/* Request button */}
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg"
            disabled={!selectedPaymentMethod}
            onClick={handleConfirmRide}
          >
            Request UberX
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideSelectionScreen;
