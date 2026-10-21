export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6" aria-live="polite">
      <p className="sr-only">Loading page</p>
      <div className="h-8 w-40 animate-pulse rounded-full bg-line" />
      <div className="mt-4 h-12 w-2/3 animate-pulse rounded-2xl bg-line" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="h-64 animate-pulse rounded-3xl bg-white" />
        <div className="h-64 animate-pulse rounded-3xl bg-white" />
        <div className="h-64 animate-pulse rounded-3xl bg-white" />
      </div>
    </div>
  );
}
