"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1f2e] px-6 text-center font-[family-name:var(--font-dm-sans)]">
      <div className="mb-8 text-6xl">⚽</div>
      <h1 className="mb-4 font-[family-name:var(--font-dm-serif)] text-3xl text-[#c9a227]">
        You&apos;re Offline
      </h1>
      <p className="mb-8 max-w-md text-lg text-gray-300">
        It looks like you&apos;ve lost your connection. Check your internet and
        try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-[#c9a227] px-8 py-3 font-semibold text-[#1a1f2e] transition-colors hover:bg-[#d4af37]"
      >
        Retry
      </button>
    </div>
  );
}
