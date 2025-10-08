import React, { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

const ReusableFilter = ({
  // Search configuration
  searchConfig = null,

  // Filter dropdowns configuration
  filters = [],

  // Data to filter
  data = [],

  // Event handlers
  onFilterChange,
  onSearchChange,
  onFilteredDataChange,

  // Styling
  className = "",
  searchClassName = "",
  filterClassName = "",
  dropdownClassName = "",

  // Action buttons
  actionButtons = [],

  // Layout options
  layout = "horizontal",
  gap = "gap-4",

  // Advanced options
  searchFields = [],
  caseSensitive = false,
  debounceMs = 300,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleDropdown = (filterKey) => {
    setOpenDropdowns((prev) => {
      // Close all other dropdowns first
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });

      // Toggle the clicked dropdown
      newState[filterKey] = !prev[filterKey];

      return newState;
    });
  };

  const handleFilterSelect = (filterKey, value) => {
    console.log("🔍 Filter selected:", filterKey, "=", value);

    const newFilters = {
      ...selectedFilters,
      [filterKey]: value,
    };

    setSelectedFilters(newFilters);
    onFilterChange?.(filterKey, value);

    setOpenDropdowns((prev) => ({
      ...prev,
      [filterKey]: false,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  // Filter data based on search and filters
  React.useEffect(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      const searchLower = caseSensitive ? searchTerm : searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        const fieldsToSearch =
          searchFields.length > 0 ? searchFields : Object.keys(item);

        return fieldsToSearch.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            const itemValue = caseSensitive ? value : value.toLowerCase();
            return itemValue.includes(searchLower);
          }
          return false;
        });
      });
    }

    // Apply dropdown filters
    Object.entries(selectedFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue && filterValue !== "") {
        filtered = filtered.filter((item) => {
          const itemValue = item[filterKey];
          return (
            itemValue === filterValue ||
            (typeof itemValue === "string" &&
              typeof filterValue === "string" &&
              itemValue.toLowerCase() === filterValue.toLowerCase())
          );
        });
      }
    });

    onFilteredDataChange?.(filtered);
  }, [
    data,
    searchTerm,
    selectedFilters,
    searchFields,
    caseSensitive,
    onFilteredDataChange,
  ]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const containerClasses =
    layout === "vertical"
      ? `flex flex-col ${gap} w-full ${className}`
      : `flex flex-wrap items-center ${gap} w-full lg:w-auto ${className}`;

  return (
    <div className={containerClasses}>
      {/* Search Bar */}
      {searchConfig && (
        <div className={`relative ${searchClassName}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                searchConfig.placeholder || "Pesquise por nome oucurso."
              }
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[0.75rem] font-poppins placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  onSearchChange?.("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Dropdowns */}
      {filters.length > 0 && (
        <div className={`flex flex-wrap items-center gap-2 ${filterClassName}`}>
          {filters.map((filter, index) => (
            <div key={filter.key} className="relative filter-dropdown">
              <button
                onClick={() => toggleDropdown(filter.key)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors min-w-[120px] justify-between whitespace-nowrap text-[0.75rem] font-poppins ${
                  selectedFilters[filter.key]
                    ? "bg-primary-50 border-primary-200 text-primary-700"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                <span className="font-normal truncate">
                  {filter.options?.find(
                    (opt) => opt.value === selectedFilters[filter.key]
                  )?.label || filter.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                    openDropdowns[filter.key] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {openDropdowns[filter.key] && (
                <div
                  className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] max-h-60 overflow-y-auto ${
                    index === filters.length - 1 ? "right-0" : "left-0"
                  } ${dropdownClassName}`}
                >
                  {/* Dropdown Options */}
                  {filter.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleFilterSelect(filter.key, option.value)
                      }
                      className={`w-full text-left px-4 py-3 text-[0.75rem] font-poppins text-gray-700 hover:bg-gray-50 transition-colors ${
                        selectedFilters[filter.key] === option.value
                          ? "bg-primary-50 text-primary-700"
                          : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {actionButtons.length > 0 && (
        <div className="flex items-center gap-2">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-poppins text-[0.75rem] transition-colors ${
                button.variant === "primary"
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : button.variant === "secondary"
                  ? "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  : button.variant === "outline"
                  ? "bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50"
                  : "bg-primary-500 text-white hover:bg-primary-600"
              } ${button.className || ""}`}
            >
              {button.icon && <button.icon className="w-4 h-4" />}
              <span className="font-medium">{button.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReusableFilter;
