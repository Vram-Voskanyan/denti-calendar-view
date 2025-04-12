
import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { getMonthDays, isToday, isSameMonthDate } from "@/utils/dateUtils";

interface MonthViewProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
}) => {
  const monthDays = getMonthDays(currentDate);
  const startOfCalendar = startOfWeek(monthDays[0], { weekStartsOn: 0 });
  
  // Generate days for the entire calendar view (including days from prev/next months)
  const calendarDays = Array.from({ length: 42 }, (_, i) => 
    addDays(startOfCalendar, i)
  );
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-dentist-border">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 h-full">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonthDate(day, currentDate);
          const isSelectedDay = isSameDay(day, selectedDate);
          const isTodayDay = isToday(day);
          
          return (
            <div
              key={index}
              className={cn(
                "p-1 border-b border-r border-dentist-border calendar-day",
                !isCurrentMonth && "text-gray-400 bg-gray-50",
                isTodayDay && "today",
                isSelectedDay && "selected"
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="flex flex-col h-full">
                <div className={cn(
                  "text-sm p-1 w-8 h-8 rounded-full flex items-center justify-center",
                  isSelectedDay && "bg-dentist-primary text-white",
                  isTodayDay && !isSelectedDay && "bg-dentist-light text-dentist-primary font-medium"
                )}>
                  {format(day, "d")}
                </div>
                {/* This is where appointment indicators could be displayed */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
