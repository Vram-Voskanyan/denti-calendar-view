
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isValid } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

export const formatDisplayTime = (time: string): string => {
  // Convert 24-hour time format to 12-hour format
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  // Get all days in the month
  return eachDayOfInterval({ start, end });
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isSameMonthDate = (date: Date, baseDate: Date): boolean => {
  return isSameMonth(date, baseDate);
};

export const isValidDateString = (dateString: string): boolean => {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  return isValid(date);
};
