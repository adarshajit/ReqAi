import React from 'react';
import { DiagramFormData } from './CreateDiagram';

const DiagramType = ({
  ticketId,
  diagramType,
  updateFields,
}: {
  ticketId: string;
  diagramType: string;
  updateFields: (fields: Partial<DiagramFormData>) => void;
}) => {
  const handleDiagramTypeSelection = (diagramType: string) => {
    updateFields({ diagramType });
    console.log({ ticketId, diagramType });
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-24 max-w-2xl">
      <div
        className="card w-80 border-2 border-grey-200 hover:border-gray-500 hover:bg-gray-50 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleDiagramTypeSelection('sequence')}
      >
        <div className="card-body">
          <h2 className="card-title justify-center">Sequence</h2>
        </div>
      </div>

      <div
        className="card w-84 border-2 border-grey-200 hover:border-gray-500 hover:bg-gray-50 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleDiagramTypeSelection('flow')}
      >
        <div className="card-body">
          <h2 className="card-title justify-center">Flow</h2>
        </div>
      </div>
      {/* <div className="bg-white rounded-lg p-4 shadow-md">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="name"
            value="Option 1"
            id="option1"
          />
          <span className="text-gray-700">Option 1</span>
        </label>
      </div> */}
    </div>
  );
};

export default DiagramType;
