const DashboardCards = ({
  title,
  value,
  percentage = "12%",
  icon: Icon,
  variant = "primary", // "primary" or "secondary"
  className = "",
  height,
  fontsize,
}) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`${
        isPrimary ? "bg-primary" : "bg-secondary"
      } rounded-[1.25rem] p-4 py-5 shadow-md ${className}`}
      style={{
        height: height ? height : "6.3125rem",
      }}
    >
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-1">
            <h3 className=" text-white 2xl:text-[1.25rem] xl:text-[0.75rem] text-[1rem] font-light mr-2">
              {title}
            </h3>
            <div
              style={{
                height: "1.25rem",
              }}
              className="bg-white rounded-full px-1 py-1 flex items-center gap-1"
            >
              <svg
                className="w-3 h-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className=" xl:text-[0.625rem] text-green-500 font-medium text-[0.75rem]">
                {percentage}
              </span>
            </div>
          </div>
          <div
            className={`${
              fontsize ? fontsize : "text-[1.25rem]"
            } font-medium  text-white`}
          >
            {value}
          </div>
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCards;
