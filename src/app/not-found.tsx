"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-5 text-center bg-light">
        <h1 className="display-4 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => router.back()}
          >
            Go Back
          </button>
          <Link href="/" className="btn btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
