import React, { useState } from 'react';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import Tickets from './Tickets';
import DiagramType from './DiagramType';

const INITIAL_FORM_DATA = {
  ticketId: '',
  diagramType: '',
};

export type DiagramFormData = {
  ticketId: string;
  diagramType: string;
};

const CreateDiagram = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const updateFields = (fieldsToUpdate: Partial<DiagramFormData>) => {
    setFormData((prev) => {
      return { ...prev, ...fieldsToUpdate };
    });
  };
  const { currentStepIndex, step, next, back } = useMultiStepForm([
    <Tickets {...formData} updateFields={updateFields} />,
    <DiagramType {...formData} updateFields={updateFields} />,
  ]);

  return (
    <div className="flex flex-col gap-4 mt-24">
      <div className="flex justify-between">
        <button className="btn btn-neutral" onClick={back} disabled={currentStepIndex === 0}>
          Back
        </button>
        <ul className="steps">
          <li className={`step ${currentStepIndex === 0 ? 'step-neutral' : ''}`}>Choose Ticket</li>
          <li className={`step ${currentStepIndex === 1 ? 'step-neutral' : ''}`}>
            Choose Diagram Style
          </li>
        </ul>
        <button className="btn btn-neutral" onClick={next} disabled={formData.ticketId === ''}>
          Next
        </button>
      </div>
      {step}
    </div>
  );
};

export default CreateDiagram;
