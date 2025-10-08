import React, { useState } from "react";
import { Downloadbutton, Printerbutton, SearchIcon } from "../assets/icons";
import DetailSyllabusTable from "../pages/professorDashboard/LessonPlan/features/DetailSyllabus/DetailSyllabusTable";

// Reusable section for heading + text
const InfoRow = ({ title, text }) => (
  <div className="flex flex-col gap-1 mb-4">
    <h6 className="font-normal text-[1.25rem] sm:text-[1.5rem] md:text-[1.25rem] leading-[120%] tracking-[0.01em] text-black">
      {title}
    </h6>
    <p className="text-gray-400 text-[0.8rem]  md:text-[1rem] leading-[170%]">
      {text}
    </p>
  </div>
);

function ReuseableDataDetail({ data, onClose }) {
  const [search, setSearch] = useState("");
  const content = [
    {
      data: "04-11 de Agosto",
      semana: "1ª",
      tema: "Descrever conceitos básicos de logística",
      subtemas: [
        "Descrever conceitos básicos de logística",
        "Descrever conceitos básicos de logística ",
        "Descrever conceitos básicos de logística ",
      ],
    },
    {
      data: "01-18 de Agosto",
      semana: "2ª",
      tema: "Descrever conceitos básicos de logística",
      subtemas: ["Descrever conceitos básicos de logística"],
    },
    {
      data: "01-25 de Agosto",
      semana: "3ª",
      tema: "Descrever conceitos básicos de logística",
      subtemas: ["Descrever conceitos básicos de logística"],
    },
  ];
  const filteredData = content.filter(
    (item) =>
      item.tema.toLowerCase().includes(search.toLowerCase()) ||
      item.subtemas.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Add download functionality here
  };

  if (!data) {
    return <div>No details available.</div>;
  }

  return (
    <div className="px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h6 className="font-medium text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] leading-[120%] tracking-[0.01em]">
          Plano analítico
        </h6>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={Printerbutton} alt="Print" className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={Downloadbutton} alt="Download" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 1st Box */}
      <div className="flex flex-col bg-white pl-8 pr-8 md:pr-20 py-10 rounded-[23px] shadow gap-6 mb-6">
        {/* 1st */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <InfoRow
            title="Disciplina"
            text={data?.disciplina || "N/A"}
          />
          <InfoRow title="Abreviatura" text="IPCALE" />
        </div>

        {/* 2nd */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <InfoRow title="Curso" text={data?.curso || "N/A"} />
          <InfoRow title="Formador" text={data?.duracao || "N/A"} />
          <InfoRow title="Código da disciplina" text="UCAG024002" />
        </div>

        {/* 3rd */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <InfoRow title="Carga horária" text="40H" />
          <InfoRow title="Nível" text="1º" />
          <InfoRow title="Semestre" text="1º" />
          <InfoRow title="Ano" text="2025" />
        </div>
      </div>

      {/* 2nd Box */}
      <div className="flex flex-col bg-white pl-6 pr-6 md:pl-8 md:pr-20 py-10 rounded-[23px] shadow gap-6 mb-6">
        {/* Descrição */}
        <div className="flex flex-col">
          <InfoRow
            title="Descrição da Unidade de Competência"
            text="O objectivo geral desta competência é de explicar os conceitos da logística. O candidato poderá se familiarizar com as condições sobre o exercício da profissão e as diferentes funções de trabalho. No fim, o candidato estará apto a estabelecer as relações entre estas funções, as habilidades e os comportamentos necessários para a execução das atividades."
          />
        </div>

        {/* Objectivos Específicos */}
        <div className="flex flex-col">
          <InfoRow
            title="Objectivos Específicos"
            text={
              <>
                <span className="font-medium">
                  As actividades das módulo estão orientadas no sentido de se
                  alcançar os objectivos específicos abaixo relacionados:
                </span>
                <br />
                <span>
                  a) Transmitir conceitos sobre a Logística e discutir sobre o
                  desenvolvimento de novos processos ou a melhoria de processos
                  existentes;
                </span>
                <br />
                <span>
                  b) Desenvolver a capacidade analítica e prescritiva dos
                  formandos para que possam compreender a utilidade e
                  aplicabilidade Logística;
                </span>
                <br />
                <span>
                  c) Relacionar teoria e prática sobre a realidade da temática
                  estudada, interesse existente, as necessidades e perspectivas
                  futuras;
                </span>
                <br />
                <span>
                  d) Capacitar dos formandos a realizar uma análise crítica
                  sobre as actividades logísticas.
                </span>
              </>
            }
          />
        </div>

        {/* Resultados de aprendizagem */}
        <div className="flex flex-col">
          <InfoRow
            title="Resultados de aprendizagem"
            text={
              <>
                <span className="font-medium">
                  Quando terminar o estudo do módulo deverá ser capaz de :
                </span>
                <br />
                <span>
                  Analisar e aplicar de forma critica os conhecimentos relativos
                  a processos e sistemas logísticos
                </span>
                <br />
                <span>Dominar as normas e procedimentos logístico;</span>
                <br />
                <span>
                  Apresentar e discutir áreas funcionais e processos típicos de
                  logística em cada nível decisório organizacional;
                </span>
                <br />
                <span>Conhecer, planear e coordenar o processo logístico;</span>
                <br />
                <span>
                  Possibilitar ao aluno os conhecimentos necessários sobre
                  teorias e práticas da Logística.
                </span>
              </>
            }
          />
        </div>
      </div>

      {/* 3rd Box */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm w-full mb-6">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Conteúdo temático
          </h2>
          <div className="relative w-full md:w-64  ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src={SearchIcon} alt="search" className="w-4 h-4 " />
            </span>
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-[42px] bg-[#F5F4F9] text-sm w-full "
            />
          </div>
        </div> */}

        {/* Responsive Table */}
        {/* <div className="overflow-x-auto">
          <table className="min-w-full border border-[#D1D1D1] rounded-t-[14px] overflow-hidden border-collapse">
            <thead>
              <tr className="bg-primary">
                <th className="px-4 py-3 text-center font-poppins text-[0.875rem] font-normal leading-[120%] text-white rounded-tl-[14px]">
                  Data
                </th>
                <th className="px-4 py-3 text-center font-poppins text-[0.875rem] font-normal leading-[120%] text-white ">
                  Semana
                </th>
                <th className="px-4 py-3 text-center font-poppins text-[0.875rem] font-normal leading-[120%] text-white">
                  Tema
                </th>
                <th className="px-4 py-3 text-center font-poppins text-[0.875rem] font-normal leading-[120%] text-white rounded-tr-[14px]">
                  Sub-temas
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  className="text-gray-600 text-sm md:text-base hover:bg-gray-50"
                >
                  <td className="px-4 py-3 border border-[#D1D1D1]">
                    {row.data}
                  </td>
                  <td className="px-4 py-3 border border-[#D1D1D1]">
                    {row.semana}
                  </td>
                  <td className="px-4 py-3 border border-[#D1D1D1]">
                    {row.tema}
                  </td>
                  <td className="px-4 py-3 border border-[#D1D1D1]">
                    {row.subtemas.map((s, i) => (
                      <div key={i}>{s}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
       {/* <DetailSyllabusTable /> */}



        {/* Pagination */}
        {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            Anterior
          </button>
          <span>Página 1 de 12</span>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            Próxima
          </button>
        </div> */}
      </div>

      {/* 4th Box */}
      <div className="flex flex-col bg-white pl-6 pr-6 md:pl-8 md:pr-20 py-10 rounded-[23px] shadow gap-6 mb-6">
        <div className="flex flex-col">
          <InfoRow
            title="Bibliografia"
            text="O objectivo geral desta competência é de explicar os conceitos da logística. O candidato poderá se familiarizar com as condições sobre o exercício da profissão e as diferentes funções de trabalho. No fim, o candidato estará apto a estabelecer as relações entre estas funções, as habilidades e os comportamentos necessários para a execução das atividades."
          />
        </div>
      </div>
    </div>
  );
}

export default ReuseableDataDetail;
