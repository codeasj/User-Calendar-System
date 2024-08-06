import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./config/connection.js";
import { errorHandler } from "./utils/handle-error.js";
import eventRoutes from "./routes/calendar.route.js";
import authRoutes from "./routes/auth.route.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/calendar", eventRoutes);
app.use(errorHandler);

//database connection
connect();
//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
