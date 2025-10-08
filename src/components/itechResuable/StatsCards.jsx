const StatCard = ({
  icon: Icon,
  label,
  value,
  bgColor,
  iconColor = "text-white",
  fontsize,
}) => {
  return (
    <div className={`${bgColor} rounded-[1.25rem] p-6 text-white shadow-lg`}>
      <div className="flex flex-col h-full justify-between items-start">
        <div className="">
          <div className="mb-4">
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
          <div className="lg:text-2xl sm:text-lg text-lg font-light font-inter mb-2">{label}</div>
        </div>
        <div
          className={`${
            fontsize ? fontsize : "text-[4rem]"
          }  font-medium font-inter`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
