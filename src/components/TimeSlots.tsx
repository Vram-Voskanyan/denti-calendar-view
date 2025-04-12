import React from "react";
import { cn } from "@/lib/utils";
import { formatDisplayTime } from "@/utils/dateUtils";

interface TimeSlotsProps {
  availableSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  availableSlots,
  selectedTime,
  onTimeSelect,
}) => {
  if (!availableSlots.length) {
    return (
      <div className="py-4 px-2 text-center h-[500px] flex items-center justify-center">
        <div>
          <p className="text-gray-500">No available time slots for this day.</p>
          <p className="text-sm text-gray-400 mt-1">Please select another date or dentist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 p-2 h-[500px]">
      {availableSlots.map((time) => (
        <div
          key={time}
          className={cn(
            "time-slot text-center py-2 px-4 rounded-md border border-dentist-border cursor-pointer",
            selectedTime === time
              ? "selected bg-dentist-primary text-white"
              : "available bg-dentist-light text-dentist-primary hover:bg-dentist-accent hover:text-dentist-primary"
          )}
          onClick={() => onTimeSelect(time)}
        >
          {formatDisplayTime(time)}
        </div>
      ))}
    </div>
  );
};

export default TimeSlots;
