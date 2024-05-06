import express from "express";
import { dashboard, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/login/user", login);
router.get("/dashboard", dashboard);
export default router;
