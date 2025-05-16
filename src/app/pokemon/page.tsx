"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMONS } from "@/graphql/queries";
import client from "@/lib/apolloClient";
import PokemonCard from "@/components/PokemonCard";

import { Pokemon } from "@/types/pokemon";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";

export default function Home() {
  const perPage = 24;
  const {
    data,
    loading: loadingQuery,
    error,
  } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
    client,
  });

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
      setLoadingSearch(false);
    }, 1500);

    return () => clearTimeout(handler);
  }, [keyword]);

  // Set loading true as soon as user types
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setLoadingSearch(true);
  };

  const filtered = useMemo(() => {
    const filteredData =
      data?.pokemons.filter((p: Partial<Pokemon>) =>
        p.name?.toLowerCase().includes(debouncedKeyword.toLowerCase())
      ) || [];

    return filteredData.sort((a: Pokemon, b: Pokemon) => {
      if (!a.name || !b.name) return 0;
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [data, debouncedKeyword, sortOrder]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const isLoading = loadingQuery || loadingSearch;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Pokémon Search</h1>

      <div className="d-flex flex-column flex-sm-row justify-content-center mb-4 gap-3">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search Pokémon..."
          className="form-control flex-grow-1"
          style={{ minWidth: "0" }}
        />

        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          style={{ minWidth: "0", maxWidth: "300px" }}
        >
          <option value="asc">Name Ascending</option>
          <option value="desc">Name Descending</option>
        </select>
      </div>

      {isLoading && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {Array.from({ length: perPage }).map((_, i) => (
            <div className="col" key={i}>
              <PokemonCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="text-center text-danger">Error: {error.message}</p>
      )}
      {!isLoading && !error && filtered.length === 0 && (
        <p className="text-center mt-4">No Pokémon found.</p>
      )}

      {!isLoading && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {paginated.map((pokemon: Partial<Pokemon>) => (
            <div className="col" key={pokemon.id}>
              <PokemonCard pokemon={pokemon as Pokemon} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-primary"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
