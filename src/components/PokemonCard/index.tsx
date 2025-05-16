import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  // Compute total attack range
  const [minDamage, maxDamage] = useMemo(() => {
    const allAttacks = [
      ...(pokemon.attacks?.fast || []),
      ...(pokemon.attacks?.special || []),
    ];
    if (allAttacks.length === 0) return [0, 0];

    const damages = allAttacks.map((a) => a.damage);
    return [Math.min(...damages), Math.max(...damages)];
  }, [pokemon.attacks]);

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="text-decoration-none">
      <div
        className="card h-100 shadow-sm transition-transform"
        style={{ transition: "transform 0.2s ease-in-out" }}
      >
        <div className="position-relative w-100" style={{ height: "200px" }}>
          <div className="h-100 w-100" style={{ position: "relative" }}>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              style={{ objectFit: "contain", padding: "1rem" }}
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold mb-1 text-dark hover-underline">
            {pokemon.name}
          </h5>
          <p className="card-text text-muted mb-2">{pokemon.classification}</p>

          <div className="mb-2">
            {pokemon.types.map((type) => (
              <span key={type} className="badge bg-secondary me-1">
                {type}
              </span>
            ))}
          </div>

          <p className="text-muted mb-0">
            <strong>Attack Damage:</strong> {minDamage} - {maxDamage}
          </p>
        </div>
      </div>

      <style jsx>{`
        .card:hover {
          transform: scale(1.05);
        }

        .hover-underline:hover {
          text-decoration: underline;
        }
      `}</style>
    </Link>
  );
}
