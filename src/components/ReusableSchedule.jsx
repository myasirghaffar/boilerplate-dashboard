import React from "react";
import { PiPencilSimple } from "react-icons/pi";

const ReusableSchedule = ({
  // Schedule data configuration
  scheduleData = [], // Array of schedule entries
  timeSlots = [], // Array of time slots
  days = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"],

  // Color configuration - Only for specific subjects with two colors
  subjectColors = {
    // Orange subjects (#EA5B28)
    Química: "bg-orange-600 text-white",
    Matemática: "bg-orange-600 text-white",
    Física: "bg-orange-600 text-white",
    História: "bg-orange-600 text-white",
    Geografia: "bg-orange-600 text-white",
    Biologia: "bg-orange-600 text-white",

    // Purple subjects (#58398D)
    Português: "bg-purple-800 text-white",
    Desenho: "bg-purple-800 text-white",
    Inglês: "bg-purple-800 text-white",

    // Default fallback for any other subjects
    default: "bg-gray-500 text-white",
  },

  // Styling options
  className = "",
  headerClassName = "",
  cellClassName = "",

  // Event handlers
  onCellClick = null,
  onSubjectClick = null,
  onEmptyCellClick = null,

  // Display options
  showTimeSlots = true,
  compact = false,
  showEditIcon = false, // New prop to control pencil icon visibility
}) => {
  // Default time slots if not provided
  const defaultTimeSlots = [
    "7h30 às 9h30",
    "9h30 às 11h30",
    "11h30 às 13h30",
    "13h30 às 15h30",
    "15h30 às 17h30",
    "17h30 às 19h30",
  ];

  const timeSlotsToUse = timeSlots.length > 0 ? timeSlots : defaultTimeSlots;

  // Function to get subject color class
  const getSubjectColor = (subject) => {
    if (!subject) return "bg-white text-gray-800";

    const color =
      subjectColors[subject] ||
      subjectColors.default ||
      "bg-gray-500 text-white";
    console.log(`Subject: "${subject}", Color: "${color}"`);

    return color;
  };

  // Function to get schedule entry for specific day and time slot
  const getScheduleEntry = (dayIndex, timeSlotIndex) => {
    return scheduleData.find(
      (entry) => entry.day === dayIndex && entry.timeSlot === timeSlotIndex
    );
  };

  // Function to handle cell click
  const handleCellClick = (dayIndex, timeSlotIndex, entry) => {
    if (entry && onCellClick) {
      onCellClick(dayIndex, timeSlotIndex, entry);
    } else if (!entry && onEmptyCellClick) {
      onEmptyCellClick(dayIndex, timeSlotIndex);
    }
  };

  // Function to handle subject click
  const handleSubjectClick = (entry, event) => {
    event.stopPropagation();
    if (onSubjectClick) {
      onSubjectClick(entry);
    }
  };

  return (
    <div
      className={`bg-white rounded-1  xl shadow-sm overflow-hidden w-full ${className}`}
    >
      {/* Desktop Schedule Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 border border-[#D1D1D1] rounded-lg overflow-hidden w-full">
          {/* Header Row */}
          {days.map((day, index) => (
            <div
              key={index}
              className="bg-primary-500 text-white font-poppins font-normal text-center py-6 px-2 text-sm"
            >
              {day}
            </div>
          ))}

          {/* Time Slot Rows */}
          {timeSlotsToUse.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeIndex}>
              {/* Day Columns */}
              {days.map((day, dayIndex) => {
                const entry = getScheduleEntry(dayIndex, timeIndex);
                const subjectColor = getSubjectColor(entry?.subject);

                // Debug logging
                if (entry) {
                  console.log(`Entry found:`, entry);
                  console.log(
                    `Subject: "${entry.subject}", Color: "${subjectColor}"`
                  );
                }

                return (
                  <div
                    key={`${dayIndex}-${timeIndex}`}
                    className={`
                      border-r border-b border-gray-[#D1D1D1] min-h-[80px] p-2 cursor-pointer
                      transition-all duration-200 hover:bg-opacity-90
                      ${subjectColor}
                      ${compact ? "min-h-[60px]" : "min-h-[80px]"}
                      ${cellClassName}
                    `}
                    style={
                      entry
                        ? {
                            backgroundColor:
                              // Orange subjects (#EA5B28)
                              [
                                "Química",
                                "Matemática",
                                "Física",
                                "História",
                                "Geografia",
                                "Biologia",
                              ].includes(entry.subject)
                                ? "#EA5B28"
                                : // Purple subjects (#58398D)
                                ["Português", "Desenho", "Inglês"].includes(
                                    entry.subject
                                  )
                                ? "#58398D"
                                : // Default gray
                                  "#6b7280",
                            color: "white",
                          }
                        : {}
                    }
                    onClick={() => handleCellClick(dayIndex, timeIndex, entry)}
                  >
                    {entry ? (
                      <div className="h-full flex flex-col justify-center items-center text-center relative">
                        <div
                          className="font-poppins font-normal text-sm mb-1 cursor-pointer hover:underline"
                          onClick={(e) => handleSubjectClick(entry, e)}
                        >
                          {entry.subject}
                        </div>
                        <div className="font-poppins text-[0.75rem] opacity-90">
                          {entry.timeRange || timeSlot}
                        </div>
                        {entry.teacher && (
                          <div className="font-poppins text-[0.75rem] opacity-75 mt-1">
                            {entry.teacher}
                          </div>
                        )}
                        <div className="absolute top-1 right-1">
                          <PiPencilSimple className="w-3 h-3 text-white opacity-70" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        {showEditIcon && (
                          <PiPencilSimple className="w-6 h-6 text-[#AAADAD] hover:text-[#58398D] transition-colors" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Tablet Schedule Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-5 border border-[#D1D1D1] rounded-lg overflow-hidden w-full">
          {/* Header Row */}
          {days.slice(0, 5).map((day, index) => (
            <div
              key={index}
              className="bg-primary-500 text-white font-poppins font-normal text-center py-2 px-1 text-xs"
            >
              {day}
            </div>
          ))}

          {/* Time Slot Rows */}
          {timeSlotsToUse.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeIndex}>
              {/* Day Columns */}
              {days.slice(0, 5).map((day, dayIndex) => {
                const entry = getScheduleEntry(dayIndex, timeIndex);
                const subjectColor = getSubjectColor(entry?.subject);

                return (
                  <div
                    key={`${dayIndex}-${timeIndex}`}
                    className={`
                      border-r border-b border-[#D1D1D1] min-h-[70px] p-1 cursor-pointer
                      transition-all duration-200 hover:bg-opacity-90
                      ${subjectColor}
                      ${cellClassName}
                    `}
                    onClick={() => handleCellClick(dayIndex, timeIndex, entry)}
                  >
                    {entry ? (
                      <div className="h-full flex flex-col justify-center items-center text-center">
                        <div
                          className="font-poppins font-normal text-xs mb-1 cursor-pointer hover:underline"
                          onClick={(e) => handleSubjectClick(entry, e)}
                        >
                          {entry.subject}
                        </div>
                        <div className="font-poppins text-[0.75rem] opacity-90">
                          {entry.timeRange || timeSlot}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        {showEditIcon && (
                          <PiPencilSimple className="w-6 h-6 text-[#AAADAD] hover:text-[#58398D] transition-colors" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Schedule - List View */}
      <div className="block md:hidden">
        <div className="space-y-4 p-4 w-full">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-poppins font-normal text-sm text-primary-500 mb-3 text-center">
                {day}
              </h3>
              <div className="space-y-2">
                {timeSlotsToUse.map((timeSlot, timeIndex) => {
                  const entry = getScheduleEntry(dayIndex, timeIndex);
                  const subjectColor = getSubjectColor(entry?.subject);

                  return (
                    <div
                      key={`${dayIndex}-${timeIndex}`}
                      className={`
                        rounded-lg p-3 cursor-pointer transition-all duration-200
                        ${
                          entry
                            ? subjectColor
                            : "bg-white border border-[#D1D1D1]"
                        }
                        ${cellClassName}
                      `}
                      onClick={() =>
                        handleCellClick(dayIndex, timeIndex, entry)
                      }
                    >
                      {entry ? (
                        <div className="flex justify-between items-center">
                          <div>
                            <div
                              className="font-poppins font-normal text-sm cursor-pointer hover:underline"
                              onClick={(e) => handleSubjectClick(entry, e)}
                            >
                              {entry.subject}
                            </div>
                            {entry.teacher && (
                              <div className="font-poppins text-[0.75rem] opacity-75 mt-1">
                                {entry.teacher}
                              </div>
                            )}
                          </div>
                          <div className="font-poppins text-[0.75rem] opacity-90">
                            {entry.timeRange || timeSlot}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm font-poppins">
                            Livre
                          </span>
                          <span className="font-poppins text-[0.75rem] text-gray-500">
                            {timeSlot}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReusableSchedule;
