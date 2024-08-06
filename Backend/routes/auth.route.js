import express from "express";
import {
  register,
  login,
  verifyEmail,
  logOut,
} from "../controllers/auth.controller.js";
import { validateReq } from "../middleware/validate.js";
import { validateEmail, validatePassword } from "../utils/custom-validator.js";
const router = express.Router();
router.post(
  "/register",
  [validateEmail("@email"), validatePassword("@password")],
  validateReq,

  register
);
router.get("/verify/:token", verifyEmail);

router.post("/login", [validateEmail("@email")], validateReq, login);

router.post("/logOut", logOut);

export default router;
