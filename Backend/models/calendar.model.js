import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  participants: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;
