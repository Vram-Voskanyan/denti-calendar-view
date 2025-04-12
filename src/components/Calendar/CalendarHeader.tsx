
import React from "react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onTodayClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onDateChange,
  onTodayClick,
}) => {
  const goToPreviousMonth = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-dentist-border">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="px-4 py-2 rounded-md border border-dentist-border"
          onClick={onTodayClick}
        >
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="rounded-full h-8 w-8"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            className="rounded-full h-8 w-8"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon size={20} className="text-dentist-primary" />
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>
    </div>
  );
};

export default CalendarHeader;
