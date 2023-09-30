import { FC, useState } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { DiagramFormData } from '../../types';
import { INITIAL_FORM_DATA } from '../../constants';
import Tickets from './Tickets';
import DiagramType from './DiagramType';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SuccessImage from '../../assets/success.svg';
import Spinner from '../../components/Spinner';

const CreateDiagram: FC = () => {
  const [formData, setFormData] = useState<DiagramFormData>(INITIAL_FORM_DATA);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentStepIndex, step, next, back } = useMultiStepForm([
    <Tickets {...formData} updateFields={updateFields} />,
    <DiagramType {...formData} updateFields={updateFields} />,
  ]);

  function updateFields(fieldsToUpdate: Partial<DiagramFormData>) {
    setFormData((prev) => {
      return { ...prev, ...fieldsToUpdate };
    });
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/createDiagram`, formData);
      setShowSuccessPage(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner message="Hold tight! Your diagram is being prepared. Don't worry, it's not a doodle!" />;

  if (showSuccessPage)
    return (
      <div className="text-center flex justify-center h-screen items-center flex-col gap-10">
        <img src={SuccessImage} width={270} />
        <div className="flex flex-col gap-6">
          <p className="text-xl font-bold max-w-md">
            Woohoo! Diagram attached successfully to Ticket: {formData.ticketId}
          </p>
          <Link className="w-full btn btn-neutral" to="/">
            Return to home
          </Link>
        </div>
      </div>
    );

  if (!showSuccessPage)
    return (
      <div className="flex flex-col gap-4 mt-24">
        <div className="flex justify-between">
          <button className="btn btn-neutral" onClick={back} disabled={currentStepIndex === 0}>
            Back
          </button>
          <ul className="steps">
            <li className={`step ${currentStepIndex === 0 ? 'step-neutral' : ''}`}>
              Choose Ticket
            </li>
            <li className={`step ${currentStepIndex === 1 ? 'step-neutral' : ''}`}>
              Choose Diagram Style
            </li>
          </ul>
          <button
            className="btn btn-neutral"
            onClick={currentStepIndex === 1 ? handleSubmit : next}
            disabled={
              (currentStepIndex === 0 && formData.ticketId === '') ||
              (currentStepIndex === 1 && formData.diagramType === '')
            }
          >
            {currentStepIndex === 1 ? 'Submit' : 'Next'}
          </button>
        </div>
        {step}
      </div>
    );
};

export default CreateDiagram;
