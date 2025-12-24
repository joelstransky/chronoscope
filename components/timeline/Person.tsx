"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import type { PersonData } from "@/types/timeline";
import AddEventModal from "./AddEventModal";
import EventCard from "./EventCard";

export type PersonProps = PersonData;

export default function Person({
  id,
  name,
  birthDate,
  deathDate,
  description,
  events,
}: PersonProps) {
  const [people, setPeople] = useQueryState(
    "people",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const onRemove = () => {
    setPeople(
      people.filter((pid) => pid !== id),
      { shallow: false },
    );
  };

  return (
    <div className="relative border border-gray-700 rounded-lg p-6 mb-8 bg-gray-900/50">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="Remove person details"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>remove</title>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{name}</h2>
        <div className="text-sm text-gray-400 mb-4">
          {birthDate ? new Date(birthDate).toLocaleDateString() : "Unknown"} —{" "}
          {deathDate ? new Date(deathDate).toLocaleDateString() : "Present"}
        </div>
        {description && (
          <p className="text-gray-300 max-w-2xl">{description}</p>
        )}
        <div className="mt-4">
          <AddEventModal personId={id} />
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex flex-row gap-4 min-w-max">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
