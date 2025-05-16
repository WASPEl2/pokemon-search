import React from "react";
import { typeColorMap } from "@/utils/typeColors";

interface Props {
  type: string;
}

export default function PokemonTypeBadge({ type }: Props) {
  const colorClass = typeColorMap[type] || "secondary";
  return <span className={`badge bg-${colorClass} me-1`}>{type}</span>;
}
