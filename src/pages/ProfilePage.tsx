
import { useState } from "react";
import { Star, LifeBuoy, Wallet, ClipboardList, User, Tag, LogOut, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Basanth PR</h1>
          
          <div className="flex items-center">
            <button className="p-2">
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <Star className="h-5 w-5 text-black mr-2" />
          <span className="text-xl font-bold">4.74</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <LifeBuoy className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Help</span>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <Wallet className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Wallet</span>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <ClipboardList className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Activity</span>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Uber Cash</h2>
            <span className="text-2xl font-bold">$0.00</span>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <button className="w-full flex items-center text-left py-3 hover:bg-gray-100 rounded-lg">
            <User className="h-6 w-6 mr-4" />
            <span className="text-lg">Manage account</span>
          </button>
          
          <button className="w-full flex items-center text-left py-3 hover:bg-gray-100 rounded-lg">
            <Tag className="h-6 w-6 mr-4" />
            <span className="text-lg">Promotions</span>
          </button>
        </div>
        
        <button className="w-full py-4 bg-gray-100 rounded-lg text-red-600 text-xl font-medium">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
