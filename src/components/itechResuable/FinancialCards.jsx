const DashboardCards = ({
  title,
  value,
  percentage = "12%",
  icon: Icon,
  variant = "primary", // "primary" or "secondary"
  className = "",
  height,
  fontsize
}) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`${isPrimary ? "bg-primary" : "bg-secondary"
        } rounded-[1.25rem] p-4 py-4 lg:p-8 lg:py-8 shadow-md ${className}`}
      style={{
        height: height ? height : "6.3125rem",
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between gap-1">
          {Icon && (
             <Icon className=" text-white" />
          )}
          <div style={{
            height: "1.625rem",
          }}
            className="bg-white rounded-full px-3 py-3 flex items-center gap-1">
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
            <span className=" xl:text-[0.8125rem] text-green-500 font-medium text-[0.75rem]">{percentage}</span>
          </div>
        </div>
        <h3 className=" text-white 2xl:text-[1.5rem] md:text-[1rem] text-[1rem] font-light mr-2">{title}</h3>
        <div className={`${fontsize ? fontsize : "lg:text-[1.25rem]"} md:text-[1.5rem] text-[1.25rem] font-medium  text-white`}>{value}</div>
      </div>
    </div>
  )
}

export default DashboardCards