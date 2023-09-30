import { useState, FC, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import UploadImage from '../assets/upload.svg';
import { convertStringToJSON, issueTypeLabel } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import { Ticket } from '../types';
import GeneratedTicketDetails from './GeneratedTicketDetails';

const Upload: FC = () => {
  const [file, setFile] = useState<File | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userStories, setUserStories] = useState<any>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

  if (loading)
    return <Spinner message="Crafting user stories with the finesse of a master chef ✍️" />;

  if (!userStories)
    return (
      <>
        <div className="hero min-h-screen">
          <div className="hero-content text-center flex flex-col gap-10">
            <img src={UploadImage} width={275} />
            <h1 className="text-3xl font-bold">Upload Business Requirement Document</h1>
            <form onSubmit={handleSubmit} className="flex gap-4">
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

  if (userStories)
    return (
      <div className="flex flex-col gap-6 max-w-3xl my-24">
        <h1 className="text-3xl font-bold leading-10 my-12">
          Select the user stories you want to have in JIRA ✨
        </h1>
        <div className="drawer drawer-end flex flex-col gap-4 max-w-2xl">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          {userStories.map((ticket: any, id: string) => (
            <div key={id} className="card border-2 border-grey-200">
              <div className="flex flex-col p-8 gap-4">
                <div className="flex justify-between">
                  {issueTypeLabel('Story')} <input type="checkbox" className="checkbox" />
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
          <GeneratedTicketDetails ticket={ticket} />
        </div>
        <ToastContainer />
      </div>
    );
};

export default Upload;
