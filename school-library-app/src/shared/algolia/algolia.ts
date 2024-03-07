import algoliosearch from "algoliasearch";

const algoliaClient = algoliosearch(
  import.meta.env.VITE_APPLICATION_ID,
  import.meta.env.VITE_ADMIN_API_KEY
);

export const index = algoliaClient.initIndex(
  import.meta.env.VITE_ALGOLIA_INDEX_NAME
);
