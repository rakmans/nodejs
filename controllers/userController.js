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
                username: user.username,
                isAdmin : user.isAdmin
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
    const {isAdmin,username} = req.user;
    const userRole = isAdmin ? "admin":"user";
    res.status(200).send(`Hi ${username} you are ${userRole}`);
};
