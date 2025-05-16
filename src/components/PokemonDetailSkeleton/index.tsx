export default function PokemonDetailSkeleton() {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between mb-3">
          <div className="btn btn-outline-secondary disabled placeholder col-2"></div>
          <div className="btn btn-outline-secondary disabled placeholder col-2"></div>
        </div>

        <div className="text-center mb-4">
          <div className="placeholder-glow">
            <div
              className="bg-secondary placeholder col-6 mx-auto rounded"
              style={{ height: 200 }}
            ></div>
          </div>
          <h1 className="display-5 fw-bold placeholder-glow mt-3">
            <span className="placeholder col-4"></span>
            <span className="placeholder col-2 ms-2"></span>
          </h1>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <h2 className="h5 fw-semibold placeholder-glow mb-3">
              <span className="placeholder col-6"></span>
            </h2>

            <ul className="list-group list-group-flush">
              {[...Array(7)].map((_, i) => (
                <li key={i} className="list-group-item placeholder-glow">
                  <span className="placeholder col-8"></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-3 placeholder-glow">
                <span className="placeholder col-3 mb-2 d-block"></span>
                <div className="d-flex gap-2">
                  {[...Array(5)].map((__, j) => (
                    <span
                      key={j}
                      className="bg-secondary placeholder col-2 rounded"
                      style={{ height: "28px" }}
                    ></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 placeholder-glow">
          <h2 className="h5 fw-semibold mb-3">
            <span className="placeholder col-4"></span>
          </h2>
          <div className="row">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="col-md-6">
                {[...Array(4)].map((__, j) => (
                  <div
                    key={j}
                    className="list-group-item placeholder bg-secondary mb-2 rounded"
                    style={{ height: 30 }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 placeholder-glow">
          <h2 className="h5 fw-semibold mb-3">
            <span className="placeholder col-4"></span>
          </h2>
          <div className="d-flex flex-wrap align-items-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="card border-0 shadow-sm me-3 mb-3"
                style={{ width: "150px", height: "180px" }}
              >
                <div
                  className="bg-secondary placeholder card-img-top rounded p-3"
                  style={{ height: "120px" }}
                ></div>
                <div className="card-body">
                  <h6 className="card-title placeholder col-8"></h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
