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

export const PRICING_PLANS = [
  {
    id: 1,
    title: 'Free',
    price: '0',
    duration: 'Lifetime',
    features: [
      'Access to all basic features',
      'Create up to 100 user stories',
      'Generate up to 5 BRD',
      'Create up to 20 diagrams',
    ],
  },
  {
    id: 2,
    title: 'Business',
    price: '20',
    duration: 'Lifetime',
    features: [
      'Access to all basic features',
      'Create up to 100 user stories',
      'Generate up to 5 BRD',
      'Create up to 20 diagrams',
    ],
  },
  {
    id: 3,
    title: 'Enterprise',
    price: '40',
    duration: 'Lifetime',
    features: [
      'Access to all basic features',
      'Create up to 100 user stories',
      'Generate up to 5 BRD',
      'Create up to 20 diagrams',
    ],
  },
];

export const INITIAL_FORM_DATA = {
  ticketId: '',
  diagramType: '',
};
