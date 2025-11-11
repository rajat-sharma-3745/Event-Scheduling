
const EventDetailShimmer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      {/* Back button placeholder */}
      <div className="mb-6 flex items-center gap-2 w-32 h-5 bg-gray-300/30 rounded"></div>

      {/* Event card shimmer */}
      <div className="bg-linear-to-r from-indigo-500/20 to-purple-600/20 text-white rounded-3xl shadow-xl p-8 relative">
        {/* Title */}
        <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>

        {/* Info Chips */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="bg-white/10 px-6 py-3 rounded-full w-32 h-5"
            ></span>
          ))}
        </div>

        {/* Join/Leave button placeholder */}
        <div className="w-40 h-10 bg-white/20 rounded-full"></div>
      </div>

      {/* Attendees section shimmer */}
      <div className="mt-10">
        <div className="h-6 bg-gray-300/50 rounded w-40 mb-4"></div>

        <div className="flex flex-wrap gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300/30 rounded-full w-20 h-6"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailShimmer;