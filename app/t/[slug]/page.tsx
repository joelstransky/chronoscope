import { notFound } from "next/navigation";
import { fetchDocument } from "@/app/actions";
import HomePage from "@/app/page";

// import prisma from "@/lib/db";
// import { Document } from "@/lib/generated/prisma";

type SharedTimelinePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Dynamic route handler for shared timelines (/t/[slug]).
 * This component fetches the document from the database and
 * passes the state to the existing HomePage component.
 */
export default async function SharedTimelinePage({
  params,
}: SharedTimelinePageProps) {
  const { slug } = await params;

  // TODO: Implement the loading logic
  // 1. Fetch the document from Prisma using the slug.
  const doc = await fetchDocument(slug);
  // 2. If no document is found, call notFound().
  !doc && notFound();
  // 3. Extract the personIds from the document.
  const ids = doc?.personIds;
  // 4. Render the HomePage component, passing the personIds as a prop or via a modified searchParams mechanism.

  return (
    <div>
      {/* This is a stub for the shared timeline loader */}
      <h1>Loading shared timeline: {slug}</h1>
      {<HomePage slugPeople={ids} />}
    </div>
  );
}
