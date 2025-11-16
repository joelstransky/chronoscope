import Person from '@/components/timeline/Person';
import { getPersonsByIds } from '@/lib/utils';
import type { SearchParams } from '@/types/api';

export default async function HomePage(props: { 
  searchParams: Promise<SearchParams> 
}) {
  // Next.js calls this function and passes the props
  const params = await props.searchParams;
  const peopleParam = params.people;
  const people = getPersonsByIds(peopleParam ? peopleParam.split(',') : ['ada-lovelace']);

  return (
    <main className="min-h-screen p-8">
      <h1>Timeline Viewer</h1>
      {people.map((person) => (
        <Person key={person.id} {...person} />
      ))}
    </main>
  );
}