export const formatNumber = (num: number, digits: number = 0) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
