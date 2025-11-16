// lib/data-store.ts
import type { PersonData } from '@/types/timeline';
import { samplePersons } from './sample-data';

// In-memory store (resets on server restart - we'll use DB later)
let people: PersonData[] = [...samplePersons];

export function getAllPeople(): PersonData[] {
  return people;
}

export function getPersonById(id: string): PersonData | undefined {
  return people.find(p => p.id === id);
}

export function getPersonsByIds(ids: string[]): PersonData[] {
  return ids
    .map(id => getPersonById(id))
    .filter((person): person is PersonData => person !== undefined);
}

export function addPerson(person: PersonData): void {
  people.push(person);
}

// For testing - reset to original data
export function resetData(): void {
  people = [...samplePersons];
}