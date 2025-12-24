import { Newsreader } from "next/font/google";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import ShareButton from "@/components/ShareButton";
import CreatePersonForm from "@/components/timeline/CreatePersonForm";
import Person from "@/components/timeline/Person";
import { SearchPeople } from "@/components/timeline/SearchPeople";
import { getPersonsByIds } from "@/lib/data-store";
import { loadSearchParams } from "./searchParams";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export default async function HomePage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { searchParams } = props;
  const { people } = await loadSearchParams(searchParams);

  // If peopleParam is missing, we return an empty array to show an empty canvas.
  const persons = await (people.length
    ? getPersonsByIds(people)
    : Promise.resolve([]));
  console.log("persons", persons);
  return (
    <main className="min-h-screen p-8">
      <h1 className={newsreader.className}>Chronoscope</h1>
      <ShareButton />
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <div>
          <Suspense fallback={null}>
            <SearchPeople />
          </Suspense>
          <CreatePersonForm />
        </div>
        <div className="col-span-1 overflow-x-auto">
          {/* TODO: Implement a "Welcome" or "Empty State" UI when people.length === 0 */}
          {persons.map((person) => (
            <Person key={person.id} {...person} />
          ))}
        </div>
      </div>
    </main>
  );
}
