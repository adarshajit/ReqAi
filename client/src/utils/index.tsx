export const formatDate = (dateValue: string | number | Date): string => {
  const date = new Date(dateValue);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const issueTypeLabel = (issueType: string): JSX.Element => {
  if (issueType === 'Story')
    return <div className="badge badge-success badge-outline">{issueType}</div>;
  return <div className="badge badge-error badge-outline">{issueType}</div>;
};
