import React, { useState, useEffect } from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  Legend
} from 'recharts'
import { BsThreeDots } from 'react-icons/bs'

const LineChart = ({
  title = "Receita Anual",
  data = [],
  dataKeys = ["receita", "divida"],
  dataLabels = ["Receita Mensal", "Dívida Mensal"],
  colors = ["#58398D", "#EA5B28"], // Orange and Purple
  xAxisKey = "month",
  yAxisFormatter = (value) => `${value === 0 ? 0 : value+"k"}`,
  yAxisDomain = [0, 1000],
  yAxisTicks = [0, 250, 500, 750, 1000],
  height = 400,
  showTooltip = true,
  showLegend = true,
  showDropdowns = true,
  legendFlexCol,
  dropdownOptions,
  onYearChange,
  onPeriodChange,
  highlightPeriod = null, // { start: "Ago", end: "Set" }
  currency = "MT",
  showThreeDots= false
}) => {
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [selectedYear, setSelectedYear] = useState(dropdownOptions?.year?.[0] || { label: "2025 - 2026", value: "2025-2026" })
  const [selectedPeriod, setSelectedPeriod] = useState(dropdownOptions?.period?.[0] || { label: "Anual", value: "annual" })

  // Sample data structure if none provided
  const defaultData = [
    { month: "Jan", receita: 550, divida: 380 },
    { month: "Fev", receita: 850, divida: 550 },
    { month: "Mar", receita: 520, divida: 350 },
    { month: "Abr", receita: 650, divida: 450 },
    { month: "Mai", receita: 750, divida: 520 },
    { month: "Jun", receita: 650, divida: 400 },
    { month: "Jul", receita: 700, divida: 380 },
    { month: "Ago", receita: 850, divida: 500 },
    { month: "Set", receita: 600, divida: 600 },
    { month: "Out", receita: 720, divida: 450 },
    { month: "Nov", receita: 600, divida: 350 },
    { month: "Dez", receita: 950, divida: 600 }
  ]

  const chartData = data.length > 0 ? data : defaultData

  // Handle screen resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg px-4 py-3 shadow-lg border border-gray-200">
          <p className="text-gray-800 text-sm font-medium mb-2">{label} 14, 2025</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm" style={{ color: entry.color }}>
                {entry.value}.000{currency}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom legend component
  const CustomLegend = () => (
    <div className="flex items-center gap-4">
      {dataKeys.map((key, index) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className="w-[0.875rem] h-[0.875rem] rounded-full flex-shrink-0"
            style={{ backgroundColor: colors[index] }}
          ></div>
          <span className="text-gray-800 text-[0.75rem] md:text-[0.9375rem] xl:text-[0.75rem] font-semibold">{dataLabels[index]}</span>
        </div>
      ))}
    </div>
  )

  // Find highlight period indices
  const getHighlightIndices = () => {
    if (!highlightPeriod) return null

    const startIndex = chartData.findIndex(item => item[xAxisKey] === highlightPeriod.start)
    const endIndex = chartData.findIndex(item => item[xAxisKey] === highlightPeriod.end)

    if (startIndex === -1 || endIndex === -1) return null

    return { start: startIndex, end: endIndex }
  }

  const highlightIndices = getHighlightIndices()

  return (
    <div className="bg-white rounded-[1.5rem] p-4 lg:p-6 border border-gray-100 w-full relative">
      {/* Header with title, legend, and dropdowns */}
      <div className={`flex flex-col sm:flex-row md:flex-col ${legendFlexCol ? legendFlexCol : "lg:flex-row"} gap-3 mb-4 lg:mb-6`}>
        {/* Title */}
        <h3 className="text-[1.25rem] font-medium text-gray-800">{title}</h3>

        {/* Legend and Dropdowns Row */}
        <div className="flex flex-1 flex-col  md:flex-col lg:flex-row justify-between sm:flex-row items-start sm:items-center md:items-start lg:items-center sm:justify-between gap-3">
          {/* Legend */}
          {showLegend && (
            <div className="flex-shrink-0">
              <CustomLegend />
            </div>
          )}
{showThreeDots && (
            <BsThreeDots className="text-[20px] font-semibold hover:cursor-pointer" />
          )}
          {/* Dropdowns */}
          {showDropdowns && (
            <div className="flex gap-2 flex-wrap">
              {/* Year Dropdown */}
              {dropdownOptions?.year && (
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
                    onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                    type="button"
                  >
                    <span className="truncate">{selectedYear.label}</span>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {yearDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {dropdownOptions?.year?.map((option) => (
                        <button
                          key={option.value}
                          className={`w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-gray-50 ${selectedYear.value === option.value
                              ? "font-semibold text-primary-500 bg-primary-50"
                              : "text-gray-700"
                            }`}
                          onClick={() => {
                            setSelectedYear(option)
                            setYearDropdownOpen(false)
                            onYearChange?.(option)
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Period Dropdown */}
              {dropdownOptions?.period && (
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-gray-600 rounded-[0.375rem] font-normal text-[0.625rem] focus:outline-none select-none bg-gray-100 px-[0.3125rem] py-2 border-0 border-gray-200 hover:bg-gray-100 transition-colors w-full"
                    onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
                    type="button"
                  >
                    <span className="truncate">{selectedPeriod.label}</span>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {periodDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {dropdownOptions?.period?.map((option) => (
                        <button
                          key={option.value}
                          className={`w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-gray-50 ${selectedPeriod.value === option.value
                              ? "font-semibold text-primary-500 bg-primary-50"
                              : "text-gray-700"
                            }`}
                          onClick={() => {
                            setSelectedPeriod(option)
                            setPeriodDropdownOpen(false)
                            onPeriodChange?.(option)
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
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 20
          }}
        >
          {/* Y-axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#3C3C3C",
              fontSize: 15,
              fontWeight: 600
            }}
            width={40}
            allowDecimals={false}
            domain={yAxisDomain}
            ticks={yAxisTicks}
            tickFormatter={yAxisFormatter}
            tickMargin={10}
          />

          {/* Grid lines */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
            horizontal={true}
            x={80}
            width="95%"
          />

          {/* Tooltip */}
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '3 3' }}
              allowEscapeViewBox={{ x: false, y: false }}
            />
          )}

          {/* X-axis */}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#3C3C3C",
              fontSize: 15,
              fontWeight: 600
            }}
            padding={{ left: 20, right: 0.1 }}
            minTickGap={1}
          />

          {/* Highlight Area */}
          {highlightIndices && (
            <ReferenceArea
              x1={highlightIndices.start}
              x2={highlightIndices.end}
              fill="#8B5CF6"
              fillOpacity={0.1}
            />
          )}

          {/* Lines */}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index]}
              strokeWidth={8}
              dot={{ fill: colors[index], strokeWidth: 8, r: 6 }}
              activeDot={{ r: 7, stroke: colors[index], strokeWidth: 6, fill: '#fff' }}
              connectNulls={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart