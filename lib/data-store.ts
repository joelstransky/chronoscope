// lib/data-store.ts
// This file now acts as a data retrieval layer using Prisma.
import prisma from "./db"; // Import the Prisma client
import type { Event, Person } from "./generated/prisma"; // Import Prisma's generated types

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
