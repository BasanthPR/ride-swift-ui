
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, CreditCard, Car, Package, Globe, ChevronDown } from "lucide-react";

const BusinessNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 h-16">
      <div className="h-full mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/business" className="text-white font-medium text-lg">
            <span className="text-white text-xl font-bold mr-1">Uber</span>
            for Business
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <div className="flex items-center text-white hover:text-gray-300 transition-colors">
              Overview
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <div className="flex items-center text-white hover:text-gray-300 transition-colors">
              Solutions
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <Link to="/business/pricing" className="text-white hover:text-gray-300 transition-colors">
              Pricing
            </Link>
            <div className="flex items-center text-white hover:text-gray-300 transition-colors">
              Customer support
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <div className="flex items-center text-white hover:text-gray-300 transition-colors">
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            EN
          </Button>
          
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-gray-800">
            Contact sales
          </Button>
          
          <Link to="/login">
            <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-100">
              Basanth
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

const BusinessPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <BusinessNavbar />
      
      <main className="flex-1 pt-16">
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-black" />
              </div>
              <div className="h-0.5 w-12 bg-gray-500"></div>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-black" />
              </div>
              <div className="h-0.5 w-12 bg-gray-500"></div>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-black" />
              </div>
              <div className="h-0.5 w-12 bg-gray-500"></div>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-black" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Welcome, Basanth.<br />
                Let's get set up.
              </h1>
              
              <p className="text-xl mb-8">
                You're only a few steps away from setting up your company's Uber for Business account. With a single platform, you can create programs to meet all your employees' or customers' travel, meal, and gifting needs.
              </p>
              
              <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 h-auto text-lg">
                Sign up your company
              </Button>
            </div>
            
            <div>
              <img 
                src="/lovable-uploads/b9ade165-692f-4705-b8b9-d35176141260.png" 
                alt="Business dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">What fits your company's needs?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/06c8f337-89b5-4bc8-b099-a774d4684871.png" 
                alt="Business travel" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/06c8f337-89b5-4bc8-b099-a774d4684871.png" 
                alt="Expense management" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/06c8f337-89b5-4bc8-b099-a774d4684871.png" 
                alt="Customer solutions" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/06c8f337-89b5-4bc8-b099-a774d4684871.png" 
                alt="Executive travel" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BusinessPage;
