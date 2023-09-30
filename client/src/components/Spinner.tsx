const Spinner = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-8 mt-48 justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
      <p className="text-2xl font-bold">{message}</p>
    </div>
  );
};

export default Spinner;
