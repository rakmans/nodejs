import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const addAdmin = async () => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash("lpsa", salt);
  const newAdmin = await prisma.admin.create({
    data: {
      email: "ma2116hdi@gmail.com",
      password: hashPassword,
    },
  });
  console.log(newAdmin);
};
addAdmin();

