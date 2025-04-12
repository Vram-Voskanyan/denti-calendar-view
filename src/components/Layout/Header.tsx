
import React from "react";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Calendar, Stethoscope, UserCog } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-dentist-border bg-white">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-8 h-8 text-dentist-primary" />
          <h1 className="text-xl font-bold text-dentist-primary">DentalCare Appointments</h1>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Appointments
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/doctors/appointments">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="flex items-center">
                    <UserCog className="mr-2 h-4 w-4" />
                    Doctors
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
