"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { GET_POKEMON } from "@/graphql/queries";
import client from "@/lib/apolloClient";
import PokemonDetail from "@/components/PokemonDetail";
import PokemonDetailSkeleton from "@/components/PokemonDetailSkeleton";

export default function PokemonPage() {
  const router = useRouter();
  const { name } = useParams();

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
    client,
  });

  if (loading) return <PokemonDetailSkeleton />;
  if (error || !data?.pokemon)
    return (
      <div className="container my-5">
        <div className="card shadow-lg p-5 text-center bg-light">
          <h1 className="display-6 fw-bold text-danger mb-3">
            Pokémon Not Found
          </h1>
          <p className="text-muted mb-4">
            We couldn't find the Pokémon you're looking for.
          </p>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => router.back()}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );

  return <PokemonDetail pokemon={data.pokemon} />;
}
