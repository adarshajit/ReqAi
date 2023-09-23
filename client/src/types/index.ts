export type DiagramFormData = {
  ticketId: string;
  diagramType: string;
};

export type DiagramTypeProps = DiagramFormData & {
  updateFields: (fields: Partial<DiagramFormData>) => void;
};

export type TicketsProps = DiagramFormData & {
  updateFields: (fields: Partial<DiagramFormData>) => void;
};

export type Ticket = {
  key: string;
  issueType: string;
  summary: string;
  description: string;
  created: Date;
  comments: Comment[];
  attachments: Attachment[];
};

export type Comment = {
  author: string;
  body: string;
  created: Date;
};

export type Attachment = {
  filename: string;
  url: string;
};
