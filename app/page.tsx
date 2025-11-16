// app/page.tsx
import Person from '@/components/timeline/Person';
import { samplePersons } from '@/lib/sample-data';

export default function HomePage() {
  const person = samplePersons[0]; // Just showing Ada for now

  return (
    <main className="min-h-screen p-8">
      <h1>Timeline Viewer</h1>
      <Person {...person} />
    </main>
  );
}