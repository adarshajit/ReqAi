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
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perferendis!',
    url: '/upload',
  },
  {
    title: 'create brd',
    image: {
      file: create,
      size: 230,
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perferendis!',
    url: '/create/brd',
  },
  {
    title: 'create diagram',
    image: {
      file: diagram,
      size: 200,
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perferendis!',
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
    type: 'flow',
  },
];

export const INITIAL_FORM_DATA = {
  ticketId: '',
  diagramType: '',
};
