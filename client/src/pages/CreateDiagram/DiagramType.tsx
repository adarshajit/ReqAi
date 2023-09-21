import { useState } from 'react';
import { DIAGRAMS } from '../../constants';
import { DiagramFormData } from '../../types';

const DiagramType = ({
  diagramType,
  updateFields,
}: {
  diagramType: string;
  updateFields: (fields: Partial<DiagramFormData>) => void;
}) => {
  const [selectedDiagramType, setSelectedDiagramType] = useState<string | null>(diagramType);

  const handleDiagramTypeSelection = (diagramType: string) => {
    updateFields({ diagramType });
    setSelectedDiagramType(diagramType);
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-24 max-w-2xl">
      {DIAGRAMS.map((diagram) => {
        return (
          <div
            className={`card w-80 border-2 border-grey-200 transition duration-300 ease-in-out cursor-pointer ${
              diagram.type === selectedDiagramType ? 'border-black' : ''
            }`}
            onClick={() => handleDiagramTypeSelection(diagram.type)}
          >
            <div className="card-body">
              <h2 className="card-title justify-center capitalize">{diagram.type}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiagramType;
