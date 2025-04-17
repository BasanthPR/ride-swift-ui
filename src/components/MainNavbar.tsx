
import { Link } from "react-router-dom";
import { Search, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const MainNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 h-16">
      <div className="h-full mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white font-bold text-2xl">
            Uber
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/ride" className="text-white hover:text-gray-300 transition-colors">
              Ride
            </Link>
            <Link to="/drive" className="text-white hover:text-gray-300 transition-colors">
              Drive
            </Link>
            <Link to="/business" className="text-white hover:text-gray-300 transition-colors">
              Business
            </Link>
            <Link to="/deliver" className="text-white hover:text-gray-300 transition-colors">
              Uber Eats
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors flex items-center">
                About <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem>
                  <Link to="/about-us" className="w-full">About us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/how-uber-works" className="w-full">How Uber works</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/newsroom" className="w-full">Newsroom</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/investors" className="w-full">Investors</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Uber.com"
              className="py-2 pl-10 pr-4 bg-gray-100 text-black rounded-full w-full max-w-xs focus:outline-none"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="text-white">
            <Globe className="h-5 w-5 mr-2" />
            EN
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white">
            Help
          </Button>
          
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-white">
              Log in
            </Button>
          </Link>
          
          <Link to="/signup">
            <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-100">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
