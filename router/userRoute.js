import express from "express";
import { dashboard, login } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/user/login", login);
router.get("/dashboard",verifyJWT, dashboard);

export default router;
