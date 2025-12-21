import { Newsreader } from "next/font/google";
import ShareButton from "@/components/ShareButton";
import CreatePersonForm from "@/components/timeline/CreatePersonForm";
import Person from "@/components/timeline/Person";
import { SearchPeople } from "@/components/timeline/SearchPeople";
import { getAllPeople, getPersonsByIds } from "@/lib/data-store";
import type { SearchParams } from "@/types/api";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export default async function HomePage(props: {
  searchParams: Promise<SearchParams>;
}) {
  // Next.js calls this function and passes the props
  const params = await props.searchParams;
  const peopleParam = params.people;

  // TODO: Update this logic to return an empty array [] if peopleParam is missing.
  // Currently, it falls back to getAllPeople(), which populates the canvas with everyone.
  const people = await (peopleParam
    ? getPersonsByIds(peopleParam.split(","))
    : Promise.resolve([]));

  return (
    <main className="min-h-screen p-8">
      <h1 className={newsreader.className}>Chronoscope</h1>
      <ShareButton />
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <div>
          <SearchPeople />
          <CreatePersonForm />
        </div>
        <div className="col-span-1 overflow-x-auto">
          {/* TODO: Implement a "Welcome" or "Empty State" UI when people.length === 0 */}
          {people.map((person) => (
            <Person key={person.id} {...person} />
          ))}
        </div>
      </div>
    </main>
  );
}
