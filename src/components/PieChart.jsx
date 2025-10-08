import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const PieChart = ({
  title = "Assiduidade",
  data = [],
  centerText = "80%",
  colors = ["#58398D", "#EA5B28"], // Using primary purple and secondary orange from tailwind config
  dropdownOptions = {
    month: [
      { label: "Abr 2025", value: "apr2025" },
      { label: "Mar 2025", value: "mar2025" },
      { label: "Fev 2025", value: "fev2025" },
      { label: "Jan 2025", value: "jan2025" },
    ],
    class: [
      { label: "Turma A", value: "classA" },
      { label: "Turma B", value: "classB" },
      { label: "Turma C", value: "classC" },
    ],
  },
  onMonthChange,
  onClassChange,
  showOptions = true,
  height,
  innerRadius,
  outerRadius,
}) => {
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    dropdownOptions.month?.[0] || { label: "Abr 2025", value: "apr2025" }
  );
  const [selectedClass, setSelectedClass] = useState(
    dropdownOptions.class?.[0] || { label: "Turma A", value: "classA" }
  );

  // Default data if none provided
  const defaultData = [
    { name: "Presente", value: 80, color: colors[0] },
    { name: "Ausente", value: 20, color: colors[1] },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Calculate total for percentage display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const primaryValue = chartData[0]?.value || 0;
  const primaryPercentage =
    total > 0 ? Math.round((primaryValue / total) * 100) : 0;

  return (
    <div className="bg-white h-full rounded-[1.5rem] flex flex-col justify-between p-3 lg:p-[1.25rem]  border border-gray-100 relative">
      {/* Header with title and options */}
      <div className="flex items-center justify-between mb-0">
        <h3 className="text-[1.25rem] font-semibold text-gray-800">{title}</h3>
        {showOptions && (
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                stroke="#292D32"
                stroke-width="1.5"
              />
              <path
                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                stroke="#292D32"
                stroke-width="1.5"
              />
              <path
                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                stroke="#292D32"
                stroke-width="1.5"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 text-xs mb-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center text-xs gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-600 text-[0.75rem] font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Chart container */}
      <div
        className="relative flex items-center justify-center mb-2"
        style={{ minHeight: 100 }}
      >
        <ResponsiveContainer width="100%" height={height ? height : 200}>
          <RechartsPieChart>
            {/* Orange background circle */}
            <Pie
              data={[{ name: "background", value: 100, color: colors[1] }]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius ? innerRadius : 45}
              outerRadius={outerRadius ? outerRadius : 70}
              stroke="none"
              cornerRadius={8}
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={colors[1]} stroke="none" />
            </Pie>
            {/* Purple segment overlay */}
            <Pie
              data={[
                {
                  name: "Presente",
                  value: chartData[0]?.value || 80,
                  color: colors[0],
                },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius ? innerRadius : 45}
              outerRadius={outerRadius ? outerRadius : 70}
              stroke="none"
              cornerRadius={8}
              startAngle={90}
              endAngle={90 + (chartData[0]?.value || 80) * 3.6}
            >
              <Cell fill={colors[0]} stroke="none" />
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        <span
          className="absolute font-bold text-gray-800 text-[1.25rem] left-1/2 top-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {centerText || `${primaryPercentage}%`}
        </span>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-2 ">
        {/* Month Dropdown */}
        {dropdownOptions.month && (
          <div className="relative flex-1 min-w-[6rem]">
            <button
              className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
              onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              type="button"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate">{selectedMonth.label}</span>
              <svg
                className="w-4 h-4 flex-shrink-0 ml-auto"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {monthDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {dropdownOptions.month.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50 ${
                      selectedMonth.value === option.value
                        ? "font-semibold text-primary-500 bg-primary-50"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedMonth(option);
                      setMonthDropdownOpen(false);
                      onMonthChange?.(option);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Class Dropdown */}
        {dropdownOptions.class && (
          <div className="relative flex-1 min-w-[96px]">
            <button
              className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              type="button"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.083 12.083 0 01.665-6.479L12 14z"
                />
              </svg>
              <span className="truncate">{selectedClass.label}</span>
              <svg
                className="w-4 h-4 flex-shrink-0 ml-auto"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {classDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {dropdownOptions.class.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-50 ${
                      selectedClass.value === option.value
                        ? "font-semibold text-primary-500 bg-primary-50"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedClass(option);
                      setClassDropdownOpen(false);
                      onClassChange?.(option);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;
