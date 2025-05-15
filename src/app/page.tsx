"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/graphql/queries";
import client from "@/lib/apolloClient";

export default function Home() {
  const perPage = 24;
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
    client,
  });

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!data?.pokemons) return [];
    return data.pokemons.filter((p: any) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [data, keyword]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Pokémon Search</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          placeholder="Search Pokémon..."
          style={{ padding: "8px", fontSize: "16px", width: "250px" }}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {paginated.map((pokemon: any) => (
          <div
            key={pokemon.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{pokemon.name}</h3>
            <p>#{pokemon.number}</p>
            <p style={{ fontSize: "12px" }}>{pokemon.types.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
