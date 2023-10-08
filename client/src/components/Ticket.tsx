import React from 'react';
import { formatDate, issueTypeLabel } from '../utils';
import { BsCalendar3, BsChatLeftFill } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { Ticket } from '../types';

const Ticket = ({
  ticket,
  handleViewClick,
}: {
  ticket: Ticket;
  handleViewClick: (id: string) => void;
}) => {
  return (
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
  );
};

export default Ticket;
