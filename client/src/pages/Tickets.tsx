import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { formatDate } from '../utils';
import Spinner from '../components/Spinner';
import { BsChatLeftFill, BsCalendar3 } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';

type Ticket = {
  issueType: string;
  summary: string;
  description: string;
  created: Date;
  comments: Comment[];
  attachments: Attachment[];
};

type Comment = {
  author: string;
  body: string;
  created: Date;
};

type Attachment = {
  filename: string;
  url: string;
};

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const issueTypeLabel = (issueType: string) => {
    if (issueType === 'Story')
      return <div className="badge badge-success badge-outline">{issueType}</div>;
    return <div className="badge badge-error badge-outline">{issueType}</div>;
  };

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/tickets');
        setTickets(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mt-24">
      {tickets.map((ticket) => (
        <div className="card bg-base-100 shadow-md">
          <div className="flex flex-col p-8 gap-4">
            {issueTypeLabel(ticket.issueType)}
            <h2 className="card-title">{ticket.summary}</h2>
            <p>{ticket.description.substring(0, 200)}...</p>
            <div className="flex justify-between">
              <button className="btn">
                <BsCalendar3 />
                {formatDate(ticket.created)}
              </button>
              <div className="flex gap-2">
                <button className="btn">
                  <BsChatLeftFill />
                  <span>{ticket.comments.length}</span>
                </button>
                <button className="btn">
                  <FiPaperclip />
                  <span>{ticket.attachments.length}</span>
                </button>
                <button className="btn btn-neutral">View</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
