import type { HistoricalEvent } from "@/types/timeline";

export type EventCardProps = {
  event: HistoricalEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="w-64 shrink-0 border rounded-md bg-white p-4 shadow">
      <div className="text-sm text-gray-500 mb-1">
        {event.date instanceof Date
          ? event.date.toLocaleDateString()
          : String(event.date)}
      </div>
      <div className="font-bold mb-2 text-gray-900">{event.title}</div>
      {event.description && (
        <div className="text-gray-700 text-sm">{event.description}</div>
      )}
    </div>
  );
}
