import { create } from 'zustand';
import { addDays, startOfDay } from 'date-fns';

interface CalendarState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: startOfDay(new Date()),
  setSelectedDate: (date: Date) => set({ selectedDate: startOfDay(date) }),
}));