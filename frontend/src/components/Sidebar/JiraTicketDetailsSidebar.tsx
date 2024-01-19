import { FiPaperclip } from 'react-icons/fi';
import { Ticket, Comment } from '../../types';
import { formatDate, issueTypeLabel } from '../../utils';
import Spinner from '../Spinner';
import { BsChatLeftFill } from 'react-icons/bs';

const JiraTicketDetailsSidebar = ({
  ticket,
  isLoading,
}: {
  ticket: Ticket | null;
  isLoading: boolean;
}) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-1/3 min-h-full bg-base-200 text-base-content">
        {isLoading ? <Spinner /> : <TicketDetails ticket={ticket} />}
      </ul>
    </div>
  );
};

const TicketDetails = ({ ticket }: { ticket: Ticket | null }) => {
  if (ticket)
    return (
      <div className="flex flex-col mt-24 w-full p-3 gap-3">
        <div className="flex justify-between">
          <p>{ticket.key}</p>
          {issueTypeLabel(ticket.issueType)}
        </div>
        <h2 className="text-3xl font-bold">{ticket.summary}</h2>
        <p>{formatDate(ticket.created)}</p>
        {ticket.description.split('\n\n').map((item, id) => (
          <li className="text-base" key={id}>
            {item}
          </li>
        ))}
        <hr className="border" />
        <h3 className="text-lg font-bold">Comments</h3>
        {ticket.comments.length ? (
          ticket.comments.map((comment: Comment, id) => {
            return (
              <div key={id}>
                <p>{formatDate(comment.created)}</p>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
              </div>
            );
          })
        ) : (
          <p>No comments to show</p>
        )}

        <button className="btn">
          <BsChatLeftFill />
          <span>{ticket.comments.length}</span>
        </button>
        <button className="btn">
          <FiPaperclip />
          <span>{ticket.attachments.length}</span>
        </button>
      </div>
    );
};

export default JiraTicketDetailsSidebar;
