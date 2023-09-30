import { useState, FC } from 'react';
import { DIAGRAM_TYPES } from '../../constants';
import { DiagramTypeProps } from '../../types';

const DiagramType: FC<DiagramTypeProps> = ({ diagramType, updateFields }) => {
  const [selectedDiagramType, setSelectedDiagramType] = useState<string | null>(diagramType);

  const handleDiagramTypeSelection = (diagramType: string): void => {
    updateFields({ diagramType });
    setSelectedDiagramType(diagramType);
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-24 max-w-2xl">
      {DIAGRAM_TYPES.map((diagram) => {
        return (
          <div
            key={diagram.id}
            className={`card w-80 h-36 border-2 border-grey-200 transition duration-300 ease-in-out cursor-pointer hover:border-black ${
              diagram.type === selectedDiagramType ? 'border-black' : ''
            }`}
            onClick={() => handleDiagramTypeSelection(diagram.type)}
          >
            <h2 className="flex justify-center items-center h-full capitalize font-bold text-lg">
              {diagram.type}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default DiagramType;
