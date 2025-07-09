import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToMMDD(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}/${month}`;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .map(name => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const getDateRange = (startDate: string, endDate: string) => {
  const startDateFormatted = formatDateToMMDD(startDate);
  const endDateFormatted = formatDateToMMDD(endDate);
  return `${startDateFormatted} - ${endDateFormatted}`;
}
