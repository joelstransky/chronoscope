"use client";

import { useState, useEffect } from "react";
import ShareButton from "@/components/ShareButton";
import CreatePersonForm from "@/components/timeline/CreatePersonForm";
import Person from "@/components/timeline/Person";
import { SearchPeople } from "@/components/timeline/SearchPeople";
import type { PersonData } from "@/types/timeline";
import { getPersonsByIds } from "@/app/actions"; // I'll need to add this action

type CanvasProps = {
  initialPeopleIds: string[];
  initialPersons: PersonData[];
};

export default function Canvas({
  initialPeopleIds,
  initialPersons,
}: CanvasProps) {
  const [peopleIds, setPeopleIds] = useState<string[]>(initialPeopleIds);
  const [persons, setPersons] = useState<PersonData[]>(initialPersons);

  const onAddPerson = async (id: string) => {
    if (peopleIds.includes(id)) return;
    const newIds = [...peopleIds, id];
    setPeopleIds(newIds);

    // Fetch the new person's data
    try {
      const newPersons = await getPersonsByIds(newIds);
      setPersons(newPersons);
    } catch (error) {
      console.error("Failed to fetch person data:", error);
    }
  };

  const onRemovePerson = async (id: string) => {
    const newIds = peopleIds.filter((pid) => pid !== id);
    setPeopleIds(newIds);
    setPersons(persons.filter((p) => p.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <div>
        <ShareButton people={peopleIds} />
        <SearchPeople onAdd={onAddPerson} addedIds={peopleIds} />
        <CreatePersonForm />
      </div>
      <div className="col-span-1 overflow-x-auto">
        {persons.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg text-gray-400">
            <p className="text-lg">No people selected</p>
            <p className="text-sm">
              Search for a historical figure on the left to begin your timeline.
            </p>
          </div>
        ) : (
          persons.map((person) => (
            <Person key={person.id} {...person} onRemove={onRemovePerson} />
          ))
        )}
      </div>
    </div>
  );
}
