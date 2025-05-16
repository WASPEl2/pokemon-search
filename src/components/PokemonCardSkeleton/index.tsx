export default function PokemonCardSkeleton() {
  return (
    <div className="card h-100" aria-hidden="true">
      <div
        className="p-3 bg-secondary bg-opacity-25"
        style={{ height: "200px", borderRadius: "0.25rem" }}
      />
      <div className="card-body">
        <div
          className="bg-secondary bg-opacity-25 mb-2"
          style={{ height: "1.5rem", width: "60%", borderRadius: "0.25rem" }}
        />
        <div
          className="bg-secondary bg-opacity-25 mb-3"
          style={{ height: "1rem", width: "80%", borderRadius: "0.25rem" }}
        />
        <div className="d-flex gap-1">
          <span
            className="bg-secondary bg-opacity-25 rounded"
            style={{ height: "1.5rem", width: "3rem" }}
          />
          <span
            className="bg-secondary bg-opacity-25 rounded"
            style={{ height: "1.5rem", width: "3rem" }}
          />
        </div>
      </div>
    </div>
  );
}
