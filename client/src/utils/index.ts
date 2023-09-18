export const formatDate = (dateValue: string | number | Date): string => {
  const date = new Date(dateValue);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
