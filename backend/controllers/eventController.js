import { prisma } from "../prismaClient.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";

export const getAllEvents = asyncHandler(async (req, res, next) => {
    const events = await prisma.event.findMany({
        include: {
            creator: { select: { id: true, name: true } },
            rsvps: true
        },
        orderBy: { date: 'asc' }
    });
    res.status(200).json({success:true,events})
})
export const getUserEvents = asyncHandler(async (req, res, next) => {
    const events = await prisma.event.findMany({
        where: { creatorId: req.user.id },
        orderBy: { date: "asc" },
    });
    res.status(200).json({
        success: true,
        events
    })
})
export const getEventDetails = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            creator: { select: { id: true, name: true, email: true } },
            rsvps: { include: { user: { select: { id: true, name: true, email: true } } } }
        }
    })
    if (!event) {
        return next(new ApiError('Event not found', 404));
    }
    const attendees = event.rsvps.map(rsvp => rsvp.user);
    res.status(200).json({ ...event, attendees });
})
export const createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, date, location } = req.body;
    const userId = req.user.id
    const event = await prisma.event.create({
        data: { title, description, date: new Date(date), location, creator: { connect: { id: userId } } } // connect means find an existing record and link it with relation field
    })
    res.status(201).json(event);


})
export const updateEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id; // from JWT
    const { title, description, date, location } = req.body;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.creatorId !== userId)
        return res.status(403).json({ error: 'Not authorized to edit this event' });

    const updated = await prisma.event.update({
        where: { id },
        data: { title, description, date: new Date(date), location },
    });

    res.status(200).json(updated);
})
export const deleteEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id

    const event = await prisma.event.findUnique({
        where: { id },
    })
    if (!event) return next(new ApiError('Event not found', 404));
    if (event.creatorId !== userId) {
        return next(new ApiError('Not authorized to delete this event', 403))
    }
    await prisma.event.delete({ where: { id } });

    res.status(200).json({success:true, message: 'Event deleted successfully' });
})
export const joinEvent = asyncHandler(async (req, res, next) => {
    const { id: eventId } = req.params;
    const userId = req.user.id

    const existing = await prisma.rSVP.findUnique({
        where: { userId_eventId: { userId, eventId } },
    });
    if (existing)
        return next(new ApiError('You have already joined this event', 400));

    const rsvp = await prisma.rSVP.create({
        data: { userId, eventId },
    });

    res.status(201).json({ message: 'Joined event successfully', rsvp });
})
export const leaveEvent = asyncHandler(async (req, res, next) => {
    const { id: eventId } = req.params;
    const userId = req.user.id

    const existing = await prisma.rSVP.findUnique({
        where: { userId_eventId: { userId, eventId } },
    });
    if (!existing)
        return next(new ApiError('You are not part of this event', 400));

    await prisma.rSVP.delete({
        where: { id: existing.id },
    });

    res.status(200).json({ message: 'Left event successfully' });
})
