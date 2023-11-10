import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET ?? "d3f4ult-s3cr3t";

const generateToken = (id: string) =>
  sign({ id }, JWT_SECRET, { expiresIn: "2h" });

const verifyToken = (jwt: string) => verify(jwt, JWT_SECRET);

export { generateToken, verifyToken };
