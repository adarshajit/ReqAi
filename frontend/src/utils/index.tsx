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

export const convertStringToJSON = (inputText: string | null) => {
  if (typeof inputText !== 'string') {
    return;
  }

  const regex = /@#\$[\s\S]*?(?=@#\$|$)/g;
  const matches: RegExpMatchArray | null = inputText.match(regex);

  const userStoryData = [];

  if (matches)
    for (const match of matches) {
      const story = match.trim();
      let summary;
      let description;

      const summaryMatch = story.match(/summary: (.+)/);
      const descriptionMatch = story.match(/description: (.+)/);

      if (summaryMatch && descriptionMatch) {
        summary = summaryMatch[1].trim();
        description = descriptionMatch[1].trim();
      }

      const testScenariosMatch = story.match(/test scenarios:\n(.+?)\nacceptance criteria:/s);
      const testScenarios = testScenariosMatch
        ? testScenariosMatch[1]
            .trim()
            .split('\n')
            .map((item) => item.trim())
        : [];
      const acceptanceCriteriaMatch = story.match(/acceptance criteria:\n(.+?)\nimpact analysis:/s);
      const acceptanceCriteria = acceptanceCriteriaMatch
        ? acceptanceCriteriaMatch[1]
            .trim()
            .split('\n')
            .map((item) => item.trim())
        : [];
      const impactAnalysisMatch = story.match(/impact analysis:\n(.+)/s);
      const impactAnalysis = impactAnalysisMatch
        ? impactAnalysisMatch[1]
            .trim()
            .split('\n')
            .map((item) => item.trim())
        : [];

      userStoryData.push({
        summary,
        description,
        testScenarios,
        acceptanceCriteria,
        impactAnalysis,
        selected: false,
      });
    }

  console.log(userStoryData);
  return userStoryData;
};
