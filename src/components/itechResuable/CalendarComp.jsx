import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Reusable Calendar component
// Props allow customizing labels, default date/selection, styles and agenda items
const Calendar = ({
  initialDate = new Date(2025, 10, 19),
  selectedDay = 19,
  onMonthChange,
  onDaySelect,
  monthNames = [
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
  dayNames = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"],
  selectedDayClasses = "bg-secondary text-white rounded-full",
  dayClasses = "text-gray-800",
  showAgenda = true,
  agendaTitle = "Agenda",
  agendaItems: agendaItemsProp,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentSelectedDay, setCurrentSelectedDay] = useState(selectedDay);

  // Keep internal state in sync if parent changes props
  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);
  useEffect(() => {
    setCurrentSelectedDay(selectedDay);
  }, [selectedDay]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Adjust for Monday start (SEG = 0)
    const adjustedStartingDay = startingDay === 0 ? 6 : startingDay - 1;

    return { daysInMonth, startingDay: adjustedStartingDay };
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      // Inform parent of month change
      onMonthChange?.(newDate);
      return newDate;
    });
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-8"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = day === currentSelectedDay;
    days.push(
      <div
        key={day}
        className={`h-8 w-8 flex items-center justify-center text-[1rem] font-semibold ${
          isSelected ? selectedDayClasses : dayClasses
        }`}
        style={isSelected ? { backgroundColor: "#EA5B28" } : {}}
        onClick={() => {
          setCurrentSelectedDay(day);
          const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          onDaySelect?.(selectedDate);
        }}
      >
        {day}
      </div>
    );
  }

  const agendaItems = Array.isArray(agendaItemsProp)
    ? agendaItemsProp
    : defaultAgendaItems;

  return (
    <div>
      {/* Calendar Section */}
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-[0.875rem] font-normal text-black">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-6 flex items-center justify-center text-[0.625rem] text-[#B5BEC6] font-semibold"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
      <hr />
      {/* Agenda Section */}
      {showAgenda && (
        <div className="p-6">
          {/* Agenda Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[1.25rem]  text-gray-800">{agendaTitle}</h3>
            <button className="text-[0.625rem] text-gray-400 font-inter underline hover:text-gray-600">
              Todas
            </button>
          </div>

          {/* Agenda Items */}
          <div className="space-y-3">
            {agendaItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-[#C9C9C9]"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${item.iconBg}`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-normal text-[0.875rem] text-black mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[0.625rem] font-normal text-[#969696] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
