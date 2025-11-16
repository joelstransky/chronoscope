"use server";

import { revalidatePath } from "next/cache";
import { addEventToPerson, addPerson } from "@/lib/data-store";
import type { HistoricalEvent, PersonData } from "@/types/timeline";

export async function createPerson(formData: FormData) {
  const name = formData.get("name") as string;
  const birthDate = formData.get("birthDate") as string;
  const deathDate = formData.get("deathDate") as string;
  const description = formData.get("description") as string;

  const newPerson: PersonData = {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    birthDate: new Date(birthDate),
    deathDate: new Date(deathDate),
    description,
    events: [],
  };

  addPerson(newPerson);
  revalidatePath("/");
}

export async function createEvent(formData: FormData) {
  const personId = formData.get("personId") as string;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;

  const newEvent: HistoricalEvent = {
    id: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    date: new Date(date),
    description,
  };

  addEventToPerson(personId, newEvent);
  revalidatePath("/");
}
