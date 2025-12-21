// components/timeline/SearchPeople.tsx
'use client';

import { useState, useEffect } from 'react';
import { searchPeople } from '@/app/actions';
// TODO: You might need to define or import a type for the search results here.
// Hint: Look at what prisma.person.findMany returns or the specific select in your action.

export function SearchPeople() {
  const [query, setQuery] = useState('');
  // TODO: specific type for results
  const [results, setResults] = useState<any[]>([]); 
  const [isSearching, setIsSearching] = useState(false);

  // Scaffold: Debounced search effect
  useEffect(() => {
    // TODO: Implement the debounce logic here.
    // 1. Check if query is empty (if so, clear results and return).
    // 2. Set a timeout to call 'searchPeople(query)'.
    // 3. Inside the timeout: set isSearching(true), await results, setResults, set isSearching(false).
    // 4. Return a cleanup function to clearTimeout.

    const timerId = setTimeout(async () => {
      // Your logic here
    }, 500); // 500ms delay

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
      
      {isSearching && <p className="text-sm text-gray-400 mt-2">Searching...</p>}

      <div className="mt-4 space-y-2">
        {/* TODO: Map over 'results' and render them here. */}
        {/* For now, just render the name. Later we will add a button to "add" them. */}
      </div>
    </div>
  );
}
