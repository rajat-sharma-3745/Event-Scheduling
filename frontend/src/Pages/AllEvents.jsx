import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useGetAllEvents from "../hooks/useGetAllEvents";
import { EventCardShimmer } from "../components/EventCardShimmer";



const AllEvents = () => {
  const { events, setEvents, loading } = useGetAllEvents();


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Events
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => <EventCardShimmer key={i} />)
        ) : events.length > 0 ? (
          events.map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-linear-to-br from-indigo-500 to-purple-600 text-white"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                  {event.title}
                </h2>
                <p className="text-gray-100 mb-3">{event.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {new Date(event.date).toLocaleDateString()} @{" "}
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {event.rsvps.length} Attending
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Creator:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                    {event.creator.name}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No events yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
