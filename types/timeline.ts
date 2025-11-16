// types/timeline.ts

export type HistoricalEvent = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  // We'll add more fields later (dateEnd, uncertainty, etc.)
};

export type PersonData = {
  id: string;
  name: string;
  birthDate?: Date;
  deathDate?: Date;
  description?: string;
  events: HistoricalEvent[];
};

export type Canvas = {
  id: string;
  personIds: string[];
  // We'll add zoom level, date range, etc. later
};
