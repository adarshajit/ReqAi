import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { BsChatLeftFill, BsCalendar3 } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { formatDate, issueTypeLabel } from '../../utils';
import { Ticket, TicketsProps } from '../../types';
import Spinner from '../../components/Spinner';
import TicketDetailsSidebar from '../TicketDetails';

const Tickets: FC<TicketsProps> = ({ ticketId, updateFields }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(ticketId);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTicketData, setShowTicketData] = useState<boolean>(false);

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
    setSelectedTicketId(ticketId);
    updateFields({ ticketId });
  };

  const handleViewClick = async (ticketId: string | null): Promise<void> => {
    try {
      if (ticketId) {
        setShowTicketData(true);
        const res = await axios.get(`http://localhost:5000/ticket/${ticketId}`);
        setTicket(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShowTicketData(false);
    }
  };

  if (loading) return <Spinner message={`Hold on! We're fetching your tickets..`} />;

  return (
    <div className="drawer drawer-end flex flex-col gap-4 max-w-2xl my-24">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {tickets.map((ticket: Ticket) => (
        <div
          key={ticket.key}
          className={`card border-2 border-grey-200 transition duration-300 ease-in-out cursor-pointer ${
            ticket.key === selectedTicketId ? 'border-black' : ''
          }`}
          onClick={() => handleTicketSelection(ticket.key)}
        >
          <div className="drawer-content">
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
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-neutral drawer-button"
                    onClick={() => handleViewClick(ticket.key)}
                  >
                    View
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <TicketDetailsSidebar ticket={ticket} isLoading={showTicketData} />
    </div>
  );
};

export default Tickets;
