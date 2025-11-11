import React, { useState, useEffect } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { toast } from "sonner";
import { EventCardShimmer } from "../components/EventCardShimmer";
import EventDetailShimmer from "../components/EventDetailShimmer";
import { useAppContext } from "../Context/AppContext";
import { BiLoaderAlt } from "react-icons/bi";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(
    event?.attendees?.some((a) => a.id === user.id)
  );
  const [isCreator, setIsCreator] = useState(event?.creatorId === user.id);
  const [attendees, setAttendees] = useState(event?.attendees || []);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(API_PATHS.EVENTS.GETDETAILS(id));
      setEvent(data);
      setIsCreator(data?.creatorId === user.id);
      setJoined(data?.attendees?.some((a) => a.id === user.id));
      setAttendees(data?.attendees)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message) ||
        "Something went wrong";
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [id]);

  const joinOrLeaveEvent = async () => {
    try {
      setLoadingAction(true);
      const endpoint = joined
        ? API_PATHS.EVENTS.LEAVE(id)
        : API_PATHS.EVENTS.JOIN(id);
      const { data } = await axiosInstance.post(endpoint);
      toast.success(data?.message);
      
      setJoined((p) => !p);
      joined?setAttendees(prev=>prev.filter(i=>i.id!==user.id)):setAttendees(prev=>[...prev,user])
      
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        `Failed to ${joined ? "leave" : "join"} event`
      );
    } finally {
      // fetchEvent()
      setLoadingAction(false);
    }
  };

  // const handleJoinLeave = () => setJoined((prev) => !prev);
  if (loading) return <EventDetailShimmer />;
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 cursor-pointer flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
      >
        <RxArrowLeft /> Back
      </button>
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-3xl shadow-xl p-8 relative">
        <h1 className="text-4xl font-extrabold mb-4">{event?.title}</h1>
        <p className="text-gray-200 mb-6">{event?.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
            {new Date(event?.date).toLocaleDateString()} @{" "}
            {new Date(event?.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
            Location: {event?.location}
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
            Creator: {event?.creator?.name}
          </span>
        </div>

        {!isCreator && (
          <button
            onClick={joinOrLeaveEvent}
            className={`px-6 cursor-pointer py-3 rounded-full font-semibold transition-colors duration-300 ${
              joined
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loadingAction ? (
              <BiLoaderAlt className="animate-spin" />
            ) : joined ? (
              "Leave Event"
            ) : (
              "Join Event"
            )}
          </button>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendees</h2>
        <div className="flex flex-wrap gap-3">
          {attendees?.length > 0 ? (
            attendees.map((user) => (
              <span
                key={user.id}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium"
              >
                {user?.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">No attendees yet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
