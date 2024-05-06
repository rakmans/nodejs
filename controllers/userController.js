import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user === null) {
    return res.status(401).send("invalid user");
  }
  const isUser = await bcrypt.compare(password, user.password);
  if (isUser === true) {
    const token = jwt.sign(
      {
        userID: user.id,
        isUser: true,
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
export const dashboard = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(401).send("Token required");
  else res.status(200).send("welcome to fight club");
};
