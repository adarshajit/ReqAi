import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { BsChatLeftFill, BsCalendar3 } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { formatDate, issueTypeLabel } from '../../utils';
import { Ticket, TicketsProps } from '../../types';
import Spinner from '../../components/Spinner';

const Tickets: FC<TicketsProps> = ({ ticketId, updateFields }) => {
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

  const handleTicketSelection = (ticketId: string): void => {
    setSelectedTicket(ticketId);
    updateFields({ ticketId });
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mt-24">
      {tickets.map((ticket: Ticket) => (
        <div
          key={ticket.key}
          className={`card border-2 border-grey-200 transition duration-300 ease-in-out cursor-pointer ${
            ticket.key === selectedTicket ? 'border-black' : ''
          }`}
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
