import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "testsecret";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const { email, password } = req.body;

  const allowedEmails = (process.env.ALLOWED_EMAILS || "").split(",");
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!allowedEmails.includes(email) || password !== adminPassword) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
}

