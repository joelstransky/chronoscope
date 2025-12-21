// lib/data-store.ts
// This file now acts as a data retrieval layer using Prisma.
import prisma from "./db"; // Import the Prisma client
import type { Event, Person } from "./generated/prisma"; // Import Prisma's generated types

// TODO: Cleanup this file by removing any remaining in-memory logic or unused helper functions.
// Ensure it provides a clean API for the Server Components to fetch data.

export async function getAllPeople(): Promise<
  (Person & { events: Event[] })[]
> {
  // Fetch all people from the database, including their events
  const people = await prisma.person.findMany({
    include: {
      events: true, // Include related events
    },
    orderBy: {
      name: "asc", // Order by name for consistent display
    },
  });
  return people;
}

export async function getPersonById(
  id: string,
): Promise<(Person & { events: Event[] }) | null> {
  // Fetch a single person by ID from the database, including their events
  const person = await prisma.person.findUnique({
    where: { id },
    include: {
      events: true, // Include related events
    },
  });
  return person;
}

export async function getPersonsByIds(
  ids: string[],
): Promise<(Person & { events: Event[] })[]> {
  if (ids.length === 0) {
    return [];
  }
  // Fetch multiple people by their IDs from the database, including their events
  const people = await prisma.person.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      events: true, // Include related events
    },
    orderBy: {
      name: "asc",
    },
  });
  return people;
}

// The following functions and in-memory store have been removed:
// - addPerson, addEventToPerson (now handled by app/actions.ts using Prisma)
// - resetData, samplePersons (were for in-memory store)
