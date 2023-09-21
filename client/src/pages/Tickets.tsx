import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { formatDate } from '../utils';
import Spinner from '../components/Spinner';
import { BsChatLeftFill, BsCalendar3 } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { DiagramFormData } from './CreateDiagram';

type Ticket = {
  key: string;
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

const Tickets = ({
  ticketId,
  updateFields,
}: {
  ticketId: string | null;
  diagramType: string;
  updateFields: (fields: Partial<DiagramFormData>) => void;
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(ticketId);

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

  const issueTypeLabel = (issueType: string) => {
    if (issueType === 'Story')
      return <div className="badge badge-success badge-outline">{issueType}</div>;
    return <div className="badge badge-error badge-outline">{issueType}</div>;
  };

  const handleTicketSelection = (ticketId: string) => {
    setSelectedTicket(ticketId);
    updateFields({ ticketId });
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mt-24">
      {tickets.map((ticket: Ticket) => (
        <div
          className={`card border-2 border-grey-200 transition duration-300 ease-in-out cursor-pointer ${
            ticket.key === selectedTicket ? 'border-black' : ''
          }`}
          key={ticket.key}
          onClick={() => handleTicketSelection(ticket.key)}
        >
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
