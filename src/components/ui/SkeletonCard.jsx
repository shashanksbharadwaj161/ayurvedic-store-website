export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="h-[220px] skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-16 rounded skeleton-shimmer" />
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        <div className="h-5 w-20 rounded skeleton-shimmer" />
        <div className="h-11 w-full rounded-lg skeleton-shimmer" />
      </div>
    </div>
  )
}
