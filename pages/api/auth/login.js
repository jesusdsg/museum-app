import { pool } from "../../../config/db";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
export default async function loginHandler(req, res) {
  const { email, password } = req.body;
  const [exists] = await pool.query("SELECT * FROM users WHERE email= ? AND password = ?", [
    email, password
  ]);
  if (exists[0]){
    const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          email: email,
          username: "temp",
          id: exists[0].id,
          name: exists[0].name
        },
        "secret"
      );

      const serializedToken = serialize("token", token, {
        httpOnly: true, //Only for http
        sameSite: "strict",
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30
      });

      res.setHeader("Set-Cookie", serializedToken);
      return res.status(200).json({ message: "Login sucessfully" });
  }
  return res.status(401).json({ error: "Invalid credentials" });
}
