"use server";

import { revalidatePath } from "next/cache";
import { addPerson } from "@/lib/data-store";
import type { PersonData } from "@/types/timeline";

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
