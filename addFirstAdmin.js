import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const addAdmin = async () => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash("lpsa", salt);
  const newAdmin = await prisma.user.create({
    data: {
      username:"meti",
      email: "ma2116hdi@gmail.com",
      password: hashPassword,
      isAdmin:true
    },
  });
  console.log(newAdmin);
};

addAdmin();

