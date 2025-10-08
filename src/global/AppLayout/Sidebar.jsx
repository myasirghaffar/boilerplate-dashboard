"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store";
import {
  DashboardIcon,
  LogoutIcon,
  XIcon,
  StudentIcon,
  TeacherIcon,
  FinancialIcon,
  ScheduleIcon,
  CalendarIcon,
  EvealuationlIcon,
  MessageIcon,
  RelationIcon,
  BookIcon,
} from "../../assets/icons";
import { main_logo } from "../../assets/logos";

function Sidebar({ isMobileSidebarOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileSidebarOpen &&
        !event.target.closest(".sidebar-content") &&
        !event.target.closest(".mobile-menu-button")
      ) {
        toggleSidebar();
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when mobile sidebar is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore scrolling when mobile sidebar is closed
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen, toggleSidebar]);

  // React Icons for sidebar navigation

  const getRoleBasedMenuItems = (role) => {
    const menu = {
      admin: {
        main: [
          { path: "/admin/dashboard", name: "Dashboard", icon: DashboardIcon },
          { path: "/admin/users", name: "User Management", icon: StudentIcon },
          { path: "/admin/jobs", name: "Job Management", icon: TeacherIcon },
          { path: "/admin/bids", name: "Bids Management", icon: EvealuationlIcon },
          { path: "/admin/work-orders", name: "Work Orders & Progress", icon: ScheduleIcon },
          { path: "/admin/payments", name: "Payment & Transfers", icon: FinancialIcon },
          { path: "/admin/ratings", name: "Ratings & Reviews", icon: CalendarIcon },
          { path: "/admin/reports", name: "Reports & Validations", icon: RelationIcon },
        ],
        bottom: [],
      },
      user: {
        main: [
          { path: "/user/dashboard", name: "Dashboard", icon: DashboardIcon },
          { path: "/user/jobs", name: "Job Management", icon: TeacherIcon },
          { path: "/user/bids", name: "Bids Management", icon: EvealuationlIcon },
          { path: "/user/work-orders", name: "Work Orders & Progress", icon: ScheduleIcon },
          { path: "/user/payments", name: "Payment & Transfers", icon: FinancialIcon },
          { path: "/user/ratings", name: "Ratings & Reviews", icon: CalendarIcon },
        ],
        bottom: [],
      },
      contractor: {
        main: [
          { path: "/contractor/dashboard", name: "Dashboard", icon: DashboardIcon },
          { path: "/contractor/jobs", name: "Job Management", icon: TeacherIcon },
          { path: "/contractor/bids", name: "Bids Management", icon: EvealuationlIcon },
          { path: "/contractor/work-orders", name: "Work Orders & Progress", icon: ScheduleIcon },
          { path: "/contractor/payments", name: "Payment & Transfers", icon: FinancialIcon },
          { path: "/contractor/ratings", name: "Ratings & Reviews", icon: CalendarIcon },
          { path: "/contractor/reports", name: "Reports & Validations", icon: RelationIcon },
        ],
        bottom: [],
      },
    };

    return menu[role] || {};
  };
  const currentRole = useSelector((state) => state.auth.user?.role);

  // Extract role from URL path as fallback
  const getRoleFromPath = (pathname) => {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/user")) return "user";
    if (pathname.startsWith("/contractor")) return "contractor";
    return null;
  };

  // Use URL-based role detection first, then Redux role as fallback
  const urlBasedRole = getRoleFromPath(location.pathname);
  const detectedRole = urlBasedRole || currentRole;

  // Map role values to menu keys
  const roleName =
    detectedRole === "admin"
      ? "admin"
      : detectedRole === "user"
      ? "user"
      : detectedRole === "contractor"
      ? "contractor"
      : null;

  // Additional fallback for role detection based on URL
  const finalRoleName =
    roleName ||
    (location.pathname.startsWith("/user")
      ? "user"
      : location.pathname.startsWith("/contractor")
      ? "contractor"
      : "admin");

  const menuItems = getRoleBasedMenuItems(finalRoleName);

  // Fallback for testing - if no role is detected, show appropriate menu based on URL
  const finalMenuItems = menuItems?.main
    ? menuItems
    : location.pathname.startsWith("/user")
    ? getRoleBasedMenuItems("user")
    : location.pathname.startsWith("/contractor")
    ? getRoleBasedMenuItems("contractor")
    : getRoleBasedMenuItems("admin");

  // Utility function to render NavLink items
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const handleClickMobile = () => {
    if (isMobile) {
      toggleSidebar(); // your custom function
    }
  };

  const toggleMenuExpansion = (parentName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [parentName]: !prev[parentName],
    }));
  };
  const renderNavLink = (item, extraClasses = "") => {
    // Check if this item should be active based on current location
    const isActive =
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/");

    return (
      <div
        onClick={() => {
          handleClickMobile();
          // Navigate to the item path using React Router
          navigate(item.path);
        }}
        className={`
          flex items-center w-full h-[42px] pl-[10px] pr-4 gap-[10px] group transition-all duration-200 relative rounded-md cursor-pointer
          ${
            isActive
              ? "bg-secondary text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white"
          }
          ${extraClasses}
        `}
      >
        {/* Active state left indicator bar */}
        {/* {isActive && (
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#14F195] to-[#9945FF] rounded-l-md"></div>
        )} */}

        {/* Only show icon if item has no parent (not a nested item) */}
        {!item.parent && item.icon && (
          <div
            className={`w-5 h-5 flex items-center justify-center ${
              isActive ? "text-white" : "text-white/70"
            }`}
          >
            <item.icon />
          </div>
        )}
        <span className="text-[1.125rem] font-normal leading-[25px] font-poppins">
          {item.name}
        </span>
        {item.badge && (
          <span className="ml-auto bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  const renderSidebarContent = () => {
    // Group menu items by parent for nested structure
    const groupedMenuItems = {};
    const standaloneItems = [];
    const processedParents = new Set();

    finalMenuItems?.main?.forEach((item) => {
      if (item.parent) {
        if (!groupedMenuItems[item.parent]) {
          groupedMenuItems[item.parent] = [];
        }
        groupedMenuItems[item.parent].push(item);
      } else {
        standaloneItems.push(item);
      }
    });

    return (
      <div className="sidebar-content w-[18.5625rem] bg-primary-500 flex flex-col h-[100vh] relative pl-0 sm:pl-4 py-0 sm:py-4">
        <div className="bg-primary-500 rounded-lg flex flex-col h-full">
          {/* Mobile close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden z-50"
          >
            <XIcon size={20} />
          </button>

          {/* Brand Section */}
          <div className="py-1 px-6">
            <h1 className="text-white text-xl font-bold font-poppins tracking-wide">
              <img src={main_logo} alt="Logo" className="w-32 h-32" />
            </h1>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4">
            <div className="space-y-1">
              {/* Render items in order, checking for parent groups */}
              {finalMenuItems?.main?.map((item, index) => {
                // If this item has a parent and we haven't processed this parent yet
                if (item.parent && !processedParents.has(item.parent)) {
                  processedParents.add(item.parent);
                  const children = groupedMenuItems[item.parent];
                  const hasActiveChild = children.some(
                    (child) =>
                      location.pathname === child.path ||
                      location.pathname.startsWith(child.path + "/")
                  );
                  const isExpanded = expandedMenus[item.parent];

                  return (
                    <div key={`parent-${item.parent}`} className="space-y-1">
                      {/* Parent header */}
                      <div
                        onClick={() => toggleMenuExpansion(item.parent)}
                        className={`flex items-center w-full h-[42px] pl-[10px] pr-4 gap-[10px] group transition-all duration-200 relative rounded-md cursor-pointer ${
                          hasActiveChild
                            ? "bg-secondary text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center ${
                            hasActiveChild ? "text-white" : "text-white/70"
                          }`}
                        >
                          <TeacherIcon />
                        </div>
                        <span className="text-[1.125rem] font-normal leading-[25px] font-poppins">
                          {item.parent}
                        </span>
                        <div className="ml-auto">
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-90" : ""
                            } ${
                              hasActiveChild ? "text-white" : "text-white/70"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Children items - only show when expanded */}
                      {isExpanded && (
                        <div className="space-y-1">
                          {children.map((child, childIndex) => (
                            <div
                              key={`child-${item.parent}-${childIndex}`}
                              className="ml-6"
                            >
                              {renderNavLink(child, "text-sm")}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // If this is a standalone item (no parent), render it normally
                if (!item.parent) {
                  return <div key={index}>{renderNavLink(item)}</div>;
                }

                // If this item has a parent but we've already processed the parent, skip it
                return null;
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="space-y-1">
              {finalMenuItems?.bottom?.map((item, index) => (
                <div key={index}>{renderNavLink(item)}</div>
              ))}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full h-[42px] pl-[10px] pr-4 gap-[10px] text-gray-700 rounded-lg bg-white hover:bg-white/90 transition-all duration-200"
            >
              <span className="text-sm font-medium leading-[1.5625rem] font-poppins">
                Logout
              </span>
              <div className="w-5 h-5 flex items-center justify-center">
                <LogoutIcon color="text-gray-600 text-[1.4375rem]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - always visible on larger screens */}
      <aside className="hidden md:block mt-0 bg-primary-500">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar - only visible when toggled */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {renderSidebarContent()}
      </aside>

      {/* Overlay when mobile sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;
