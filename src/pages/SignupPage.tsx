
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Apple } from "lucide-react";

const SignupPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-black p-4">
        <Link to="/" className="text-white font-bold text-2xl">
          Uber
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Sign up to ride</h1>
            <p className="text-gray-600">
              Create an account to get moving with Uber.
            </p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter phone number or email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
            
            <Button className="w-full bg-black hover:bg-gray-800 text-white p-4 h-auto text-base">
              Continue
            </Button>
            
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border-gray-300 p-4 h-auto text-base"
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google logo" 
                className="h-5 w-5"
              />
              Continue with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border-gray-300 p-4 h-auto text-base"
            >
              <Apple className="h-5 w-5" />
              Continue with Apple
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mt-6 text-center">
            By continuing, you agree to Uber's <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-black font-semibold">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
