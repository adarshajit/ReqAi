import axios from 'axios';
import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { convertStringToJSON, issueTypeLabel } from '../utils';
import { Ticket } from '../types';
import Spinner from '../components/Spinner';
import BardGeneratedTicketDetailsSidebar from '../components/Sidebar/BardGeneratedTicketDetailsSidebar';
import Success from './Success';
import UploadImage from '../assets/upload.svg';

const Upload: FC = () => {
  const [file, setFile] = useState<File | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userStories, setUserStories] = useState<any>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isCreationSuccess, isSetCreationSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/createJira', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setUserStories(convertStringToJSON(response.data));
        toast.success('Tickets created successfully!');
      }
    } catch (error) {
      toast.error('Uh oh! We ran into some issues. Please try again.');
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (ticketSummary: string | null): void => {
    if (ticketSummary) {
      const selectedTicket = userStories.find(
        (userStory: any) => userStory.summary === ticketSummary
      );
      setTicket(selectedTicket);
    }
  };

  const handleTicketSelection = (ticketSummary: string) => {
    if (ticketSummary)
      setUserStories((prev: any) =>
        prev?.map((ticket: any) =>
          ticket.summary === ticketSummary ? { ...ticket, selected: !ticket.selected } : ticket
        )
      );
  };

  const handleReset = () => {
    setUserStories((prev: any) => prev?.map((ticket: any) => ({ ...ticket, selected: false })));
  };

  const handleUserStoryCreation = async (): Promise<void> => {
    const selectedUserStories = userStories.filter((userStory: any) => userStory.selected);
    try {
      setLoading(true);
      isSetCreationSuccess(true);
      axios.post('http://localhost:5000/ticket/create/bulk', selectedUserStories);
      toast.success('The selected user stories is now available on JIRA!');
    } catch (err) {
      toast.error('Uh oh! Unable to create the selected user stories');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Spinner
        message={
          isCreationSuccess
            ? 'Hold tight. Your tickets are getting created in JIRA 🚧'
            : 'Crafting user stories with the finesse of a masterchef ✍️'
        }
      />
    );

  if (!userStories)
    return (
      <>
        <div className="hero min-h-screen">
          <div className="hero-content text-center flex flex-col gap-10">
            <img src={UploadImage} width={275} />
            <h1 className="text-3xl font-bold">Upload Business Requirement Document</h1>
            <form onSubmit={handleUpload} className="flex gap-4">
              <input
                type="file"
                onChange={handleChange}
                name="pdf_file"
                required
                className="file-input file-input-bordered w-full max-w-xs"
              />
              <button className="btn btn-neutral" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      </>
    );

  if (isCreationSuccess) return <Success message="Yay! Your tickets are now available on JIRA." />;

  if (userStories && !isCreationSuccess)
    return (
      <div className="flex flex-col gap-10 max-w-3xl my-24 justify-center items-center">
        <h1 className="text-3xl font-bold leading-10 mt-12">
          Select the user stories you want to have in JIRA ✨
        </h1>
        <div className="flex gap-5">
          <button className="btn w-56" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-neutral w-56" onClick={handleUserStoryCreation}>
            Create
          </button>
        </div>
        <div className="drawer drawer-end flex flex-col gap-4 max-w-2xl">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          {userStories.map((ticket: any, id: string) => (
            <div key={id} className="card border-2 border-grey-200">
              <div className="flex flex-col p-8 gap-4">
                <div className="flex justify-between">
                  {issueTypeLabel('Story')}
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={ticket.selected}
                    onChange={() => handleTicketSelection(ticket?.summary)}
                  />
                </div>
                <h2 className="card-title">{ticket.summary}</h2>
                <p>{ticket.description.substring(0, 200)}...</p>
                <hr />
                <label
                  htmlFor="my-drawer"
                  className="btn btn-neutral drawer-button"
                  onClick={() => handleViewClick(ticket.summary)}
                >
                  View
                </label>
              </div>
            </div>
          ))}
          <BardGeneratedTicketDetailsSidebar ticket={ticket} />
        </div>
        <ToastContainer />
      </div>
    );
};

export default Upload;
