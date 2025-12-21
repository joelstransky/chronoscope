// components/timeline/SearchPeople.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchPeople } from "@/app/actions";
import type { Person } from "@/lib/generated/prisma";

export function SearchPeople() {
  const [query, setQuery] = useState("");
  // TODO: Define or import a specific SearchResult type if Person is too broad
  const [results, setResults] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Scaffold: Debounced search effect
  useEffect(() => {
    // TODO: Implement the debounce logic here.
    // 1. Check if query is empty (if so, clear results and return).
    if (!query.length) {
      setQuery("");
      return;
    }
    // 2. Set a timeout to call 'searchPeople(query)'.
    const timerId = setTimeout(async () => {
      // 3. Inside the timeout: set isSearching(true), await results, setResults, set isSearching(false).
      setIsSearching(true);
      setResults(await searchPeople(query));
      setIsSearching(false);
    }, 500); // 500ms delay

    // 4. Return a cleanup function to clearTimeout.
    return () => clearTimeout(timerId);
  }, [query]);

  const addPersonToCanvas = (id: string) => {
    // TODO: Implement URL state update logic to add people to canvas
    // 1. Get current 'people' param from searchParams
    // 2. Append the new ID (avoiding duplicates)
    // 3. Use router.push() to update the URL with the new list
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Search People</h3>
      <input
        type="text"
        placeholder="Find by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isSearching && (
        <p className="text-sm text-gray-400 mt-2">Searching...</p>
      )}

      <div className="mt-4 space-y-2">
        {/* TODO: Map over 'results' and render them here. */}
        {/* Each result should have an "Add" button that calls addPersonToCanvas(result.id) */}
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <li key={result.id} className="flex justify-between items-center">
                <span>{result.name}</span>
                <button
                  type="button"
                  onClick={() => addPersonToCanvas(result.id)}
                  className="text-blue-500 hover:text-blue-400 text-sm"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
