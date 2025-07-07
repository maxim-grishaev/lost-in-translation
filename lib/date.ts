import { format, isValid, parseISO } from 'date-fns';

export const toDate = (date: unknown): Date | null => {
  if (date === undefined) {
    return null;
  }
  const d = parseISO(String(date));
  return isValid(d) ? d : null;
};

export const isValidDate = isValid;

export const formatDate = (d: Date, formatTmpl = 'dd.MM.yyyy') =>
  format(d, formatTmpl);
