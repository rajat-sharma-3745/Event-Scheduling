import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";
import EventCard from "../components/EventCard";
import { EventCardShimmer } from "../components/EventCardShimmer";
import useGetUserEvents from "../hooks/useGetUserEvents";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

// Dummy user events data
const dummyUserEvents = [
  {
    id: 1,
    title: "Tech Meetup",
    description: "Networking event for developers",
    date: "2025-11-12T15:00:00.000Z",
    location: "NYC",
  },
  {
    id: 2,
    title: "AI Workshop",
    description: "Hands-on AI workshop",
    date: "2025-12-01T10:00:00.000Z",
    location: "San Francisco",
  },
  {
    id: 3,
    title: "React Conference",
    description: "All about React ecosystem",
    date: "2025-12-20T09:00:00.000Z",
    location: "Los Angeles",
  },
];

const CreateEvent = () => {
  const { events, setEvents, loading } = useGetUserEvents();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({}); // pre-fill for update
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDltModal, setShowDltModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open modal for Create
  const openCreateModal = () => {
    setModalData({ title: "", description: "", date: "", location: "" });
    setIsUpdate(false);
    setModalOpen(true);
  };

  // Open modal for Update
  const openUpdateModal = (event) => {
    setModalData({ ...event });
    setIsUpdate(true);
    setModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isUpdate) {
        const { data } = await axiosInstance.put(
          API_PATHS.EVENTS.UPDATE(modalData.id),
          modalData
        );
        setEvents((prev) =>
          prev.map((ev) => (ev.id === modalData.id ? { ...data } : ev))
        );
      } else {
        if (Object.values(modalData).some((e) => e.trim() === "")) {
          toast.warning("All fields are required");
          return;
        }

        const { data } = await axiosInstance.post(
          API_PATHS.EVENTS.CREATE,
          modalData
        );
        setEvents((prev) => [...prev, data]);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Error saving event"
      );
    } finally {
      setIsSubmitting(false);
      setModalOpen(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setIsDeleting(true)
      const { data } = await axiosInstance.delete(API_PATHS.EVENTS.DELETE(id));
      if (data?.success) setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success(data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setIsDeleting(false)
      setShowDltModal(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-6">
      <h1 className="lg:text-3xl text-xl font-bold text-gray-800 text-center">
        My Events
      </h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          + Create Event
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => <EventCardShimmer key={i} />)
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              openUpdateModal={() => openUpdateModal(event)}
              setEvents={setEvents}
              onDelete={() => {
                setDeleteId(event.id);
                setShowDltModal((p) => !p);
              }}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            You haven’t created any events yet.
          </p>
        )}
      </div>

      {/* Create Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">
              {isUpdate ? "Update Event" : "Create Event"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Event Title"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={modalData.title}
                onChange={(e) =>
                  setModalData({ ...modalData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={modalData.description}
                onChange={(e) =>
                  setModalData({ ...modalData, description: e.target.value })
                }
              />
              <input
                type="datetime-local"
                className="border border-gray-300 rounded-lg p-2 w-full"
                // new Date(modalData.date) - (new Date(modalData.date).getTimezoneOffset() * 60000) this subtraction is used to get the local time , bcoz normally it gives us the utc time
                value={
                  isUpdate
                    ? new Date(
                        new Date(modalData.date) -
                          new Date(modalData.date).getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 16)
                    : modalData.date
                }
                onChange={(e) =>
                  setModalData({ ...modalData, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={modalData.location}
                onChange={(e) =>
                  setModalData({ ...modalData, location: e.target.value })
                }
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {isSubmitting ? (
                    <BiLoaderAlt className="animate-spin" />
                  ) : isUpdate ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteId && showDltModal && (
        <DeleteModal
          onClose={() => setShowDltModal(false)}
          onDelete={() => handleDelete(deleteId)}
          loading={isDeleting}
        />
      )}
    </div>
  );
};

export default CreateEvent;

const DeleteModal = ({ onClose, onDelete,loading }) => {
  return (
    <div className="min-h-screen w-full bg-black/50 z-20 fixed inset-0 flex justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto  bg-white p-4 flex flex-col gap-4 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Are you sure?</h2>
          <div className="px-2 pt-1 hover:bg-gray-200 transition duration-300 rounded-lg text-xl">
            <button onClick={onClose}>
              <IoClose />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <h3>Are you sure to delete it?</h3>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400 transition duration-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 cursor-pointer bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300 rounded-md"
          >
           {loading?<BiLoaderAlt className="animate-spin"/>:"Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
