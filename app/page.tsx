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
  const people = await (peopleParam
    ? getPersonsByIds(peopleParam.split(","))
    : getAllPeople());

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
          {people.map((person) => (
            <Person key={person.id} {...person} />
          ))}
        </div>
      </div>
    </main>
  );
}
