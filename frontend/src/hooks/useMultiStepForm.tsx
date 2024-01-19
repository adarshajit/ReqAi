import { ReactNode, useState } from 'react';

export const useMultiStepForm = (steps: ReactNode[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    if (currentStepIndex >= steps.length - 1) return;
    setCurrentStepIndex((prev) => prev + 1);
  };

  const back = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  return { currentStepIndex, step: steps[currentStepIndex], next, back };
};
