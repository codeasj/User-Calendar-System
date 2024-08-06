import express from "express";
import { validateReq } from "../middleware/validate.js";
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/calendar.controller.js";
import isUser from "../middleware/auth.middleware.js";
import {
  validateArray,
  validateDate,
  validateNumber,
  validateString,
} from "../utils/custom-validator.js";

const router = express.Router();

router.post(
  "/add",
  [
    validateString("@eventTitle"),
    validateString("@description"),
    validateArray("@participants"),
    validateDate("@date"),
    validateDate("@time"),
    validateNumber("@duration"),
  ],
  validateReq,
  isUser,
  createEvent
);

router.get("/events", isUser, getEvents);
router.get("/event/:id", isUser, getEvent);
router.put(
  "/update/:id",
  [
    validateString("@eventTitle"),
    validateString("@description"),
    validateArray("@participants"),
    validateDate("@date"),
    validateDate("@time"),
    validateNumber("@duration"),
  ],
  validateReq,
  isUser,
  updateEvent
);
router.delete("/delete/:id", isUser, deleteEvent);

export default router;
