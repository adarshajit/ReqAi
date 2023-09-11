import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Bug from '../assets/bookmark (1).png';
import Story from '../assets/bookmark.png';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <div className="flex justify-end mr-6">
            <img src={ticket.issueType === 'Story' ? Story : Bug} width={25} />
          </div>
          <div className="card-body">
            <h2 className="card-title">{ticket.summary}</h2>
            <p>{ticket.description.substring(0, 200)}...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
