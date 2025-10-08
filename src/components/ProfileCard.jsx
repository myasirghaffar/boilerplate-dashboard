import React from "react";
import avatarImg from "../assets/images/avatar_1.png";
import { Copy } from "lucide-react";

const ProfileCard = ({
  title = "Perfil",
  name = "Telio Natal Goetsa",
  id = "1301201123",
  contact = "84 67 72 427",
  studentInfo = "Mecânica",
  avatar = avatarImg,
  onRefresh = null,
}) => {
  return (
    <div className="bg-white h-[21.75rem] rounded-2xl p-4 xl:py-2 shadow-sm border border-gray-100 min-w-[15.625rem] xl:min-w-[8rem] relative flex flex-col">
      {/* Red notification dot */}
      {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div> */}

      {/* Header Section */}
      <div>
        <div className="flex items-center ">
          <h3 className="text-sm xl:text-[1.125rem] font-bold text-gray-800">
            {title}
          </h3>
        </div>

        {/* Profile Content Section */}
        <div className="flex items-start mt-5 gap-2 xl:gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 xl:w-16 xl:h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs xl:text-sm font-bold text-gray-250 truncate">
              {name}
            </h4>
            <div className="flex items-center gap-1 xl:gap-2 mt-1">
              <p className="text-[1rem] font-medium text-gray-850 truncate">
                {id}
              </p>
              <Copy className="text-[#292D32] w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
      {/* Contact Info Section */}
      <div className="py-8 px-2 mt-10 bg-gray-350 rounded-xl">
        <div className="space-y-2">
          <div className="flex xl:flex-row mb-6 items-start justify-between">
            <p className="text-[0.875rem] font-medium text-gray-850">
              Contacto
            </p>
            <p className="text-[1rem] font-semibold text-gray-250 truncate">
              {contact}
            </p>
          </div>

          <div className="flex xl:flex-row items-start justify-between">
            <p className="text-[0.875rem] font-medium text-gray-850">
              Estudante
            </p>
            <p className="text-[1rem] font-semibold text-gray-250 truncate">
              {studentInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
