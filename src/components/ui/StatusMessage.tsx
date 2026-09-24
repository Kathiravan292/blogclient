interface StatusMessageProps {
  /** Shown while a request is in flight. */
  loading?: boolean;
  /** Server or network error message. */
  error?: string | null;
  /** Shown when the request succeeded but returned nothing. */
  empty?: boolean;
  loadingText?: string;
  emptyText?: string;
}

/**
 * The loading / error / empty states every list and detail page needs, so each page
 * renders one element instead of three near-identical blocks.
 */
export function StatusMessage({
  loading = false,
  error = null,
  empty = false,
  loadingText = 'Loading…',
  emptyText = 'Nothing to show yet.',
}: StatusMessageProps) {
  if (loading) {
    return (
      <div className="text-center py-5" role="status" aria-live="polite">
        <div className="spinner-border text-primary" aria-hidden="true" />
        <p className="text-muted mt-3 mb-0">{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        {error}
      </div>
    );
  }

  if (empty) {
    return <p className="text-center text-muted py-5 mb-0">{emptyText}</p>;
  }

  return null;
}
