
import { Suspense } from "react";
import Header from "@/components/Header";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="search-results-page">
        <Suspense fallback={<p>Loading search results...</p>}>
          <SearchResults />
        </Suspense>
      </main>
    </>
  );
}
