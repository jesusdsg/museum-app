import { verify } from "jsonwebtoken";
import { pool } from "../../config/db";
export default async function profileHandler(req, res) {
  if (req.method == "GET") {
    return await getProfileData(req, res);
  } else if (req.method === "POST") {
    return await saveBookmark(req, res);
  }
}

const getProfileData = async (req,res) => {
  const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Not Token" });
    }
    try {
      const user = verify(token, "secret");
      const bookmarks = await getBookMarksById(user.id);
      return res.json({
        email: user.email,
        id: user.id,
        name: user.name,
        bookmarks: bookmarks,
      });
    } catch {
      return res.status(401).json({ error: "Invalid Token" });
    }
}

const getBookMarksById = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM bookmarks WHERE userId = ?",
    [id]
  );
  return result;
};

const saveBookmark = async (req, res) => {
  const { token } = req.cookies;
  const { title, image, website } = req.body;
  const user = verify(token, "secret");
  if (!token) {
    return res.status(401).json({ error: "Not Token" });
  }
  /* Validate if exists before save */
  const [exists] = await pool.query("SELECT * FROM bookmarks WHERE title = ? AND userId = ?", [title, user.id]);
  if (exists.length == 0){
    try {
    await pool.query("INSERT INTO bookmarks SET ?", {
      title,
      image,
      website,
      userId: user.id,
    });
    return res.status(200).json({ message: "Favorite added suscessfully" });
    
  } catch (error) {
    return res.status(401).json({ error: error });
  }
  }
  else {
    return res.status(200).json({ message: 'This favorite is already added' });
  }
  
};
