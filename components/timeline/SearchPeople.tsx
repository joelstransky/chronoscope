// components/timeline/SearchPeople.tsx
"use client";

import { useEffect, useState } from "react";
import { searchPeople } from "@/app/actions";
import type { Person } from "@/lib/generated/prisma";

type SearchPeopleProps = {
  onAdd: (id: string) => void;
  addedIds: string[];
};

export function SearchPeople({ onAdd, addedIds }: SearchPeopleProps) {
  const [query, setQuery] = useState("");
  // TODO: Define or import a specific SearchResult type if Person is too broad
  const [results, setResults] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Scaffold: Debounced search effect
  useEffect(() => {
    // TODO: Implement the debounce logic here.
    // 1. Check if query is empty (if so, clear results and return).
    if (!query.length) {
      setResults([]);
      return;
    }
    // 2. Set a timeout to call 'searchPeople(query)'.
    const timerId = setTimeout(async () => {
      // 3. Inside the timeout: set isSearching(true), await results, setResults, set isSearching(false).
      setIsSearching(true);
      try {
        const searchResults = await searchPeople(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms delay

    // 4. Return a cleanup function to clearTimeout.
    return () => clearTimeout(timerId);
  }, [query]);

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
        {/* Each result should have an "Add" button that calls onAdd(result.id) */}
        {results.length > 0 && (
          <ul>
            {results.map((result) => {
              const included = addedIds.includes(result.id);
              return (
                <li
                  key={result.id}
                  className="flex justify-between items-center"
                >
                  <span>{result.name}</span>
                  <button
                    type="button"
                    disabled={included}
                    onClick={() => onAdd(result.id)}
                    className="text-blue-500 hover:text-blue-400 text-sm py-[5px] px-[9px] border border-blue-500 rounded-full"
                  >
                    {included ? "added" : "Add"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
