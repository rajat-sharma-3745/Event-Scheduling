export const EventCardShimmer = () => {
  return (
    <div className="relative bg-linear-to-br from-purple-500/20 to-indigo-500/20 text-white rounded-2xl p-5 shadow-lg animate-pulse">
      {/* Three Dots Button Placeholder */}
      <div className="absolute top-4 right-4 w-5 h-5 bg-white/30 rounded-full"></div>

      {/* Event Info Placeholder */}
      <div className="space-y-3">
        <div className="h-6 bg-white/30 rounded w-3/4"></div>
        <div className="h-4 bg-white/20 rounded w-full"></div>
        <div className="h-4 bg-white/20 rounded w-5/6"></div>
        <div className="h-4 bg-white/20 rounded w-1/2"></div>
      </div>
    </div>
  );
};
