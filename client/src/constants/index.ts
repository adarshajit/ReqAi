import upload from '../assets/upload.svg';
import create from '../assets/create.svg';
import diagram from '../assets/diagram.svg';

export const FEATURES = [
  {
    title: 'create ticket',
    image: {
      file: upload,
      size: 175,
    },
    description: `Got a BRD? Let's slice 'n dice it into Jira stories!`,
    url: '/upload',
  },
  {
    title: 'create brd',
    image: {
      file: create,
      size: 230,
    },
    description: `No BRD? No worries! We'll whip one up just for you!`,
    url: '/create/brd',
  },
  {
    title: 'create diagram',
    image: {
      file: diagram,
      size: 200,
    },
    description: `Fancy a diagram to go with that story? Consider it done!`,
    url: '/create/diagram',
  },
];

export const DIAGRAM_TYPES = [
  {
    id: 1,
    type: 'sequence',
  },
  {
    id: 2,
    type: 'flowchart',
  },
  {
    id: 3,
    type: 'gantt',
  },
  {
    id: 4,
    type: 'class',
  },
  {
    id: 5,
    type: 'quadrant chart',
  },
];

export const INITIAL_FORM_DATA = {
  ticketId: '',
  diagramType: '',
};
