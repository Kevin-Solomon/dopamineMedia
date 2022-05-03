import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: '342das',
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: 'adarshBalika123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: '',
  },
  {
    _id: '342daszcc',
    firstName: 'Kevin',
    lastName: 'Solomon',
    username: 'kevinsolomon2k',
    password: 'kevin',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'Frontend Dev',
  },
  {
    _id: '32daszcc',
    firstName: 'Susan',
    lastName: 'Sujatha',
    username: 'susan',
    password: 'susan',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: '',
  },
  {
    _id: '3daszcc',
    firstName: 'Levi',
    lastName: 'Ackerman',
    username: 'levi',
    password: 'kamona',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'Scout Regiment',
  },
];
