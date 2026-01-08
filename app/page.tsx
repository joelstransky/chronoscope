import { Newsreader } from "next/font/google";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import ShareButton from "@/components/ShareButton";
import CreatePersonForm from "@/components/timeline/CreatePersonForm";
import Person from "@/components/timeline/Person";
import { SearchPeople } from "@/components/timeline/SearchPeople";
import { getPersonsByIds } from "@/lib/data-store";
import { SearchParamsSchema } from "@/lib/schemas";
import { loadSearchParams } from "./searchParams";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export default async function HomePage(props: {
  searchParams: Promise<SearchParams>;
  slugPeople: string[] | undefined
}) {
  const { searchParams, slugPeople } = props;
  let peopleIds: string[] | undefined;
  if (!slugPeople) {

    const params = await loadSearchParams(searchParams);
    // Validate the search parameters using Zod
    const validated = SearchParamsSchema.safeParse(params);
    peopleIds = validated.success ? validated.data.people : [];
  } else {
    peopleIds = slugPeople
  }

  // If peopleParam is missing or invalid, we return an empty array to show an empty canvas.
  const persons = await (peopleIds.length
    ? getPersonsByIds(peopleIds)
    : Promise.resolve([]));

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
          {persons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg text-gray-400">
              {/* TODO: Implement a "Welcome" or "Empty State" UI */}
              <p className="text-lg">No people selected</p>
              <p className="text-sm">
                Search for a historical figure on the left to begin your
                timeline.
              </p>
            </div>
          ) : (
            persons.map((person) => <Person key={person.id} {...person} />)
          )}
        </div>
      </div>
    </main>
  );
}
