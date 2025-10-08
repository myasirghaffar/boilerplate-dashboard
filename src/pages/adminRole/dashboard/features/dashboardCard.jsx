import React from "react";
import DashboardCards from "../../../../components/itechResuable/DashboardCards";

// Dashboard Cards Container Component
const DashboardCardsContainer = () => {
  const cards = [
    {
      title: "Receita",
      value: "1.000.000MT",
      percentage: "12%",
      variant: "primary"
    },
    {
      title: "Professores",
      value: "1.000.000MT",
      percentage: "12%",
      variant: "secondary"
    },
    {
      title: "Alunos",
      value: "1200",
      percentage: "12%",
      variant: "primary"
    },
    {
      title: "Professores",
      value: "50",
      percentage: "12%",
      variant: "secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {cards.map((card, index) => (
        <DashboardCards
          key={index}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
          variant={card.variant}
        />
      ))}
    </div>
  );
};

export default DashboardCardsContainer;
