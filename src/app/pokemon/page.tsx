"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMONS } from "@/graphql/queries";
import client from "@/lib/apolloClient";
import PokemonCard from "@/components/PokemonCard";

import { Pokemon } from "@/types/pokemon";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";

export default function Home() {
  const perPage = 24;
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
    client,
  });

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return (
      data?.pokemons.filter((p: Partial<Pokemon>) =>
        p.name?.toLowerCase().includes(keyword.toLowerCase())
      ) || []
    );
  }, [data, keyword]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Pokémon Search</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          placeholder="Search Pokémon..."
          className="form-control w-auto"
          style={{ minWidth: "250px" }}
        />
      </div>

      {loading && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {Array.from({ length: perPage }).map((_, i) => (
            <div className="col" key={i}>
              <PokemonCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-danger">Error: {error.message}</p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-center mt-4">No Pokémon found.</p>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {paginated.map((pokemon: Partial<Pokemon>) => (
          <div className="col" key={pokemon.id}>
            <PokemonCard pokemon={pokemon as Pokemon} />
          </div>
        ))}
      </div>
      {page > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
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
