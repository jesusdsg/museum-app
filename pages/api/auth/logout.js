import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
export default function logoutHandler(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Not Token" });
  }

  try {
    verify(token, "secret");
    const serializedToken = serialize("token", null, {
        httpOnly: true, //Only for http
        sameSite: "strict",
        path: '/',
        maxAge: 0
      });
      res.setHeader("Set-Cookie", serializedToken);
      return res.status(200).json({ message: "Logout sucessfully" });
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
