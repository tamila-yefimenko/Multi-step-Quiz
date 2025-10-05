import { algoliasearch } from "algoliasearch";

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

export { client };
