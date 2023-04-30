import { Entry, FormattedDate } from "@/interfaces/journal";


export const getDate = (entry: Entry | null): FormattedDate => {
   
    if(!entry || !entry.date ) return { day: 0, month: '', year: 0, dayOfWeek: '' };

    const newDate = new Date(entry.date);

      return {
        day: newDate.getDate(),
        month: newDate.toLocaleString('en-us', { month: 'long' }),
        year: newDate.getFullYear(),
        dayOfWeek: newDate.toLocaleString('en-us', { weekday: 'long' }),
      };
    
};