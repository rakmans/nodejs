import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const login = async (req, res) => {

  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });
  const isAdmin = await bcrypt.compare(password,admin.password);

  if (isAdmin === true) {
    const token = jwt.sign(
      {
        userID: admin.id,
        isAdmin: true,
      },
      process.env.JWTSECRETKEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).send({ token });
  } else {
    res.status(401).send("invalid user");
  }
};
