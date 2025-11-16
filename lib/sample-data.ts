// lib/sample-data.ts
import type { PersonData } from '@/types/timeline';

export const samplePersons: PersonData[] = [
  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    birthDate: new Date('1815-12-10'),
    deathDate: new Date('1852-11-27'),
    description: 'Mathematician and first computer programmer',
    events: [
      {
        id: 'ada-1',
        title: 'Born in London',
        date: new Date('1815-12-10'),
        description: 'Daughter of Lord Byron'
      },
      {
        id: 'ada-2',
        title: 'Met Charles Babbage',
        date: new Date('1833-06-05'),
        description: 'Introduction to the Analytical Engine'
      },
      {
        id: 'ada-3',
        title: 'Published Notes on the Analytical Engine',
        date: new Date('1843-01-01'),
        description: 'Including the first algorithm, making her the first programmer'
      },
      {
        id: 'ada-4',
        title: 'Died of uterine cancer',
        date: new Date('1852-11-27'),
        description: 'At age 36 in London'
      }
    ]
  },
  {
    id: 'alan-turing',
    name: 'Alan Turing',
    birthDate: new Date('1912-06-23'),
    deathDate: new Date('1954-06-07'),
    description: 'Father of computer science and artificial intelligence',
    events: [
      {
        id: 'turing-1',
        title: 'Born in London',
        date: new Date('1912-06-23'),
      },
      {
        id: 'turing-2',
        title: 'Published "On Computable Numbers"',
        date: new Date('1936-11-12'),
        description: 'Introduced the concept of the Turing machine'
      },
      {
        id: 'turing-3',
        title: 'Joined Bletchley Park',
        date: new Date('1939-09-04'),
        description: 'Worked on breaking the Enigma code during WWII'
      },
      {
        id: 'turing-4',
        title: 'Proposed the Turing Test',
        date: new Date('1950-01-01'),
        description: 'Test of machine intelligence'
      },
      {
        id: 'turing-5',
        title: 'Died in Wilmslow',
        date: new Date('1954-06-07'),
      }
    ]
  },
  {
    id: 'grace-hopper',
    name: 'Grace Hopper',
    birthDate: new Date('1906-12-09'),
    deathDate: new Date('1992-01-01'),
    description: 'Computer scientist and creator of COBOL',
    events: [
      {
        id: 'grace-1',
        title: 'Born in New York City',
        date: new Date('1906-12-09'),
      },
      {
        id: 'grace-2',
        title: 'Joined US Navy Reserve',
        date: new Date('1943-12-01'),
      },
      {
        id: 'grace-3',
        title: 'Worked on Harvard Mark I',
        date: new Date('1944-01-01'),
        description: 'One of the first programmable computers'
      },
      {
        id: 'grace-4',
        title: 'Developed first compiler',
        date: new Date('1952-01-01'),
        description: 'A-0 System compiler'
      },
      {
        id: 'grace-5',
        title: 'Led development of COBOL',
        date: new Date('1959-01-01'),
      },
      {
        id: 'grace-6',
        title: 'Retired from Navy as Rear Admiral',
        date: new Date('1986-08-14'),
      }
    ]
  }
];