//This is a temporary model of contest for purposes of setting up the integration of the contest into Profile Page
import testTat1 from '../Images/testTat1.png';
import testTat2 from '../Images/testTat2.png';

export interface contest {
  id: number;
  title: string;
  description: string;
  price: number;
  end_date: Date;
  start_date: Date;
  creator: string;
  images: string;
}

export const contests: contest[] = [
  {
    id: 1,
    title: 'contest 1',
    description: 'random description',
    price: 150,
    end_date: new Date('2021-09-06T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: 'test',
    images: testTat1,
  },
  {
    id: 2,
    title: 'contest 2',
    description: 'random description',
    price: 130,
    end_date: new Date('2021-09-06T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: '60b661ac312efe281ec42f85',
    images: testTat2,
  },
  {
    id: 3,
    title: 'contest 3',
    description: 'random description',
    price: 150,
    end_date: new Date('2021-09-06T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: 'test@example.com',
    images: testTat2,
  },
  {
    id: 4,
    title: 'contest 4',
    description: 'random description',
    price: 250,
    end_date: new Date('2021-06-03T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: 'test@example.com',
    images: testTat1,
  },
  {
    id: 5,
    title: 'contest 5',
    description: 'random description',
    price: 150,
    end_date: new Date('2021-06-03T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: 'test@example.com',
    images: testTat2,
  },
  {
    id: 6,
    title: 'contest 6',
    description: 'random description',
    price: 150,
    end_date: new Date('2021-06-03T00:00:00.000+00:00'),
    start_date: new Date('2021-06-01T22:43:16.657+00:00'),
    creator: '60b661ac312efe281ec42f85',
    images: testTat1,
  },
];
