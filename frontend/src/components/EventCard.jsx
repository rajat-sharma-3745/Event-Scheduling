import React, { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";


const EventCard = ({ event,openUpdateModal,onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();


  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  return (
    <div className="relative bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {/* Three Dots Button */}
      <div className="absolute top-4 right-4 " ref={dropdownRef}>
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
        >
          <FiMoreVertical size={20} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg z-10">
            <button
              className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg"
              onClick={() => {
                openUpdateModal();
                setShowDropdown(false);
              }}
            >
              Update
            </button>
            <button
              className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg"
              onClick={() => {
                onDelete();
                setShowDropdown(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <Link to={`/event/${event.id}`}>
        {/* Event Info */}
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-100 mb-2">{event.description}</p>
        <p className="text-gray-200 mb-1">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(event.date).toLocaleDateString()} @{" "}
          {new Date(event.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-gray-200">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
      </Link>
    </div>
  );
};

export default EventCard;


