import CreatePersonForm from "@/components/timeline/CreatePersonForm";
import Person from "@/components/timeline/Person";
import { getAllPeople, getPersonsByIds } from "@/lib/data-store";
import type { SearchParams } from "@/types/api";

export default async function HomePage(props: {
  searchParams: Promise<SearchParams>;
}) {
  // Next.js calls this function and passes the props
  const params = await props.searchParams;
  const peopleParam = params.people;
  const people = peopleParam
    ? getPersonsByIds(peopleParam.split(","))
    : getAllPeople();

  return (
    <main className="min-h-screen p-8">
      <h1>Timeline Viewer</h1>
      <div className="grid grid-cols-[300px_minmax(900px,1fr)] gap-4">
        <div >
          <CreatePersonForm />
        </div>
        <div >
          {people.map((person) => (
            <Person key={person.id} {...person} />
          ))}
        </div>
      </div>
    </main>
  );
}
