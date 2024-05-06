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
    const isAdmin = await bcrypt.compare(password, user.password);

    if (isAdmin === true) {
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
        res.status(200).send({token});
    } else {
        res.status(401).send("invalid user");
    }
};

export const addUser = async (req, res) => {
    const { username, email, password } = await req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,
            isAdmin:false
        },
    });
    res.status(200).send("user successfully created!");
};

export const addAdmin = async (req, res) => {
    const { username, email, password } = await req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,
            isAdmin:true
        },
    });
    res.status(200).send("admin successfully created!");
};
