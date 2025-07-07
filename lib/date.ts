import { format, isValid, parseISO } from 'date-fns';

export const toDate = (date: unknown): Date | undefined => {
  if (date === undefined) {
    return undefined;
  }
  const d = parseISO(String(date));
  return isValid(d) ? d : undefined;
};

export const isValidDate = isValid;

export const formatDate = (d: Date, formatTmpl = 'dd.MM.yyyy') =>
  format(d, formatTmpl);
