import { Newsreader } from "next/font/google";
import Canvas from "@/components/timeline/Canvas";
import { getPersonsByIds } from "@/lib/data-store";

const newsreader = Newsreader({
  subsets: ["latin"],
});

export default async function HomePage(props: {
  slugPeople?: string[];
}) {
  const { slugPeople } = props;
  const peopleIds = slugPeople || [];

  // Fetch initial persons data on the server
  const initialPersons = await (peopleIds.length
    ? getPersonsByIds(peopleIds)
    : Promise.resolve([]));

  return (
    <main className="min-h-screen p-8">
      <h1 className={`${newsreader.className} text-4xl font-bold mb-8`}>
        Chronoscope
      </h1>
      <Canvas initialPeopleIds={peopleIds} initialPersons={initialPersons} />
    </main>
  );
}
