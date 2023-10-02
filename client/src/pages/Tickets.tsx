import axios from 'axios';
import { useEffect, useState } from 'react';
import { Ticket as TicketType } from '../types';
import Spinner from '../components/Spinner';
import JiraTicketDetailsSidebar from '../components/Sidebar/JiraTicketDetailsSidebar';
import Ticket from '../components/Ticket';

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticket, setTicket] = useState<TicketType | null>(null);
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
      <div className="my-14 pl-6 font-bold flex flex-col gap-4">
        <h1 className="text-5xl font-bold">Tickets</h1>
        <p className="text-gray-500">All your tickets in JIRA</p>
      </div>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {tickets.map((ticket: Ticket) => (
        <>
          <Ticket ticket={ticket} handleViewClick={handleViewClick} />
          <hr />
        </>
      ))}
      <JiraTicketDetailsSidebar ticket={ticket} isLoading={showTicketData} />
    </div>
  );
};

export default Tickets;
