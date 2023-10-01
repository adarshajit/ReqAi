import SuccessImage from '../assets/success.svg';
import { Link } from 'react-router-dom';

const Success = ({ message }: { message: string }) => {
  return (
    <div className="text-center flex justify-center h-screen items-center flex-col gap-10">
      <img src={SuccessImage} width={270} />
      <div className="flex flex-col gap-6">
        <p className="text-xl font-bold max-w-md">{message}</p>
        <Link className="w-full btn btn-neutral" to="/">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default Success;
