import { Pokemon } from "@/types/pokemon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useCallback } from "react";
import Image from "next/image";

export default function PokemonDetail({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();

  const evolutionChain = useMemo(
    () => [pokemon, ...(pokemon.evolutions || [])],
    [pokemon]
  );

  const checkIfEmpty = useCallback(
    (text: string | number | null | undefined): string => {
      if (text === null || text === undefined) return "N/A";
      if (typeof text === "number") return text.toString();
      return text.trim() === "" ? "N/A" : text;
    },
    []
  );

  const arrowStyle = useMemo(
    () => ({
      fontSize: "2rem",
      margin: "0 10px",
      color: "#6c757d",
    }),
    []
  );

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary "
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <button
            className="btn btn-outline-secondary "
            onClick={() => router.push("/pokemon")}
          >
            home
          </button>
        </div>
        <div className="text-center mb-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            className="img-fluid my-3"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
          <h1 className="display-5 fw-bold">
            {pokemon.name} <span className="text-muted">#{pokemon.number}</span>
          </h1>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <h2 className="h5 fw-semibold">Pokémon data</h2>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {checkIfEmpty(pokemon.name)}
              </li>
              <li className="list-group-item">
                <strong>Classification:</strong>{" "}
                {checkIfEmpty(pokemon.classification)}
              </li>
              <li className="list-group-item">
                <strong>Weight:</strong> {pokemon.weight?.minimum} -{" "}
                {pokemon.weight?.maximum}
              </li>
              <li className="list-group-item">
                <strong>Height:</strong> {pokemon.height?.minimum} -{" "}
                {pokemon.height?.maximum}
              </li>
              <li className="list-group-item">
                <strong>Flee Rate:</strong> {checkIfEmpty(pokemon.fleeRate)}
              </li>
              <li className="list-group-item">
                <strong>Max CP:</strong> {checkIfEmpty(pokemon.maxCP)}
              </li>
              <li className="list-group-item">
                <strong>Max HP:</strong> {checkIfEmpty(pokemon.maxHP)}
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <strong>Types:</strong>
              <div className="mt-1">
                {pokemon.types.map((type) => (
                  <span key={type} className="badge bg-primary me-1">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <strong>Resistant:</strong>
              <div className="mt-1">
                {pokemon.resistant.map((resist) => (
                  <span key={resist} className="badge bg-success me-1">
                    {resist}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <strong>Weaknesses:</strong>
              <div className="mt-1">
                {pokemon.weaknesses.map((weak) => (
                  <span key={weak} className="badge bg-danger me-1">
                    {weak}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="h5 fw-semibold mb-3">Attacks</h2>

          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold">Fast Attacks</h6>
              <ul className="list-group">
                {pokemon.attacks.fast.map((a) => (
                  <li
                    key={a.name}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {a.name} ({a.type})
                    </span>
                    <span className="badge bg-secondary">{a.damage} dmg</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 mt-4 mt-md-0">
              <h6 className="fw-bold">Special Attacks</h6>
              <ul className="list-group">
                {pokemon.attacks.special.map((a) => (
                  <li
                    key={a.name}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {a.name} ({a.type})
                    </span>
                    <span className="badge bg-warning text-dark">
                      {a.damage} dmg
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="h5 fw-semibold mb-3">Evolutions</h2>

          {evolutionChain.length > 1 ? (
            <div className="d-flex flex-wrap align-items-center">
              {evolutionChain.map((evo, idx) => (
                <div key={evo.id} className="d-flex align-items-center mb-3">
                  <Link
                    href={`/pokemon/${evo.name}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="card text-center border-0 shadow-sm"
                      style={{ width: "150px" }}
                    >
                      <Image
                        src={evo.image}
                        alt={evo.name}
                        className="card-img-top p-3"
                        style={{ height: "120px", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <h6 className="card-title text-dark">
                          {evo.name}
                          {idx == 0 && " (Now)"}
                        </h6>
                      </div>
                    </div>
                  </Link>

                  {/* Arrow */}
                  {idx < evolutionChain.length - 1 && (
                    <div style={arrowStyle} aria-hidden="true">
                      &#8594;
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted ps-2">
              No evolutions data available for {pokemon.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
