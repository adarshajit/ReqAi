import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { Ticket as TicketType, TicketsProps } from '../../types';
import Spinner from '../../components/Spinner';
import JiraTicketDetailsSidebar from '../../components/Sidebar/JiraTicketDetailsSidebar';
import Ticket from '../../components/Ticket';

const SelectTicket: FC<TicketsProps> = ({ ticketId, updateFields }) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
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
          <Ticket ticket={ticket} handleViewClick={handleViewClick} />
        </div>
      ))}

      <JiraTicketDetailsSidebar ticket={ticket} isLoading={showTicketData} />
    </div>
  );
};

export default SelectTicket;
