// lib/utils.ts
import type { PersonData } from "@/types/timeline";
import { samplePersons } from "./sample-data";

export function getPersonById(id: string): PersonData | undefined {
  return samplePersons.find((person) => person.id === id);
}

export function getPersonsByIds(ids: string[]): PersonData[] {
  return ids
    .map((id) => getPersonById(id))
    .filter((person): person is PersonData => person !== undefined);
}
