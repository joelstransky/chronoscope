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
  return (
    <>
      <div>
        <h1>{name}</h1>
        <p>{birthDate?.toLocaleDateString()}</p>
        <p>{deathDate?.toLocaleDateString()}</p>
        <p>{description}</p>
        <AddEventModal personId={id} />
      </div>
      <div className="overflow-x-auto py-4">
        <div className="flex flex-row gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
