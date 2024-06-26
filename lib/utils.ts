import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.toLowerCase());
}

export function validateUrl(url: string): boolean {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?v=.*)?$/;
  return urlRegex.test(url);
}
export function validatePassword(password: string): boolean {
  return password.length > 6;
}

export function getFormattedDate(): string {
  const date = new Date(); // Crea la fecha actual

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, así que se suma 1
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

export function generateMonthDates(year: number, month: number): string[] {
  // Create a new Date object for the first day of the month
  const date = new Date(year, month - 1, 1);
  const dates: string[] = [];

  // Iterate while we are in the same month
  while (date.getMonth() === month - 1) {
    // Get the day, month, and year in the desired format
    const day = date.getDate().toString().padStart(2, '0');
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${day}`;

    // Add the formatted date to the array
    dates.push(formattedDate);

    // Move to the next day
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export function generateObjectWithValues(dates: string[], data: Record<string, number>): Record<string, number> {
  // Create an empty object to store the results
  const result: Record<string, number> = {};

  // Iterate over each date in the 'dates' array
  for (const date of dates) {
    // Look for the value in the 'data' object, if it doesn't exist, use 0
    result[date] = data[date] || 0;
  }

  // Return the 'result' object
  return result;
}

const YOUTUBE_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

export function getYoutubeVideoId(link: string): string | null {
  const match = link.match(YOUTUBE_REGEX);
  return match && match[5] ? match[5] : null;
}
