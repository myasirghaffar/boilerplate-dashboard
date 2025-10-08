import React from "react";
import IconImg from "../../assets/images/studentIcon.png";
import { PrintIcon, DownloadIcon } from "../../assets/icons";

// Reusable Student Information Component
const ProfileDetail = ({
  title,
  showButtons = true,
  onCancel,
  onReset,
  onSave,
  studentData = {},
  profileImage = IconImg,
  showLoginDetails = false,
  showContactInfo = true,
  showDownloadButton = false,
  showPrintButton = false,
  bottomPara = false,
  showBottomInfo = true,
}) => {
  return (
    <div className="px-6 pt-3">
      <div className="mb-4 ">
        <div className="flex flex-col lg:flex-row lg:justify-between sm:items-center gap-4">
          {/* Title */}
          <div>
            <h3 className="text-[2rem] xs:text-[1.5rem] tracking-[1%] leading-[120%] font-medium font-inter text-center lg:text-left">
              {title}
            </h3>
          </div>

          {/* Buttons */}
          <div className="flex flex-row justify-center sm:justify-start gap-2">
            {showButtons && (
              <>
                <button
                  onClick={onCancel}
                  className="bg-white text-[#010101] rounded-[52px] font-inter font-normal text-[1rem] py-2 px-6 md:px-8 hover:bg-secondary-500 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out text-center"
                >
                  Cacelar
                </button>
                <button
                  onClick={onReset}
                  className="bg-white text-[#010101] rounded-[52px] font-inter font-normal text-[1rem] py-2 px-6 md:px-8 hover:bg-secondary-500 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out text-center"
                >
                  Reiniciar
                </button>
                <button
                  onClick={onSave}
                  className="bg-secondary-500 text-white rounded-[52px] font-inter font-normal text-[1rem] py-2 px-6 md:px-8 hover:bg-secondary-500 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out text-center"
                >
                  Guardar
                </button>
              </>
            )}
            {showPrintButton && (
              <span
                className="cursor-pointer"
                onClick={() => console.log("Print okay")}
              >
                <PrintIcon />
              </span>
            )}
            {showDownloadButton && (
              <span
                className="cursor-pointer"
                onClick={() => console.log("Download okay")}
              >
                <DownloadIcon />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 gap-4">
        {/* card1 */}
        <div className="basis-full md:basis-1/2 flex bg-white flex-col p-4  px-6  rounded-[23px] gap-3">
          {/* Title */}
          <div>
            <p className="text-[1.25rem] sm:text-[1.5rem] md:text-[1.625rem] text-black font-inter font-medium tracking-[1%] leading-[120%]">
              Informações Básicas
            </p>
          </div>
          <hr className="-mx-6  border-t-2 border-[#BFBFBF60]" />
          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center  ">
            {/* Image */}
            <div>
              <img
                src={profileImage}
                alt="Student profile"
                className="w-[150px] sm:w-[170px] md:w-[190px] h-auto rounded-lg"
              />
            </div>

            {/* Name + Details */}
            <div className="grid  lg:grid-cols-1 gap-4 text-center sm:text-left">
              <div className="flex flex-col gap-1">
                <h6 className="text-black text-[0.8rem] md:text-[0.9rem]  xl:text-[1.25rem] font-normal  font-inter tracking-[1%] leading-[120%]">
                  Nome Completo
                </h6>
                <h6 className="text-gray-400 text-[0.7rem] md:text-[0.7rem]  xl:text-[1rem] font-normal tracking-[1%] leading-[120%]">
                  {studentData?.fullName}
                </h6>
              </div>

              <div className="flex flex-col gap-1">
                <h6 className="text-black text-[0.8rem] md:text-[0.9rem] xl:text-[1.25rem] font-normal font-inter tracking-[1%] leading-[120%]">
                  Data de Nascimento
                </h6>
                <p className="text-gray-400 text-[0.7rem] md:text-[0.7rem]   xl:text-[1rem] font-normal tracking-[1%] leading-[120%]">
                  {studentData?.birthDate}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h6 className="text-black text-[0.8rem] md:text-[0.9rem] xl:text-[1.25rem] font-inter font-normal tracking-[1%] leading-[120%]">
                  Bilhete de Identidade
                </h6>
                <h6 className="text-gray-400 text-[0.7rem] md:text-[0.7rem] xl:text-[1rem] font-normal tracking-[1%] leading-[120%]">
                  {studentData?.idNumber}
                </h6>
              </div>
            </div>
          </div>
          {/* Bottom Info Row */}
          {showBottomInfo && (
            <>
              <hr className="-mx-6 border-t-2 border-[#BFBFBF4D] mt-4 mb-2" />
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]  w-full gap-y-2">
                <div>
                  <h6 className="text-black text-[1rem] lg:text-[1.125rem]">
                    Polo
                  </h6>
                  <h6 className="text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    {studentData?.polo}
                  </h6>
                </div>
                <div>
                  <h6 className="text-black text-[1rem] lg:text-[1.125rem]">
                    Curso
                  </h6>
                  <h6 className="text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    {studentData?.course}
                  </h6>
                </div>
                <div>
                  <h6 className="text-black text-[1rem] lg:text-[1.125rem]">
                    Turno
                  </h6>
                  <h6 className="text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    {studentData?.shift}
                  </h6>
                </div>
                <div>
                  <h6 className="text-black text-[1rem] lg:text-[1.125rem]">
                    Gênero
                  </h6>
                  <h6 className="text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    {studentData?.gender}
                  </h6>
                </div>
                <div>
                  <h6 className="text-black text-[1rem] lg:text-[1.125rem]">
                    Estudante Nº
                  </h6>
                  <h6 className="text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    {studentData?.studentNumber}
                  </h6>
                </div>
              </div>
            </>
          )}
        </div>

        {/* card2 */}
        <div className="basis-full md:basis-1/2 flex flex-col gap-4">
          {/* Login Details */}
          {showLoginDetails && (
            <div className="flex bg-white flex-col p-4 sm:p-6 rounded-[23px] gap-3">
              <h6 className="text-black text-[1.25rem] sm:text-[1.5rem] md:text-[1.625rem] tracking-[1%] leading-[120%]">
                Detalhes de login/conta
              </h6>
              <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <input
                  id="password"
                  type="password"
                  placeholder="*****************"
                  className="w-full sm:w-1/2 h-[42px] rounded-[8px] border border-[#D4D4D4] shadow-[inset_0px_2px_4px_0px_#00000030] px-3"
                />
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="*****************"
                  className="w-full sm:w-1/2 h-[42px] rounded-[8px] border border-[#D4D4D4] shadow-[inset_0px_2px_4px_0px_#00000030] px-3"
                />
              </div>
            </div>
          )}

          {/* Contact Info */}
          {showContactInfo && (
            <div className="flex bg-white flex-col p-4 sm:p-6 rounded-[23px] gap-3">
              <div>
                <h6 className="text-black text-[1.625rem] sm:text-[1.25rem] tracking-[1%] leading-[120%]">
                  Informações de contato
                </h6>
              </div>
              <hr className="-mx-4 sm:-mx-6  border-t-2 border-[#BFBFBF60]" />

              {/* Telephone / Email / Address */}
              <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div>
                  <h6 className="text-black text-[1.125rem] sm:text-[1.25rem] font-normal">
                    Telefone
                  </h6>
                  <p className="text-gray-400 lg:text-[1rem] sm:text-[1rem] font-normal">
                    {studentData?.phone}
                  </p>
                </div>
                <div>
                  <h6 className="text-black text-[1.125rem] sm:text-[1.25rem] font-normal">
                    Email
                  </h6>
                  <p className="text-gray-400 lg:text-[1rem] sm:text-[1.25rem] font-normal">
                    {studentData?.email}
                  </p>
                </div>
                <div>
                  <h6 className="text-black text-[1.125rem] sm:text-[1.25rem] font-normal">
                    Endereço
                  </h6>
                  <p className="text-gray-400 lg:text-[1rem] sm:text-[1.25rem] font-normal">
                    {studentData?.address}
                  </p>
                </div>

                {/* Add HR after first 3 divs */}
                <hr className="-mx-4 sm:-mx-6 border-t border-[#BFBFBF4D] col-span-full" />

                {/* Encarregado Info */}
                {bottomPara ? (
                  <div className="col-span-full flex flex-col gap-1">
                    <h6 className="text-black text-[1.125rem] sm:text-[1.25rem]">
                      Dados Bancários
                    </h6>
                    <h6 className="text-gray-400 lg:text-[1rem] sm:text-[1.25rem] flex flex-col gap-1">
                      <span>{studentData?.bracnchTitle}</span>
                      <span>NIB: {studentData?.nibNumber}</span>
                      <span>Conta: {studentData?.branchConta}</span>
                    </h6>
                  </div>
                ) : (
                  <>
                    <div>
                      <h6 className="text-black font-normal text-[1.125rem] sm:text-[1.25rem]">
                        Encarregado
                      </h6>
                      <p className="text-gray-400 lg:text-[0.9rem] sm:text-[1rem]">
                        {studentData?.guardianName}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-black font-normal text-[1.125rem] sm:text-[1.25rem]">
                        E-mail
                      </h6>
                      <p className="text-gray-400 lg:text-[0.9rem] sm:text-[1rem]">
                        {studentData?.guardianEmail}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-black font-normal text-[1.125rem] sm:text-[1.25rem]">
                        Telefone
                      </h6>
                      <p className="text-gray-400 lg:text-[0.9rem] sm:text-[1rem]">
                        {studentData?.guardianPhone}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
