import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import userRoute from "./router/userRoute.js";
import adminRouter from "./router/adminRoute.js"; 
const app = express();
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(adminRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
