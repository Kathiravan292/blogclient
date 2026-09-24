import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-5 fw-bold">Page Not Found</h1>
      <p className="text-muted">The page you were looking for doesn&apos;t exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
