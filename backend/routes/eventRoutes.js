import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventDetails, joinEvent, leaveEvent, updateEvent } from "../controllers/eventController.js";
import { auth } from "../middlewares/auth.js";


const router = Router();
// GET /api/events
router.get('/',auth,getAllEvents)
// GET /events/:id
router.get('/:id',auth,getEventDetails)
// POST /api/events
router.post('/',auth,createEvent)
// PATCH /api/events/:id
router.put('/:id',auth,updateEvent)
// DELETE /api/events/:id
router.delete('/:id',auth,deleteEvent)
// POST /api/events/:id/join
router.post('/:id/join',auth,joinEvent)
// POST /api/events/:id/leave
router.post('/:id/leave',auth,leaveEvent)





export default router