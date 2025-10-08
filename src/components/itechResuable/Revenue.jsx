import { BsThreeDots } from 'react-icons/bs'
// Reusable Revenue Section Component

// Reusable Revenue Card Component
const RevenueCard = ({ value, label, bgColor, dotColor, textColor }) => {
    return (
      <div className="flex justify-between items-center p-[0.9375rem] border border-gray-200 rounded-[0.625rem]">
        <h1 className="text-[1.5rem] font-medium">{value}</h1>
        <div className="flex items-center gap-1 px-[15px] py-2 rounded-full hover:cursor-pointer" style={{ backgroundColor: bgColor }}>
          <div className="p-1 rounded-full" style={{ backgroundColor: dotColor }}></div>
          <h3 className="text-[0.8125rem] font-semibold" style={{ color: textColor }}>{label}</h3>
        </div>
      </div>
    )
  }
  
const RevenueSection = ({
    title = "Receita",
    data = [],
    showThreeDots = true,
    className = ""
  }) => {
    return (
      <div className={`w-full px-[1.5rem] py-[1.125rem] bg-white mt-10 rounded-[1.5rem] ${className}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-[1.25rem] font-medium">{title}</h1>
          {showThreeDots && (
            <BsThreeDots className="text-[1.25rem] font-medium hover:cursor-pointer" />
          )}
        </div>
        <div className="flex flex-col gap-3 my-[0.875rem]">
          {data.map((item, index) => (
            <RevenueCard
              key={index}
              value={item.value}
              label={item.label}
              bgColor={item.bgColor}
              dotColor={item.dotColor}
              textColor={item.textColor}
            />
          ))}
        </div>
      </div>
    )
  }
export default  RevenueSection