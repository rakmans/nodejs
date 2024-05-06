import express from "express";
import { addAdmin, addUser, login } from "../controllers/adminController.js";
import { verifyJWT } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/admin/login", login);
router.post("/admin/addUser", verifyJWT, addUser);
router.post("/admin/addAdmin", verifyJWT, addAdmin);

export default router;
