import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { MaleIcon, FemaleIcon } from "../../assets/icons";
import { MoreHorizontal } from "lucide-react";
// Reusable two-donut gender chart
const GenderPieChart = ({
  title = "Nº Estudantes por Sexo",
  malePercent = 53,
  femalePercent = 47,
  maleColor = "#58398D",
  femaleColor = "#EA5B28",
  trackColor = "#EDEDED",
  height = 160,
  maleCount = "700",
  maleCountLabel = "(Homens)",
  femaleCount = "500",
  femaleCountLabel = "(Mulheres)",
}) => {
  const maleData = [
    { name: "background", value: 100, color: trackColor },
    { name: "value", value: malePercent, color: maleColor },
  ];
  const femaleData = [
    { name: "background", value: 100, color: trackColor },
    { name: "value", value: femalePercent, color: femaleColor },
  ];

  const CenterLabel = ({ value, IconComponent, color }) => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
      {IconComponent ? (
        <IconComponent className="w-5 h-5" style={{ color }} />
      ) : null}
      <span className="text-[16px] font-bold text-gray-800">{value}%</span>
    </div>
  );

  const renderDonut = (data, color, value, IconComponent) => (
    <div
      className="relative flex-1 flex items-center justify-center"
      style={{ minHeight: height }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          {/* Background circle */}
          <Pie
            data={[{ name: "background", value: 100, color: trackColor }]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            cornerRadius={8}
          >
            <Cell fill={trackColor} stroke="none" />
          </Pie>
          {/* Colored segment */}
          <Pie
            data={[{ name: "value", value: value, color: color }]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={90 + value * 3.6}
            stroke="none"
            cornerRadius={8}
          >
            <Cell fill={color} stroke="none" />
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      <CenterLabel value={value} IconComponent={IconComponent} color={color} />
    </div>
  );

  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[0.95rem] font-semibold text-black">{title}</h3>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
  <MoreHorizontal/>
        </button>
       
      </div>

      <div className="flex gap-6 justify-center">
        {renderDonut(maleData, maleColor, malePercent, MaleIcon)}
        {renderDonut(femaleData, femaleColor, femalePercent, FemaleIcon)}
      </div>

      <div className="mt-4 flex items-center justify-center gap-12 text-[0.75rem]">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: maleColor }}
          ></span>
          <span className="text-gray-700 font-medium">
            {maleCount}{" "}
            <span className="text-[#A2A2A2] font-normal">{maleCountLabel}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: femaleColor }}
          ></span>
          <span className="text-gray-700 font-medium">
            {femaleCount}{" "}
            <span className="text-[#A2A2A2] font-normal">
              {femaleCountLabel}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenderPieChart;
