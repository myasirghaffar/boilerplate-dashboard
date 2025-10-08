import React, { useState } from "react";
import DashboardCardsContainer from "./features/dashboardCard";
import BarGraph from "../../../components/BarGraph";
import PieChart from "../../../components/PieChart";
import Calendar from "../../../components/itechResuable/CalendarComp";
import RevenueSection from "../../../components/itechResuable/Revenue";
import LineChart from "../../../components/itechResuable/LineChart";
import { BellIcon, BellIcon2 } from "../../../assets/icons/icons";

const AdminDashboard = () => {
  // Sample data for the performance chart
  const performanceData = [
    { name: "JAN", presencas: 70, ausencias: 75 },
    { name: "FEV", presencas: 78, ausencias: 85 },
    { name: "MAR", presencas: 80, ausencias: 100 },
    { name: "ABR", presencas: 95, ausencias: 80 },
    { name: "MAI", presencas: 75, ausencias: 80 },
  ];

  // Sample data for the attendance pie chart
  const attendanceData = [
    { name: "Presente", value: 80, color: "#58398D" },
    { name: "Ausente", value: 20, color: "#EA5B28" },
  ];

  // Sample data for the line chart
  const myData = [
    { month: "Jan", revenue: 550, expenses: 380 },
    { month: "Fev", revenue: 850, expenses: 550 },
    { month: "Mar", revenue: 520, expenses: 350 },
    { month: "Abr", revenue: 650, expenses: 450 },
    { month: "Mai", revenue: 750, expenses: 520 },
    { month: "Jun", revenue: 650, expenses: 400 },
    { month: "Jul", revenue: 700, expenses: 380 },
    { month: "Ago", revenue: 850, expenses: 500 },
    { month: "Set", revenue: 600, expenses: 600 },
    { month: "Out", revenue: 720, expenses: 450 },
    { month: "Nov", revenue: 600, expenses: 350 },
    { month: "Dez", revenue: 950, expenses: 600 },
  ];

  // Calculate revenue statistics from myData
  const calculateRevenueStats = () => {
    // Annual revenue (sum of all months)
    const annualRevenue = myData.reduce((sum, item) => sum + item.revenue, 0);

    // Monthly revenue (average of all months)
    const monthlyRevenue = Math.round(annualRevenue / myData.length);

    // Total debt (sum of all expenses)
    const totalDebt = myData.reduce((sum, item) => sum + item.expenses, 0);

    return {
      annual: annualRevenue,
      monthly: monthlyRevenue,
      debt: totalDebt,
    };
  };

  const revenueStats = calculateRevenueStats();

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Revenue cards data configuration
  const revenueCardsData = [
    {
      value: "1,335",
      label: "Anual",
      bgColor: "#EFFFF1",
      dotColor: "#4BD670",
      textColor: "#4BD670",
    },
    {
      value: "4,366",
      label: "Mensal",
      bgColor: "#FDF6D8",
      dotColor: "#FFAE43",
      textColor: "#FFAE43",
    },
    {
      value: "208",
      label: "Divida",
      bgColor: "#FFEDED",
      dotColor: "#FF414B",
      textColor: "#FF414B",
    },
  ];

  const handleMonthChange = (month) => {
    console.log("Month changed:", month);
    // Add your month change logic here
  };

  const handleCourseChange = (course) => {
    console.log("Course changed:", course);
    // Add your course change logic here
  };

  const handleAttendanceMonthChange = (month) => {
    console.log("Attendance month changed:", month);
    // Add your attendance month change logic here
  };

  const handleClassChange = (classOption) => {
    console.log("Class changed:", classOption);
    // Add your class change logic here
  };

  const handleRefreshProfile = () => {
    console.log("Refreshing profile...");
    // Add your refresh logic here
  };
  const defaultAgendaItems = [
    {
      id: 1,
      icon: BellIcon,
      iconBg: "bg-[#FFED9F]",
      iconColor: "text-[#FCA52B]",
      title: "Joga na proxima semana",
      description:
        "The school's Annual Sports Day will be held on May 12, 2024. Mark your",
    },
    {
      id: 2,
      icon: BellIcon2,
      iconBg: "bg-[#D6DAFF]",
      iconColor: "text-[#696FC1]",
      title: "Summer Break Start Date",
      description:
        "Summer break begins on May 25, 2024. Have a wonderful holiday!",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-x-hidden">
      <div className="space-y-6 max-w-full">
        {/* Top Section with Left and Right Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8 space-y-6">
            {/* Welcome Card */}
            <div className="rounded-[1.5rem]">
              <DashboardCardsContainer />
            </div>

            {/* Three Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[35%_64%] gap-4 lg:gap-3">
              {/* Pie Chart */}
              <div className="w-full">
                <PieChart
                  title="Assiduidade"
                  data={attendanceData}
                  centerText="80%"
                  colors={["#58398D", "#EA5B28"]}
                  dropdownOptions={{
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
                  }}
                  onMonthChange={handleAttendanceMonthChange}
                  onClassChange={handleClassChange}
                />
              </div>

              {/* Bar Graph - Made more responsive */}
              <div className="w-full">
                <BarGraph
                  title="Desempenho"
                  data={performanceData}
                  dataKeys={["presencas", "ausencias"]}
                  dataLabels={["Aprovado", "Reprovado"]}
                  colors={["#58398D", "#EA5B28"]}
                  height={246}
                  dropdownOptions={{
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
                  }}
                  onMonthChange={handleMonthChange}
                  onCourseChange={handleCourseChange}
                />
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem]">
              <LineChart
                title="Receita Anual"
                data={myData}
                dataKeys={["revenue", "expenses"]}
                dataLabels={["Receita Mensal", "Dívida Mensal"]}
                colors={["#EA5B28", "#58398D"]}
                highlightPeriod={{ start: "Ago", end: "Set" }}
                currency="MT"
                dropdownOptions={{
                  year: [
                    { label: "2025 - 2026", value: "2025-2026" },
                    { label: "2024 - 2025", value: "2024-2025" },
                    { label: "2023 - 2024", value: "2023-2024" },
                  ],
                  period: [
                    { label: "Anual", value: "annual" },
                    { label: "Trimestral", value: "quarterly" },
                    { label: "Mensal", value: "monthly" },
                  ],
                }}
                onYearChange={(year) => console.log("Year changed:", year)}
                onPeriodChange={(period) =>
                  console.log("Period changed:", period)
                }
              />
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-white  rounded-[1.5rem]">
              <Calendar
                initialDate={new Date()}
                selectedDay={5}
                onMonthChange={(d) => console.log("month:", d)}
                onDaySelect={(d) => console.log("day:", d)}
                selectedDayClasses="bg-secondary-500 text-white rounded-full"
                dayClasses="text-gray-800"
                showAgenda={true}
                agendaTitle="Agenda"
                agendaItems={defaultAgendaItems}
              />
            </div>

            {/* Revenue Section - Using reusable component */}
            <RevenueSection
              title="Receita"
              data={revenueCardsData}
              showThreeDots={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
