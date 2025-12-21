// types/timeline.ts

export type HistoricalEvent = {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  // We'll add more fields later (dateEnd, uncertainty, etc.)
};

export type PersonData = {
  id: string;
  name: string;
  birthDate: Date;
  deathDate: Date | null;
  description: string | null;
  events: HistoricalEvent[];
};
