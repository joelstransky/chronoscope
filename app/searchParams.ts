import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  people: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
