import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Printerbutton, Downloadbutton } from "../../assets/icons";

const CalenderTableReusable = ({
  // Calendar configuration
  initialDate = new Date(2025, 10, 1), // November 2025 as default
  months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  daysOfWeek = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"],

  // Events data
  events = [],

  // Styling and behavior
  showActionButtons = true,
  showMonthPicker = true,
  showPrintButton = true,
  showDownloadButton = true,

  // Custom handlers
  onPrint = () => {
    console.log("Print calendar");
    window.print();
  },
  onDownload = () => {
    console.log("Download calendar");
  },
  onDateClick = null,
  onEventClick = null,

  // Custom styling
  className = "",
  headerClassName = "",
  gridClassName = "",
  dayClassName = "",
  eventClassName = "",

  // Custom today date
  todayDate = null,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [showMonthPickerDropdown, setShowMonthPickerDropdown] = useState(false);

  // Close month picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".month-picker-container")) {
        setShowMonthPickerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrint = () => {
    onPrint();
  };

  const handleDownload = () => {
    onDownload();
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPickerDropdown(false);
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (onDateClick && isCurrentMonth) {
      onDateClick(day, currentDate);
    }
  };

  const handleEventClick = (event, day) => {
    if (onEventClick) {
      onEventClick(event, day, currentDate);
    }
  };

  const handleYearChange = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Add days from next month to fill the grid
    const remainingCells = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push(day);
    }

    return days;
  };

  // Helper function to get events for a specific day
  const getEventsForDay = (day, month, year) => {
    if (!events || events.length === 0) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  // Helper function to check if a date is today
  const isToday = (day, month, year) => {
    if (todayDate) {
      const today = new Date(todayDate);
      return (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
    }

    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    <div className={`${className}`}>
      {/* Header with navigation and icons */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4 ${headerClassName}`}
      >
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col sm:hidden w-full gap-4">
          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={handlePreviousMonth}
              className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Month/Year Display */}
            {showMonthPicker && (
              <div className="relative month-picker-container flex-1 max-w-xs">
                <button
                  onClick={() =>
                    setShowMonthPickerDropdown(!showMonthPickerDropdown)
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors w-full"
                >
                  <h2 className="text-base font-medium text-gray-800 text-center truncate">
                    {months[currentMonth]} {currentYear}
                  </h2>
                </button>

                {/* Month Picker Dropdown */}
                {showMonthPickerDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-80">
                    <div className="p-4">
                      {/* Month Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {months.map((month, index) => (
                          <button
                            key={index}
                            onClick={() => handleMonthSelect(index)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${index === currentMonth
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                              }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>

                      {/* Year Selection */}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleYearChange(currentYear - 1)}
                            className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">
                            <span className="text-lg font-semibold text-gray-800">
                              {currentYear}
                            </span>
                          </div>
                          <button
                            onClick={() => handleYearChange(currentYear + 1)}
                            className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleNextMonth}
              className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Action Buttons - Mobile */}
          {showActionButtons && (
            <div className="flex items-center justify-center gap-4">
              {showPrintButton && (
                <button
                  onClick={handlePrint}
                  className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src={Printerbutton}
                    alt="Print"
                    className="w-6 h-6 text-black"
                  />
                </button>
              )}
              {showDownloadButton && (
                <button
                  onClick={handleDownload}
                  className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src={Downloadbutton}
                    alt="Download"
                    className="w-6 h-6 text-black"
                  />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden sm:flex items-center justify-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 flex-1">
          {/* Previous Month Button */}
          <button
            onClick={handlePreviousMonth}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Month/Year Display and Picker */}
          {showMonthPicker && (
            <div className="relative month-picker-container flex-1 max-w-sm md:max-w-md lg:max-w-lg">
              <button
                onClick={() =>
                  setShowMonthPickerDropdown(!showMonthPickerDropdown)
                }
                className="flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors w-full"
              >
                <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-800 text-center truncate">
                  {months[currentMonth]} {currentYear}
                </h2>
              </button>

              {/* Month Picker Dropdown */}
              {showMonthPickerDropdown && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2  border border-gray-200 rounded-lg shadow-xl z-50 w-80 md:w-96">
                  <div className="p-4">
                    {/* Month Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {months.map((month, index) => (
                        <button
                          key={index}
                          onClick={() => handleMonthSelect(index)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${index === currentMonth
                              ? "bg-orange-500 text-white shadow-md"
                              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>

                    {/* Year Selection */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleYearChange(currentYear - 1)}
                          className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                          <span className="text-base md:text-lg font-semibold text-gray-800">
                            {currentYear}
                          </span>
                        </div>
                        <button
                          onClick={() => handleYearChange(currentYear + 1)}
                          className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next Month Button */}
          <button
            onClick={handleNextMonth}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Action Icons - Desktop Right Side */}
        {showActionButtons && (
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {showPrintButton && (
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  src={Printerbutton}
                  alt="Print"
                  className="w-5 h-5 text-black"
                />
              </button>
            )}
            {showDownloadButton && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  src={Downloadbutton}
                  alt="Download"
                  className="w-5 h-5 text-black"
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator for Mobile */}
      <div className="block sm:hidden mb-2">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Deslize para ver o calendário completo</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Calendar Grid Container with Scroll */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <div
          className={`grid grid-cols-7 overflow-hidden min-w-[700px] ${gridClassName}`}
        >
          {/* Day headers */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className=" p-3 sm:p-4 text-center border-b border-gray-200"
            >
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                {day}
              </span>
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            const isCurrentMonth =
              index >= 0 &&
              day !== null &&
              (index < 7 ||
                day <= new Date(currentYear, currentMonth + 1, 0).getDate());
            const isTodayDate = isToday(day, currentMonth, currentYear);
            const dayEvents = getEventsForDay(day, currentMonth, currentYear);

            return (
              <div
                key={index}
                onClick={() => handleDateClick(day, isCurrentMonth)}
                className={` min-h-[70px] sm:min-h-[90px] h-40 p-2 sm:p-3 relative hover:bg-gray-50 transition-colors cursor-pointer border-r border-b border-gray-200 ${(index + 1) % 7 === 0 ? "border-r-0" : ""
                  } ${!isCurrentMonth ? "text-gray-300 bg-gray-50" : "text-gray-700"
                  } ${isTodayDate ? "bg-orange-50 border-2 border-orange-300" : ""
                  } ${dayClassName}`}
              >
                {day && (
                  <>
                    <div className="text-sm sm:text-base font-medium text-gray-600 text-right mb-2">
                      {day.toString().padStart(2, "0")}
                    </div>

                    {/* Events */}
                    {dayEvents.length > 0 && (
                      <div className="space-y-1">
                        {dayEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event, day);
                            }}
                            className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs p-2 rounded-lg text-center shadow-sm cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-colors ${eventClassName}`}
                          >
                            {event.title || event.name || "Event"}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalenderTableReusable;
