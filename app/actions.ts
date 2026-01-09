"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import type { Document, Person } from "@/lib/generated/prisma";
import { EventSchema, PersonSchema } from "@/lib/schemas";
import prisma from "../lib/db"; // Import the Prisma client

/**
 * Server Action to create a new person in the database.
 * @param formData The form data containing person details.
 */
export async function createPerson(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    birthDate: formData.get("birthDate"),
    deathDate: formData.get("deathDate") || undefined, // Handle empty string as undefined
    description: formData.get("description") || undefined,
  };

  // Validate data using Zod schema
  const validatedData = PersonSchema.parse(rawData);

  // Convert date strings to Date objects or null if empty
  const birthDate = new Date(validatedData.birthDate);
  const deathDate = validatedData.deathDate
    ? new Date(validatedData.deathDate)
    : null;

  await prisma.person.create({
    data: {
      name: validatedData.name,
      birthDate,
      deathDate,
      description: validatedData.description,
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
  const rawData = {
    personId: formData.get("personId"),
    title: formData.get("title"),
    date: formData.get("date"),
    description: formData.get("description") || undefined,
  };

  // Validate data using Zod schema
  const validatedData = EventSchema.parse(rawData);

  // Convert date string to Date object
  const date = new Date(validatedData.date);

  await prisma.event.create({
    data: {
      title: validatedData.title,
      date,
      description: validatedData.description,
      // Connect the event to the person using their ID
      person: {
        connect: {
          id: validatedData.personId,
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
  if (!query || query.trim() === "") {
    return []; // Return empty array if query is empty
  }

  // Use Prisma to find people whose names contain the query string, case-insensitive.
  // Limits the results to 10 for performance and UI manageability.
  const people: Person[] = await prisma.person.findMany({
    where: {
      name: {
        contains: query.trim(), // Search for the query string within the name
        mode: "insensitive", // Perform a case-insensitive search
      },
    },
    take: 10, // Limit the number of results
    select: {
      // Select specific fields to return, matching PersonData structure excluding events
      id: true,
      name: true,
      birthDate: true,
      deathDate: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return people;
}

/**
 * Server Action to save a document snapshot (canvas state).
 * Handles both anonymous and authenticated saves.
 * @param personIds Array of person IDs currently on the canvas.
 * @param userId Optional Clerk User ID.
 * @returns The saved Document object.
 */
export async function saveDocument(personIds: string[], userId?: string) {
  // TODO: Implement the save logic
  // 1. Generate a unique slug using nanoid (e.g., 10 characters).
  const slug = nanoid(10);
  // 2. If userId is missing, generate a secret deleteToken (e.g., a longer nanoid).
  const deleteToken = userId ? null : nanoid();
  // 3. Create the Document in the database using prisma.document.create.
  try {
    const doc = await prisma.document.create({
      data: {
        slug,
        personIds,
        userId,
        deleteToken,
      },
    });
    // 4. Return the created document.
    return doc;
  } catch (e) {
    // throw e;
  }
}

import { getPersonsByIds as getPersonsByIdsStore } from "@/lib/data-store";

/**
 * Server Action to fetch multiple people by their IDs.
 * @param ids Array of person IDs.
 * @returns Array of Person objects with their events.
 */
export async function getPersonsByIds(ids: string[]) {
  return await getPersonsByIdsStore(ids);
}

export async function fetchDocument(slug: string) {
  try {
    const doc: Document | null = await prisma.document.findUnique({
      where: {
        slug: slug,
      },
    });
    return doc;
  } catch (e) {

  }
}
