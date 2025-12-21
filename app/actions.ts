"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/db"; // Import the Prisma client

/**
 * Server Action to create a new person in the database.
 * @param formData The form data containing person details.
 */
export async function createPerson(formData: FormData) {
  const name = formData.get("name") as string;
  const birthDateStr = formData.get("birthDate") as string;
  const deathDateStr = formData.get("deathDate") as string;
  const description = formData.get("description") as string;

  // Convert date strings to Date objects or null if empty
  const birthDate = birthDateStr ? new Date(birthDateStr) : ""; 
  const deathDate = deathDateStr ? new Date(deathDateStr)
  : null;

  await prisma.person.create({
    data: {
      name,
      birthDate,
      deathDate,
      description,
    },
  });

  // Revalidate the path to show the new person on the timeline
  revalidatePath("/");
}

/**
 * Server Action to create a new event for a specific person in the database.
 * @param formData The form data containing event details and the person's ID.
 */
export async function createEvent(formData: FormData) {
  const personId = formData.get("personId") as string;
  const title = formData.get("title") as string;
  const dateStr = formData.get("date") as string;
  const description = formData.get("description") as string;

  // Convert date string to Date object
  const date = new Date(dateStr);

  await prisma.event.create({
    data: {
      title,
      date,
      description,
      // Connect the event to the person using their ID
      person: {
        connect: {
          id: personId,
        },
      },
    },
  });

  // Revalidate the path to update the timeline with the new event
  revalidatePath("/");
}

/**
 * Server Action to search for people by name in the database.
 * This action is called from the client-side SearchPeople component.
 * @param query The search string to match against person names.
 * @returns A promise that resolves to an array of Person objects.
 */
export async function searchPeople(query: string) {
  if (!query || query.trim() === '') {
    return []; // Return empty array if query is empty
  }

  // Use Prisma to find people whose names contain the query string, case-insensitive.
  // Limits the results to 10 for performance and UI manageability.
  const people = await prisma.person.findMany({
    where: {
      name: {
        contains: query.trim(), // Search for the query string within the name
        mode: 'insensitive',    // Perform a case-insensitive search
      },
    },
    take: 10, // Limit the number of results
    select: { // Select specific fields to return, matching PersonData structure excluding events
      id: true,
      name: true,
      birthDate: true,
      deathDate: true,
      description: true,
    }
  });

  return people;
}

