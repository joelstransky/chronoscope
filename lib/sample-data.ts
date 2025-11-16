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
  }
];