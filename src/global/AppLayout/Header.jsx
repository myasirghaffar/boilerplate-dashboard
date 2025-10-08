import {
  BellIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import { Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store";
import { BASE_URL } from "../../services/ApiEndpoints";
import { useGetDriverAlertReminderQuery } from "../../services/driver/driverApi";
import {
  DashboardIcon,
  OrdersIcon,
  TicketsIcon,
  StaffIcon,
  SettingsIcon,
  NotificationIcon2,
  MessageIcon,
  SearchIcon
} from "../../assets/icons/icons";
import Perfil from "../../assets/images/Perfil.jpg";

function Header({ toggleSidebar }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.auth.user?.role);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const { data: alertsData } = useGetDriverAlertReminderQuery();
  const unreadCount =
    alertsData?.data?.alerts?.filter((alert) => !alert.read)?.length || 0;




  return (
    <header className="bg-gray-100 z-10 text-gray-800 md:ml-[18.5625rem] md:w-[calc(100%-18.5625rem)]">
      <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-4 min-h-[60px] md:min-h-[80px]">
        {/* Left Side - Search Bar */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative">
            <div className="md:w-56 lg:w-72 w-56 h-12 bg-gray-150 rounded-full flex items-center px-4 shadow-sm">
            <SearchIcon className="mr-0 flex-shrink-0 text-gray-500" />
              <input
                type="text"
                placeholder="Procurar"
                className="flex-1 bg-gray-150 text-gray-500 placeholder-gray-500 outline-none border-none focus:outline-none focus:ring-0 focus:border-none text-sm pr-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Mobile Menu Button and Desktop Elements */}
        <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
          {/* Mobile Menu Button - Positioned at the far right */}
          <button
            onClick={toggleSidebar}
            className="block md:hidden bg-[#171D41] hover:bg-[#2a3342] text-white rounded-lg p-2 border border-[#EDEDED33] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>


          {/* Desktop Elements - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative group">
              <div className="w-10 h-10 bg-gray-150 rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary-200 transition-colors">
                <NotificationIcon2 className="w-5 h-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
            </div>

            {/* Chat/Message Icon */}
            <div className="relative group">
              <div className="w-10 h-10 bg-gray-150 rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary-200 transition-colors">


                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 0.5H6C2.691 0.5 0 3.191 0 6.5V18.5C0 19.052 0.447 19.5 1 19.5H14C17.309 19.5 20 16.809 20 13.5V6.5C20 3.191 17.309 0.5 14 0.5ZM18 13.5C18 15.706 16.206 17.5 14 17.5H2V6.5C2 4.294 3.794 2.5 6 2.5H14C16.206 2.5 18 4.294 18 6.5V13.5Z" fill="#6E6D71" />
                  <path d="M7.49976 11.5C8.32818 11.5 8.99976 10.8284 8.99976 10C8.99976 9.17157 8.32818 8.5 7.49976 8.5C6.67133 8.5 5.99976 9.17157 5.99976 10C5.99976 10.8284 6.67133 11.5 7.49976 11.5Z" fill="#6E6D71" />
                  <path d="M12.4998 11.5C13.3282 11.5 13.9998 10.8284 13.9998 10C13.9998 9.17157 13.3282 8.5 12.4998 8.5C11.6713 8.5 10.9998 9.17157 10.9998 10C10.9998 10.8284 11.6713 11.5 12.4998 11.5Z" fill="#6E6D71" />
                </svg>

              </div>
            </div>

            {/* User Profile Icon */}
            <div className="relative group">
              <div className="w-10 h-10 bg-gray-150 rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary-200 transition-colors overflow-hidden">
                <img src={Perfil} alt="user" className="w-10 h-10" />
              </div>
            </div>


          </div>
        </div>
      </div>

    

      {/* <hr /> */}
    </header>
  );
}

export default Header;
