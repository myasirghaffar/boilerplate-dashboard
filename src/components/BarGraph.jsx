import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarGraph = ({
  title = "Desempenho",
  data = [],
  dataKeys = ["presencas", "ausencias"],
  dataLabels = ["Aprovado", "Reprovado"],
  colors = ["#58398D", "#EA5B28"], // Using primary purple and secondary orange from tailwind config
  dropdownOptions = {
    month: [
      { label: "Janeiro", value: "jan" },
      { label: "Fevereiro", value: "fev" },
      { label: "Março", value: "mar" },
      { label: "Abril", value: "abr" },
      { label: "Maio", value: "mai" },
    ],
    course: [
      { label: "Curso 1", value: "course1" },
      { label: "Curso 2", value: "course2" },
      { label: "Curso 3", value: "course3" },
    ],
  },
  onMonthChange,
  onCourseChange,
  height = 300,
  showTooltip = true,
  pedagogical = false,
}) => {
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    dropdownOptions.month?.[0] || { label: "Mês", value: "jan" }
  );
  const [selectedCourse, setSelectedCourse] = useState(
    dropdownOptions.course?.[0] || { label: "Curso", value: "course1" }
  );

  // Sample data structure if none provided
  const defaultData = [
    { name: "JAN", presencas: 70, ausencias: 75 },
    { name: "FEV", presencas: 78, ausencias: 85 },
    { name: "MAR", presencas: 80, ausencias: 100 },
    { name: "ABR", presencas: 95, ausencias: 80 },
    { name: "MAI", presencas: 75, ausencias: 80 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Handle screen resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive dx value for month label positioning
  const getResponsiveDx = () => {
    if (screenWidth <= 480) return 8; // xs: mobile
    if (screenWidth <= 640) return 12; // sm: small mobile
    if (screenWidth <= 768) return 15; // md: tablet
    if (screenWidth <= 1024) return 20; // lg: small desktop
    if (screenWidth <= 1280) return 25; // xl: desktop
    if (screenWidth <= 1536) return 30; // 2xl: large desktop
    return 55; // 3xl+: extra large
  };

  const getResponsiveDxPedagogical = () => {
    if (screenWidth <= 480) return 8; // xs: mobile
    if (screenWidth <= 640) return 12; // sm: small mobile
    if (screenWidth <= 768) return 15; // md: tablet
    if (screenWidth <= 1024) return 20; // lg: small desktop
    if (screenWidth <= 1280) return 25; // xl: desktop
    if (screenWidth <= 1536) return 30; // 2xl: large desktop
    return 20; // 3xl+: extra large
  };
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg px-4 py-3 shadow-lg border border-gray-200">
          <p className="text-gray-800 text-[0.625rem] font-medium mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-[0.625rem]"
              style={{ color: entry.color }}
            >
              {dataLabels[index]}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = () => (
    <div className="flex items-center gap-4">
      {dataKeys.map((key, index) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: colors[index] }}
          ></div>
          <span className="text-black text-[0.625rem] font-semibold">
            {dataLabels[index]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-[1.5rem] p-4 lg:p-6 border border-gray-100 w-full relative">
      {/* Header with title and dropdowns */}
      <div className="flex flex-col gap-3 mb-4 lg:mb-6">
        <div className="flex justify-between flex-row gap-3 mb-2 lg:mb-2">
          {/* Title */}
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
            {title}
          </h3>
          {/* Dropdowns */}
          <div className="flex gap-2 flex-wrap">
            {/* Month Dropdown */}
            {dropdownOptions.month && (
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
                  onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                  type="button"
                >
                  <span className="truncate">{selectedMonth.label}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {dropdownOptions.month.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-gray-50 ${
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

            {/* Course Dropdown */}
            {dropdownOptions.course && (
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
                  onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                  type="button"
                >
                  <span className="truncate">{selectedCourse.label}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                {courseDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {dropdownOptions.course.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-gray-50 ${
                          selectedCourse.value === option.value
                            ? "font-semibold text-primary-500 bg-primary-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedCourse(option);
                          setCourseDropdownOpen(false);
                          onCourseChange?.(option);
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
        {/* Legend and Dropdowns Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Legend */}
          <div className="flex-shrink-0">
            <CustomLegend />
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 20,
          }}
          barCategoryGap="10%"
        >
          {/* Y-axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#B5BEC6",
              fontSize: 10,
              fontWeight: 600,
            }}
            width={40}
            allowDecimals={false}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => `${value}%`}
            tickMargin={40}
          />

          {/* Grid lines */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
            horizontal={true}
            x={60}
            width="95%"
          />

          {/* Tooltip */}
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              allowEscapeViewBox={{ x: false, y: false }}
            />
          )}

          {/* X-axis */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#B5BEC6",
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "Inter",
              dx: pedagogical
                ? getResponsiveDxPedagogical()
                : getResponsiveDx(),
            }}
            scale="band"
            tickMargin={10}
            interval={0}
            padding={{ left: 0, right: 0 }}
          />

          {/* Bars */}
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index]}
              radius={[10, 10, 10, 10]}
              barSize={screenWidth <= 768 ? 13 : screenWidth <= 1024 ? 13 : 13}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
