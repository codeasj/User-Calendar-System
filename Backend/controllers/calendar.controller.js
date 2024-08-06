import Calendar from "../models/calendar.model.js";

export async function createEvent(req, res, next) {
  try {
    const {
      eventTitle,
      description,
      participants,
      date,
      time,
      duration,
      notes,
    } = req.body;
    const event = await Calendar.create({
      eventTitle,
      description,
      participants,
      date,
      time,
      duration,
      notes,
      addedBy: req.user.id,
    });
    return res.status(201).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function getEvents(req, res, next) {
  try {
    const events = await Calendar.find();
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    next(err);
  }
}

export async function getEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    const event = await Calendar.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    const {
      eventTitle,
      description,
      participants,
      date,
      time,
      duration,
      notes,
    } = req.body;
    const event = await Calendar.findByIdAndUpdate(
      id,
      {
        eventTitle,
        description,
        participants,
        date,
        time,
        duration,
        notes,
        updateBy: req.user.id,
      },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    const event = await Calendar.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
