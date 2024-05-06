import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    let token = req.headers.authorization; 
    token = token && token.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
