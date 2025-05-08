
import React, { createContext, useState, useEffect, useContext } from "react";
import { CustomerProfile } from "@/types/customer";
import { DriverProfile } from "@/types/driver";

interface UserContextType {
  customerProfile: CustomerProfile | null;
  driverProfile: DriverProfile | null;
  isCustomerLoggedIn: boolean;
  isDriverLoggedIn: boolean;
  updateCustomerProfile: (profile: CustomerProfile) => void;
  updateDriverProfile: (profile: DriverProfile) => void;
  loginCustomer: (profile: CustomerProfile) => void;
  loginDriver: (profile: DriverProfile) => void;
  logoutCustomer: () => void;
  logoutDriver: () => void;
}

const defaultCustomerProfile: CustomerProfile = {
  id: "123-45-6789",
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  phoneNumber: "(555) 123-4567",
  email: "john.doe@example.com",
  rating: 4.74,
  cardDetails: {
    last4Digits: "4321",
    cardType: "Visa",
    expiryMonth: 12,
    expiryYear: 2025
  },
  ridesHistory: [],
  reviews: [],
  paymentMethods: [
    {
      id: "pm_1",
      type: "Visa",
      name: "Personal Card",
      isDefault: true,
      last4Digits: "4321"
    }
  ]
};

const UserContext = createContext<UserContextType>({
  customerProfile: null,
  driverProfile: null,
  isCustomerLoggedIn: false,
  isDriverLoggedIn: false,
  updateCustomerProfile: () => {},
  updateDriverProfile: () => {},
  loginCustomer: () => {},
  loginDriver: () => {},
  logoutCustomer: () => {},
  logoutDriver: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState<boolean>(false);
  const [isDriverLoggedIn, setIsDriverLoggedIn] = useState<boolean>(false);

  // Load profiles from localStorage on initial render
  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customerData');
    const storedDriverData = localStorage.getItem('driverData');
    const customerLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
    const driverLoggedIn = localStorage.getItem('driverLoggedIn') === 'true';

    if (storedCustomerData) {
      try {
        setCustomerProfile(JSON.parse(storedCustomerData));
        setIsCustomerLoggedIn(customerLoggedIn);
      } catch (error) {
        console.error("Error parsing customer data:", error);
      }
    }

    if (storedDriverData) {
      try {
        setDriverProfile(JSON.parse(storedDriverData));
        setIsDriverLoggedIn(driverLoggedIn);
      } catch (error) {
        console.error("Error parsing driver data:", error);
      }
    }
  }, []);

  const updateCustomerProfile = (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    localStorage.setItem('customerData', JSON.stringify(profile));
  };

  const updateDriverProfile = (profile: DriverProfile) => {
    setDriverProfile(profile);
    localStorage.setItem('driverData', JSON.stringify(profile));
  };

  const loginCustomer = (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    setIsCustomerLoggedIn(true);
    localStorage.setItem('customerData', JSON.stringify(profile));
    localStorage.setItem('customerLoggedIn', 'true');
  };

  const loginDriver = (profile: DriverProfile) => {
    setDriverProfile(profile);
    setIsDriverLoggedIn(true);
    localStorage.setItem('driverData', JSON.stringify(profile));
    localStorage.setItem('driverLoggedIn', 'true');
  };

  const logoutCustomer = () => {
    setIsCustomerLoggedIn(false);
    localStorage.removeItem('customerLoggedIn');
  };

  const logoutDriver = () => {
    setIsDriverLoggedIn(false);
    localStorage.removeItem('driverLoggedIn');
  };

  return (
    <UserContext.Provider value={{
      customerProfile,
      driverProfile,
      isCustomerLoggedIn,
      isDriverLoggedIn,
      updateCustomerProfile,
      updateDriverProfile,
      loginCustomer,
      loginDriver,
      logoutCustomer,
      logoutDriver
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
