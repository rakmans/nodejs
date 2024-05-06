import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import userRoute from "./router/userRoute.js";
import adminRouter from "./router/adminRoute.js"; 
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// app.use("/",()=>{
//   console.log("hi");
// })
app.use(userRoute);
app.use(adminRouter);
app.listen(process.env.PORT, () => {
  console.log("server boooooooooooooooom");
});
