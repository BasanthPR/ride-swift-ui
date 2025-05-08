
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import Map from "@/components/Map";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { customerProfile, isCustomerLoggedIn } = useUser();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("UberX");
  const [price, setPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);

  // Check if user is logged in
  useEffect(() => {
    if (!isCustomerLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to complete your payment",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Get ride info from session storage
    const storedRideType = sessionStorage.getItem('rideType');
    const storedRidePrice = sessionStorage.getItem('ridePrice');
    const storedPickup = sessionStorage.getItem('ridePickup');
    const storedDropoff = sessionStorage.getItem('rideDropoff');
    
    if (storedRideType) setRideType(storedRideType);
    if (storedRidePrice) setPrice(parseFloat(storedRidePrice));
    if (storedPickup) setPickup(storedPickup);
    if (storedDropoff) setDropoff(storedDropoff);
    
    // For demo purposes, using fixed coordinates
    setPickupLocation([-122.1430, 37.4419]); // Palo Alto
    setDropoffLocation([-122.0841, 37.3893]); // Mountain View
    
    // Select default payment method if available
    if (customerProfile?.paymentMethods && customerProfile.paymentMethods.length > 0) {
      const defaultMethod = customerProfile.paymentMethods.find(pm => pm.isDefault);
      setSelectedPaymentMethod(defaultMethod?.id || customerProfile.paymentMethods[0].id);
    }
  }, [isCustomerLoggedIn, navigate, customerProfile]);

  const handleCompletePayment = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Create a ride booking in session storage
    const rideInfo = {
      id: `RIDE-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split('T')[0],
      pickupTime: new Date().toTimeString().split(' ')[0],
      dropoffTime: "",
      distanceCovered: Math.random() * 5 + 2, // Random distance between 2-7 miles
      totalAmount: price,
      sourceLocation: pickup,
      destinationLocation: dropoff,
      driverId: "",
      customerId: customerProfile?.id || "",
      predictedPrice: price,
      actualPrice: price
    };
    
    // Store this in session storage for the driver to pick up
    sessionStorage.setItem('activeRide', JSON.stringify(rideInfo));
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful",
        description: "Your ride has been booked successfully. A driver will pick you up shortly.",
      });
      navigate('/');
    }, 2000);
  };

  const getPaymentMethodDetails = (id: string) => {
    if (!customerProfile?.paymentMethods) return null;
    return customerProfile.paymentMethods.find(pm => pm.id === id);
  };

  const selectedMethod = selectedPaymentMethod ? getPaymentMethodDetails(selectedPaymentMethod) : null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Payment</h1>
      </div>
      
      <div className="relative flex-1">
        {/* Map area (smaller) */}
        <div className="h-56">
          <Map 
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            className="h-full w-full"
          />
        </div>
        
        {/* Payment content */}
        <div className="bg-white rounded-t-3xl relative -mt-6 flex-1 shadow-lg">
          <div className="p-6">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{rideType}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">Arriving in 3 min</p>
                  <p className="text-sm text-gray-500">Driver is on the way</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <div className="w-5 flex flex-col items-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="font-medium">{pickup}</p>
                    <p className="text-sm text-gray-500">Pickup location</p>
                  </div>
                  <div>
                    <p className="font-medium">{dropoff}</p>
                    <p className="text-sm text-gray-500">Dropoff location</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h3 className="text-lg font-bold mb-2">Payment Method</h3>
              
              {customerProfile?.paymentMethods && customerProfile.paymentMethods.length > 0 ? (
                <div className="space-y-2">
                  {customerProfile.paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${selectedPaymentMethod === method.id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-gray-600" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            {method.type} •••• {method.last4Digits}
                          </p>
                        </div>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <Check className="h-5 w-5" />
                      )}
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2">
                    Add payment method
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-2">No payment methods available</p>
                  <Button variant="outline">
                    Add payment method
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Base fare</span>
                <span>${(price * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Service fee</span>
                <span>${(price * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${price.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full py-6 text-lg bg-black hover:bg-gray-800"
              onClick={handleCompletePayment}
              disabled={isProcessing || !selectedPaymentMethod}
            >
              {isProcessing ? "Processing..." : `Pay $${price.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
